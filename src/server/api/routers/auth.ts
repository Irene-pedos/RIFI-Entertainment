import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { verifyPassword, signToken, hashPassword } from "../../auth/jwt";
import { logger } from "../../utils/logger";

export const authRouter = router({
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email("Invalid email format"),
        password: z.string().min(1, "Password is required"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.adminUser.findUnique({
        where: { email: input.email },
      });

      if (!user || !user.isActive) {
        logger.warn(`Failed login attempt for email: ${input.email}`);
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }

      const isValid = await verifyPassword(input.password, user.passwordHash);

      if (!isValid) {
        logger.warn(`Failed login attempt (wrong password) for email: ${input.email}`);
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }

      const token = signToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      logger.info(`User logged in: ${user.email} (${user.id})`);

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      };
    }),

  logout: protectedProcedure.mutation(async ({ ctx }) => {
    logger.info(`User logged out: ${ctx.user.email} (${ctx.user.id})`);
    return { success: true };
  }),

  me: protectedProcedure.query(({ ctx }) => {
    return ctx.user;
  }),

  changePassword: protectedProcedure
    .input(
      z.object({
        currentPassword: z.string().min(1, "Current password is required"),
        newPassword: z.string().min(8, "New password must be at least 8 characters"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.adminUser.findUnique({
        where: { id: ctx.user.id },
      });

      if (!user) {
        throw new TRPCError({ 
          code: "NOT_FOUND",
          message: "User not found"
        });
      }

      const isValid = await verifyPassword(input.currentPassword, user.passwordHash);

      if (!isValid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Current password is incorrect",
        });
      }

      const newHash = await hashPassword(input.newPassword);

      await ctx.db.adminUser.update({
        where: { id: user.id },
        data: { passwordHash: newHash },
      });

      logger.info(`Password changed for user: ${user.email}`);

      return { success: true };
    }),
});
