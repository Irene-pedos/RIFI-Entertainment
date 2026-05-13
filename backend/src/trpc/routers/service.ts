import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc.js";
import { ServiceCategory } from "../../lib/types.js";
import { TRPCError } from "@trpc/server";
import { logger } from "../../lib/logger.js";

const serviceInput = z.object({
  slug: z.string().min(2),
  title: z.string().min(2),
  category: z.nativeEnum(ServiceCategory),
  shortDescription: z.string().optional().nullable(),
  fullDescription: z.string().optional().nullable(),
  pricingLabel: z.string().optional().nullable(),
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
    .mutation(async ({ ctx, input }) => {
      try {
        const service = await ctx.db.service.create({
          data: input,
        });
        logger.info(`Service created: ${service.slug}`);
        return service;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create service",
          cause: error,
        });
      }
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string().min(1, "Service ID is required"),
      data: serviceInput.partial(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const service = await ctx.db.service.update({
          where: { id: input.id },
          data: input.data,
        });
        logger.info(`Service updated: ${service.slug}`);
        return service;
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Service not found",
          cause: error,
        });
      }
    }),

  delete: protectedProcedure
    .input(z.string().min(1, "Service ID is required"))
    .mutation(async ({ ctx, input }) => {
      try {
        const service = await ctx.db.service.delete({
          where: { id: input },
        });
        logger.info(`Service deleted: ${service.slug}`);
        return service;
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Service not found",
          cause: error,
        });
      }
    }),

  reorder: protectedProcedure
    .input(z.array(z.object({ id: z.string(), displayOrder: z.number().int() })))
    .mutation(async ({ ctx, input }) => {
      try {
        const updates = input.map(item => 
          ctx.db.service.update({
            where: { id: item.id },
            data: { displayOrder: item.displayOrder },
          })
        );
        await ctx.db.$transaction(updates);
        logger.info(`Services reordered: ${input.length} items`);
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to reorder services",
          cause: error,
        });
      }
    }),
});
