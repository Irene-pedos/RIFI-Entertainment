import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc.js";
import { ModelApplicationStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
const applicationInput = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(5),
    age: z.number().int().positive().optional(),
    heightCm: z.number().positive().optional(),
    measurements: z.string().optional(),
    category: z.string().optional(),
    socialMedia: z.string().optional(),
    experience: z.string().optional(),
    portfolioUrl: z.string().url().optional(),
});
export const modelRouter = router({
    apply: publicProcedure
        .input(applicationInput)
        .mutation(async ({ ctx, input }) => {
        return ctx.db.modelApplication.create({
            data: {
                ...input,
                applicationCode: `MOD-${nanoid(8).toUpperCase()}`,
                status: ModelApplicationStatus.PENDING,
            },
        });
    }),
    listApplications: protectedProcedure
        .input(z.object({
        status: z.nativeEnum(ModelApplicationStatus).optional(),
    }).optional())
        .query(({ ctx, input }) => {
        return ctx.db.modelApplication.findMany({
            where: {
                status: input?.status,
            },
            orderBy: { createdAt: "desc" },
        });
    }),
    getApplicationById: protectedProcedure
        .input(z.string())
        .query(async ({ ctx, input }) => {
        const app = await ctx.db.modelApplication.findUnique({
            where: { id: input },
        });
        if (!app)
            throw new TRPCError({ code: "NOT_FOUND" });
        return app;
    }),
    updateApplicationStatus: protectedProcedure
        .input(z.object({
        id: z.string(),
        status: z.nativeEnum(ModelApplicationStatus),
    }))
        .mutation(({ ctx, input }) => {
        return ctx.db.modelApplication.update({
            where: { id: input.id },
            data: { status: input.status },
        });
    }),
    deleteApplication: protectedProcedure
        .input(z.string())
        .mutation(({ ctx, input }) => {
        return ctx.db.modelApplication.delete({
            where: { id: input },
        });
    }),
});
