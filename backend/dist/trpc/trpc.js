import { initTRPC, TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import { env } from "../env.js";
import { db } from "../db.js";
// Context type
export const createContext = async ({ req, res }) => {
    const authHeader = req.headers.authorization;
    let user = null;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, env.JWT_SECRET);
            // Fetch user from DB to ensure they still exist and are active
            const admin = await db.adminUser.findUnique({
                where: { id: decoded.id },
                select: { id: true, email: true, role: true, isActive: true }
            });
            if (admin && admin.isActive) {
                user = admin;
            }
        }
        catch (err) {
            // Token invalid or expired
        }
    }
    return {
        req,
        res,
        user,
        db,
    };
};
const t = initTRPC.context().create();
export const router = t.router;
export const publicProcedure = t.procedure;
/**
 * Reusable middleware that enforces users are logged in
 */
const isAuthed = t.middleware(({ ctx, next }) => {
    if (!ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
        ctx: {
            user: ctx.user,
        },
    });
});
/**
 * Protected procedure for any logged-in admin
 */
export const protectedProcedure = t.procedure.use(isAuthed);
/**
 * Admin procedure for Super Admins only
 */
const isSuperAdmin = t.middleware(({ ctx, next }) => {
    if (!ctx.user || ctx.user.role !== "SUPER_ADMIN") {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Super Admin privileges required" });
    }
    return next({
        ctx: {
            user: ctx.user,
        },
    });
});
export const adminProcedure = t.procedure.use(isSuperAdmin);
