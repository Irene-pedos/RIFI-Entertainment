import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc.js";
import { ServiceCategory, BookingStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
const bookingInput = z.object({
    serviceType: z.nativeEnum(ServiceCategory),
    clientName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(5),
    eventDate: z.string().optional().transform(v => v ? new Date(v) : undefined),
    location: z.string().optional(),
    guestCount: z.number().int().positive().optional(),
    amountQuoted: z.number().positive().optional(),
    notes: z.string().optional(),
    message: z.string().optional(),
    sourcePage: z.string().optional(),
});
export const bookingRouter = router({
    create: publicProcedure
        .input(bookingInput)
        .mutation(async ({ ctx, input }) => {
        return ctx.db.booking.create({
            data: {
                ...input,
                bookingCode: `BK-${nanoid(8).toUpperCase()}`,
                status: BookingStatus.PENDING,
            },
        });
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
        .input(z.string())
        .query(async ({ ctx, input }) => {
        const booking = await ctx.db.booking.findUnique({
            where: { id: input },
        });
        if (!booking)
            throw new TRPCError({ code: "NOT_FOUND" });
        return booking;
    }),
    updateStatus: protectedProcedure
        .input(z.object({
        id: z.string(),
        status: z.nativeEnum(BookingStatus),
    }))
        .mutation(({ ctx, input }) => {
        return ctx.db.booking.update({
            where: { id: input.id },
            data: { status: input.status },
        });
    }),
    update: protectedProcedure
        .input(z.object({
        id: z.string(),
        data: bookingInput.partial(),
    }))
        .mutation(({ ctx, input }) => {
        return ctx.db.booking.update({
            where: { id: input.id },
            data: input.data,
        });
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
            if (c.status === BookingStatus.PENDING)
                summary.pending = count;
            if (c.status === BookingStatus.CONFIRMED)
                summary.confirmed = count;
            if (c.status === BookingStatus.CANCELLED)
                summary.cancelled = count;
            if (c.status === BookingStatus.COMPLETED)
                summary.completed = count;
        });
        return summary;
    }),
});
