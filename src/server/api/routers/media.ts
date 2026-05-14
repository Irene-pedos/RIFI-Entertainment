import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../trpc";
import { MediaCategory, ServiceCategory } from "../../types";
import { TRPCError } from "@trpc/server";
import { logger } from "../../utils/logger";
import { supabase } from "../../supabase/admin";

const mediaMetadataInput = z.object({
  fileName: z.string(),
  originalName: z.string(),
  mimeType: z.string(),
  fileSize: z.number().int(),
  publicUrl: z.string().url(),
  storagePath: z.string(),
  altText: z.string().optional().nullable(),
  category: z.nativeEnum(MediaCategory).default(MediaCategory.OTHER),
  serviceType: z.nativeEnum(ServiceCategory).optional().nullable(),
});

export const mediaRouter = router({
  list: publicProcedure
    .input(z.object({
      category: z.nativeEnum(MediaCategory).optional(),
      serviceType: z.nativeEnum(ServiceCategory).optional(),
    }).optional())
    .query(({ ctx, input }) => {
      return ctx.db.mediaAsset.findMany({
        where: {
          category: input?.category,
          serviceType: input?.serviceType,
        },
        orderBy: { createdAt: "desc" },
      });
    }),

  createMetadata: protectedProcedure
    .input(mediaMetadataInput)
    .mutation(async ({ ctx, input }) => {
      try {
        const asset = await ctx.db.mediaAsset.create({
          data: {
            ...input,
            uploadedById: ctx.user.id,
          },
        });
        logger.info(`Media metadata created: ${asset.id}`);
        return asset;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create media metadata",
          cause: error,
        });
      }
    }),

  getUploadUrl: protectedProcedure
    .input(z.object({
      fileName: z.string(),
      contentType: z.string(),
    }))
    .mutation(async ({ input }) => {
      const fileExt = input.fileName.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const path = `media/${fileName}`;
      
      const { data, error } = await supabase.storage
        .from("rifi-media")
        .createSignedUploadUrl(path);

      if (error) {
        logger.error("Failed to create signed upload URL:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate upload URL",
        });
      }

      return {
        uploadUrl: data.signedUrl,
        path,
        fileName,
      };
    }),

  updateMetadata: protectedProcedure
    .input(z.object({
      id: z.string().min(1, "Media ID is required"),
      data: z.object({
        altText: z.string().optional().nullable(),
        category: z.nativeEnum(MediaCategory).optional(),
        serviceType: z.nativeEnum(ServiceCategory).optional().nullable(),
      }),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const asset = await ctx.db.mediaAsset.update({
          where: { id: input.id },
          data: input.data,
        });
        logger.info(`Media metadata updated: ${asset.id}`);
        return asset;
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Media asset not found",
          cause: error,
        });
      }
    }),

  deleteMetadata: protectedProcedure
    .input(z.string().min(1, "Media ID is required"))
    .mutation(async ({ ctx, input }) => {
      try {
        const asset = await ctx.db.mediaAsset.findUnique({
          where: { id: input },
        });

        if (!asset) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Media asset not found",
          });
        }

        // Delete from Supabase Storage
        try {
          const { error: storageError } = await supabase.storage
            .from("rifi-media")
            .remove([asset.storagePath]);
          
          if (storageError) {
            logger.error(`Storage deletion error for ${asset.storagePath}:`, storageError);
            // We continue anyway to keep DB in sync, or we could throw. 
            // Usually better to keep going if the file is already gone.
          }
        } catch (storageErr) {
          logger.error(`Failed to delete from storage:`, storageErr);
        }

        const deletedAsset = await ctx.db.mediaAsset.delete({
          where: { id: input },
        });
        
        logger.info(`Media asset and storage deleted: ${deletedAsset.id}`);
        return deletedAsset;
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete media asset",
          cause: error,
        });
      }
    }),
});
