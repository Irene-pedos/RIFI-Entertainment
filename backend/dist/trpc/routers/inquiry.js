import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc.js";
import { InquiryStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
const inquiryInput = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    subject: z.string().optional(),
    message: z.string().min(10),
});
export const inquiryRouter = router({
    create: publicProcedure
        .input(inquiryInput)
        .mutation(async ({ ctx, input }) => {
        return ctx.db.inquiry.create({
            data: {
                ...input,
                inquiryCode: `INQ-${nanoid(8).toUpperCase()}`,
                status: InquiryStatus.NEW,
            },
        });
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
        .input(z.string())
        .query(async ({ ctx, input }) => {
        const inquiry = await ctx.db.inquiry.findUnique({
            where: { id: input },
        });
        if (!inquiry)
            throw new TRPCError({ code: "NOT_FOUND" });
        return inquiry;
    }),
    markRead: protectedProcedure
        .input(z.string())
        .mutation(({ ctx, input }) => {
        return ctx.db.inquiry.update({
            where: { id: input },
            data: { status: InquiryStatus.IN_PROGRESS },
        });
    }),
    markReplied: protectedProcedure
        .input(z.string())
        .mutation(({ ctx, input }) => {
        return ctx.db.inquiry.update({
            where: { id: input },
            data: { status: InquiryStatus.RESOLVED },
        });
    }),
    delete: protectedProcedure
        .input(z.string())
        .mutation(({ ctx, input }) => {
        return ctx.db.inquiry.delete({
            where: { id: input },
        });
    }),
});
