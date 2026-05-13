import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc.js";
import { TRPCError } from "@trpc/server";
import { verifyPassword, signToken, hashPassword } from "../../lib/auth.js";
export const authRouter = router({
    login: publicProcedure
        .input(z.object({
        email: z.string().email(),
        password: z.string(),
    }))
        .mutation(async ({ ctx, input }) => {
        const user = await ctx.db.adminUser.findUnique({
            where: { email: input.email },
        });
        if (!user || !user.isActive) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "Invalid email or password",
            });
        }
        const isValid = await verifyPassword(input.password, user.passwordHash);
        if (!isValid) {
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
    me: protectedProcedure.query(({ ctx }) => {
        return ctx.user;
    }),
    changePassword: protectedProcedure
        .input(z.object({
        currentPassword: z.string(),
        newPassword: z.string().min(8),
    }))
        .mutation(async ({ ctx, input }) => {
        const user = await ctx.db.adminUser.findUnique({
            where: { id: ctx.user.id },
        });
        if (!user) {
            throw new TRPCError({ code: "NOT_FOUND" });
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
        return { success: true };
    }),
});
