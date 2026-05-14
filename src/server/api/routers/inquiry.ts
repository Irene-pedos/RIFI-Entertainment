import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { InquiryStatus } from "../../types";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { logger } from "../../utils/logger";

const inquiryInput = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(5, "Phone number must be at least 5 characters").optional().nullable(),
  subject: z.string().min(1, "Subject is required").optional().nullable(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const inquiryRouter = router({
  create: publicProcedure
    .input(inquiryInput)
    .mutation(async ({ ctx, input }) => {
      try {
        const inquiry = await ctx.db.inquiry.create({
          data: {
            ...input,
            inquiryCode: `INQ-${nanoid(8).toUpperCase()}`,
            status: InquiryStatus.NEW,
          },
        });
        logger.info(`New inquiry created: ${inquiry.inquiryCode}`);
        return inquiry;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to submit inquiry",
          cause: error,
        });
      }
    }),

  list: protectedProcedure
    .input(z.object({
      status: z.nativeEnum(InquiryStatus).optional(),
    }).optional())
    .query(({ ctx, input }) => {
      return ctx.db.inquiry.findMany({
        where: {
          status: input?.status,
        },
        orderBy: { createdAt: "desc" },
      });
    }),

  getById: protectedProcedure
    .input(z.string().min(1, "Inquiry ID is required"))
    .query(async ({ ctx, input }) => {
      const inquiry = await ctx.db.inquiry.findUnique({
        where: { id: input },
      });
      if (!inquiry) {
        throw new TRPCError({ 
          code: "NOT_FOUND",
          message: "Inquiry not found"
        });
      }
      return inquiry;
    }),

  markRead: protectedProcedure
    .input(z.string().min(1, "Inquiry ID is required"))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.inquiry.update({
          where: { id: input },
          data: { status: InquiryStatus.IN_PROGRESS },
        });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Inquiry not found",
          cause: error,
        });
      }
    }),

  markReplied: protectedProcedure
    .input(z.string().min(1, "Inquiry ID is required"))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.inquiry.update({
          where: { id: input },
          data: { status: InquiryStatus.RESOLVED },
        });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Inquiry not found",
          cause: error,
        });
      }
    }),

  delete: protectedProcedure
    .input(z.string().min(1, "Inquiry ID is required"))
    .mutation(async ({ ctx, input }) => {
      try {
        const inquiry = await ctx.db.inquiry.delete({
          where: { id: input },
        });
        logger.info(`Inquiry deleted: ${inquiry.id}`);
        return inquiry;
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Inquiry not found",
          cause: error,
        });
      }
    }),

  bulkMarkReplied: protectedProcedure
    .input(z.object({
      ids: z.array(z.string().min(1)),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const result = await ctx.db.inquiry.updateMany({
          where: { id: { in: input.ids } },
          data: { status: InquiryStatus.RESOLVED },
        });
        logger.info(`Bulk marked replied: ${result.count} inquiries`);
        return result;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update inquiries",
          cause: error,
        });
      }
    }),

  bulkDelete: protectedProcedure
    .input(z.object({
      ids: z.array(z.string().min(1)),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const result = await ctx.db.inquiry.deleteMany({
          where: { id: { in: input.ids } },
        });
        logger.info(`Bulk deleted: ${result.count} inquiries`);
        return result;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete inquiries",
          cause: error,
        });
      }
    }),
});
