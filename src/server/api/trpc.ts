import { initTRPC, TRPCError } from "@trpc/server";
import { type FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import jwt from "jsonwebtoken";
import { env } from "../env";
import { db } from "../db";
import { logger } from "../utils/logger";
import { ZodError } from "zod";

// Context type
export const createContext = async (opts: FetchCreateContextFnOptions) => {
  let token: string | null = null;
  
  // 1. Try Authorization Header
  const authHeader = opts.req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }
  
  // 2. Try Cookie if no header token
  if (!token) {
    const cookieHeader = opts.req.headers.get("cookie");
    if (cookieHeader) {
      const cookies = Object.fromEntries(
        cookieHeader.split("; ").map((c) => c.split("="))
      );
      token = cookies["rifi_auth_token"] || null;
    }
  }

  let user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string; email: string; role: string };
      
      // Fetch user from DB to ensure they still exist and are active
      const admin = await db.adminUser.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true, role: true, isActive: true, firstName: true, lastName: true }
      });

      if (admin && admin.isActive) {
        user = admin;
      }
    } catch {
      // Token invalid or expired
      logger.debug("Invalid or expired token provided");
    }
  }

  return {
    req: opts.req,
    user,
    db,
  };
};

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    // Sanitize Prisma errors to avoid leaking DB details
    let message = error.message;
    if (error.cause instanceof Error && error.cause.name.includes("Prisma")) {
      logger.error("Prisma Error:", error.cause);
      message = "A database error occurred. Please try again later.";
    }

    return {
      ...shape,
      message,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

export const router = t.router;

/**
 * Logging middleware
 */
const loggerMiddleware = t.middleware(async ({ path, type, next, ctx }) => {
  const start = Date.now();
  const result = await next();
  const durationMs = Date.now() - start;
  
  const userStr = ctx.user ? `[User:${ctx.user.id}]` : '[Guest]';
  const status = result.ok ? "SUCCESS" : "ERROR";
  
  logger.info(`${userStr} ${type} ${path} - ${status} (${durationMs}ms)`);
  
  if (!result.ok) {
    logger.error(`Error in ${path}:`, result.error);
  }
  
  return result;
});

/**
 * Public procedure with logging
 */
export const publicProcedure = t.procedure.use(loggerMiddleware);

/**
 * Protected procedure for any logged-in admin
 */
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ 
      code: "UNAUTHORIZED", 
      message: "You must be logged in to access this resource" 
    });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const protectedProcedure = publicProcedure.use(isAuthed);

/**
 * Admin procedure for Super Admins only
 */
const isSuperAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.user || ctx.user.role !== "SUPER_ADMIN") {
    throw new TRPCError({ 
      code: "FORBIDDEN", 
      message: "Super Admin privileges required" 
    });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const adminProcedure = protectedProcedure.use(isSuperAdmin);
