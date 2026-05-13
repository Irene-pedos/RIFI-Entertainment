import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc.js";
import { ServiceCategory } from "@prisma/client";
const serviceInput = z.object({
    slug: z.string().min(2),
    title: z.string().min(2),
    category: z.nativeEnum(ServiceCategory),
    shortDescription: z.string().optional(),
    fullDescription: z.string().optional(),
    pricingLabel: z.string().optional(),
    isActive: z.boolean().default(true),
    displayOrder: z.number().int().default(0),
});
export const serviceRouter = router({
    listPublic: publicProcedure.query(({ ctx }) => {
        return ctx.db.service.findMany({
            where: { isActive: true },
            orderBy: { displayOrder: "asc" },
        });
    }),
    listAdmin: protectedProcedure.query(({ ctx }) => {
        return ctx.db.service.findMany({
            orderBy: { displayOrder: "asc" },
        });
    }),
    create: protectedProcedure
        .input(serviceInput)
        .mutation(({ ctx, input }) => {
        return ctx.db.service.create({
            data: input,
        });
    }),
    update: protectedProcedure
        .input(z.object({
        id: z.string(),
        data: serviceInput.partial(),
    }))
        .mutation(({ ctx, input }) => {
        return ctx.db.service.update({
            where: { id: input.id },
            data: input.data,
        });
    }),
    delete: protectedProcedure
        .input(z.string())
        .mutation(({ ctx, input }) => {
        return ctx.db.service.delete({
            where: { id: input },
        });
    }),
    reorder: protectedProcedure
        .input(z.array(z.object({ id: z.string(), displayOrder: z.number().int() })))
        .mutation(async ({ ctx, input }) => {
        const updates = input.map(item => ctx.db.service.update({
            where: { id: item.id },
            data: { displayOrder: item.displayOrder },
        }));
        await ctx.db.$transaction(updates);
        return { success: true };
    }),
});
