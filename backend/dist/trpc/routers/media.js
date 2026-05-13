import { z } from "zod";
import { router, protectedProcedure } from "../trpc.js";
import { MediaCategory } from "@prisma/client";
const mediaMetadataInput = z.object({
    fileName: z.string(),
    originalName: z.string(),
    mimeType: z.string(),
    fileSize: z.number().int(),
    publicUrl: z.string().url(),
    storagePath: z.string(),
    altText: z.string().optional(),
    category: z.nativeEnum(MediaCategory).default(MediaCategory.OTHER),
});
export const mediaRouter = router({
    list: protectedProcedure
        .input(z.object({
        category: z.nativeEnum(MediaCategory).optional(),
    }).optional())
        .query(({ ctx, input }) => {
        return ctx.db.mediaAsset.findMany({
            where: {
                category: input?.category,
            },
            orderBy: { createdAt: "desc" },
        });
    }),
    createMetadata: protectedProcedure
        .input(mediaMetadataInput)
        .mutation(({ ctx, input }) => {
        return ctx.db.mediaAsset.create({
            data: {
                ...input,
                uploadedById: ctx.user.id,
            },
        });
    }),
    updateMetadata: protectedProcedure
        .input(z.object({
        id: z.string(),
        data: z.object({
            altText: z.string().optional(),
            category: z.nativeEnum(MediaCategory).optional(),
        }),
    }))
        .mutation(({ ctx, input }) => {
        return ctx.db.mediaAsset.update({
            where: { id: input.id },
            data: input.data,
        });
    }),
    deleteMetadata: protectedProcedure
        .input(z.string())
        .mutation(({ ctx, input }) => {
        return ctx.db.mediaAsset.delete({
            where: { id: input },
        });
    }),
});
