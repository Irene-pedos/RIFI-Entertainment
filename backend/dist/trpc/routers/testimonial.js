import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc.js";
const testimonialInput = z.object({
    clientName: z.string().min(2),
    clientRole: z.string().optional(),
    quote: z.string().min(10),
    rating: z.number().int().min(1).max(5).default(5),
    isPublished: z.boolean().default(false),
    displayOrder: z.number().int().default(0),
});
export const testimonialRouter = router({
    listPublic: publicProcedure.query(({ ctx }) => {
        return ctx.db.testimonial.findMany({
            where: { isPublished: true },
            orderBy: { displayOrder: "asc" },
        });
    }),
    listAdmin: protectedProcedure.query(({ ctx }) => {
        return ctx.db.testimonial.findMany({
            orderBy: { displayOrder: "asc" },
        });
    }),
    create: protectedProcedure
        .input(testimonialInput)
        .mutation(({ ctx, input }) => {
        return ctx.db.testimonial.create({
            data: input,
        });
    }),
    update: protectedProcedure
        .input(z.object({
        id: z.string(),
        data: testimonialInput.partial(),
    }))
        .mutation(({ ctx, input }) => {
        return ctx.db.testimonial.update({
            where: { id: input.id },
            data: input.data,
        });
    }),
    delete: protectedProcedure
        .input(z.string())
        .mutation(({ ctx, input }) => {
        return ctx.db.testimonial.delete({
            where: { id: input },
        });
    }),
    publishToggle: protectedProcedure
        .input(z.object({ id: z.string(), isPublished: z.boolean() }))
        .mutation(({ ctx, input }) => {
        return ctx.db.testimonial.update({
            where: { id: input.id },
            data: { isPublished: input.isPublished },
        });
    }),
});
