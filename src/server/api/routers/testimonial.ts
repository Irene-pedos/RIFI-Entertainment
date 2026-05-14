import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { logger } from "../../utils/logger";

const testimonialInput = z.object({
  clientName: z.string().min(2, "Client name must be at least 2 characters"),
  clientRole: z.string().optional().nullable(),
  quote: z.string().min(10, "Quote must be at least 10 characters"),
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
    .mutation(async ({ ctx, input }) => {
      try {
        const testimonial = await ctx.db.testimonial.create({
          data: input,
        });
        logger.info(`Testimonial created for: ${testimonial.clientName}`);
        return testimonial;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create testimonial",
          cause: error,
        });
      }
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string().min(1, "Testimonial ID is required"),
      data: testimonialInput.partial(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const testimonial = await ctx.db.testimonial.update({
          where: { id: input.id },
          data: input.data,
        });
        logger.info(`Testimonial updated: ${testimonial.id}`);
        return testimonial;
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Testimonial not found",
          cause: error,
        });
      }
    }),

  delete: protectedProcedure
    .input(z.string().min(1, "Testimonial ID is required"))
    .mutation(async ({ ctx, input }) => {
      try {
        const testimonial = await ctx.db.testimonial.delete({
          where: { id: input },
        });
        logger.info(`Testimonial deleted: ${testimonial.id}`);
        return testimonial;
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Testimonial not found",
          cause: error,
        });
      }
    }),

  publishToggle: protectedProcedure
    .input(z.object({ 
      id: z.string().min(1, "Testimonial ID is required"), 
      isPublished: z.boolean() 
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const testimonial = await ctx.db.testimonial.update({
          where: { id: input.id },
          data: { isPublished: input.isPublished },
        });
        logger.info(`Testimonial publish status toggled: ${testimonial.id} to ${input.isPublished}`);
        return testimonial;
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Testimonial not found",
          cause: error,
        });
      }
    }),
});
