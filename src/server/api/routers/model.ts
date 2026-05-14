import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { ModelApplicationStatus } from "../../types";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { logger } from "../../utils/logger";

const applicationInput = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(5, "Phone number must be at least 5 characters"),
  age: z.number().int().positive().optional().nullable(),
  heightCm: z.number().positive().optional().nullable(),
  measurements: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  socialMedia: z.string().optional().nullable(),
  experience: z.string().optional().nullable(),
  portfolioUrl: z.string().url("Invalid portfolio URL").optional().nullable().or(z.literal("")),
});

export const modelRouter = router({
  submitApplication: publicProcedure
    .input(applicationInput)
    .mutation(async ({ ctx, input }) => {
      try {
        const application = await ctx.db.modelApplication.create({
          data: {
            ...input,
            portfolioUrl: input.portfolioUrl || null,
            applicationCode: `MOD-${nanoid(8).toUpperCase()}`,
            status: ModelApplicationStatus.PENDING,
          },
        });
        logger.info(`New model application: ${application.applicationCode}`);
        return application;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to submit application",
          cause: error,
        });
      }
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
    .input(z.string().min(1, "Application ID is required"))
    .query(async ({ ctx, input }) => {
      const app = await ctx.db.modelApplication.findUnique({
        where: { id: input },
      });
      if (!app) {
        throw new TRPCError({ 
          code: "NOT_FOUND",
          message: "Application not found"
        });
      }
      return app;
    }),

  updateApplicationStatus: protectedProcedure
    .input(z.object({
      id: z.string().min(1, "Application ID is required"),
      status: z.nativeEnum(ModelApplicationStatus),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const app = await ctx.db.modelApplication.update({
          where: { id: input.id },
          data: { status: input.status },
        });
        logger.info(`Application status updated: ${app.id} to ${input.status}`);
        return app;
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Application not found or update failed",
          cause: error,
        });
      }
    }),

  deleteApplication: protectedProcedure
    .input(z.string().min(1, "Application ID is required"))
    .mutation(async ({ ctx, input }) => {
      try {
        const app = await ctx.db.modelApplication.delete({
          where: { id: input },
        });
        logger.info(`Application deleted: ${app.id}`);
        return app;
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Application not found",
          cause: error,
        });
      }
    }),
});
