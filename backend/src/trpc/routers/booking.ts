import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc.js";
import { ServiceCategory, BookingStatus, OptionalDateSchema } from "../../lib/types.js";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";

const bookingInput = z.object({
  serviceType: z.nativeEnum(ServiceCategory),
  clientName: z.string().min(2, "Client name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(5, "Phone number must be at least 5 characters"),
  eventDate: OptionalDateSchema,
  location: z.string().min(1, "Location is required").optional().nullable(),
  guestCount: z.number().int().positive().optional().nullable(),
  amountQuoted: z.number().positive().optional().nullable(),
  notes: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  sourcePage: z.string().optional().nullable(),
});

export const bookingRouter = router({
  create: publicProcedure
    .input(bookingInput)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.booking.create({
          data: {
            ...input,
            bookingCode: `BK-${nanoid(8).toUpperCase()}`,
            status: BookingStatus.PENDING,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create booking",
          cause: error,
        });
      }
    }),

  list: protectedProcedure
    .input(z.object({
      status: z.nativeEnum(BookingStatus).optional(),
      serviceType: z.nativeEnum(ServiceCategory).optional(),
    }).optional())
    .query(({ ctx, input }) => {
      return ctx.db.booking.findMany({
        where: {
          status: input?.status,
          serviceType: input?.serviceType,
        },
        orderBy: { createdAt: "desc" },
      });
    }),

  getById: protectedProcedure
    .input(z.string().min(1, "Booking ID is required"))
    .query(async ({ ctx, input }) => {
      const booking = await ctx.db.booking.findUnique({
        where: { id: input },
      });
      if (!booking) {
        throw new TRPCError({ 
          code: "NOT_FOUND",
          message: "Booking not found"
        });
      }
      return booking;
    }),

  updateStatus: protectedProcedure
    .input(z.object({
      id: z.string().min(1, "Booking ID is required"),
      status: z.nativeEnum(BookingStatus),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.booking.update({
          where: { id: input.id },
          data: { status: input.status },
        });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Booking not found or update failed",
          cause: error,
        });
      }
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string().min(1, "Booking ID is required"),
      data: bookingInput.partial(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.booking.update({
          where: { id: input.id },
          data: input.data,
        });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Booking not found or update failed",
          cause: error,
        });
      }
    }),

  dashboardSummary: protectedProcedure.query(async ({ ctx }) => {
    const counts = await ctx.db.booking.groupBy({
      by: ['status'],
      _count: {
        _all: true
      }
    });

    const summary = {
      total: 0,
      pending: 0,
      confirmed: 0,
      cancelled: 0,
      completed: 0,
    };

    counts.forEach(c => {
      const count = c._count._all;
      summary.total += count;
      if (c.status === BookingStatus.PENDING) summary.pending = count;
      if (c.status === BookingStatus.CONFIRMED) summary.confirmed = count;
      if (c.status === BookingStatus.CANCELLED) summary.cancelled = count;
      if (c.status === BookingStatus.COMPLETED) summary.completed = count;
    });

    return summary;
  }),
});
