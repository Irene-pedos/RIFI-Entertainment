import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc.js";
import { logger } from "../../lib/logger.js";
import { TRPCError } from "@trpc/server";

export const siteSettingRouter = router({
  getPublicSettings: publicProcedure.query(({ ctx }) => {
    return ctx.db.siteSetting.findMany({
      select: { key: true, value: true, type: true },
    });
  }),

  listAdmin: protectedProcedure.query(({ ctx }) => {
    return ctx.db.siteSetting.findMany();
  }),

  updateSetting: protectedProcedure
    .input(z.object({
      key: z.string().min(1, "Key is required"),
      value: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const setting = await ctx.db.siteSetting.update({
          where: { key: input.key },
          data: { value: input.value },
        });
        logger.info(`Site setting updated: ${input.key}`);
        return setting;
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Setting not found",
          cause: error,
        });
      }
    }),

  upsertMany: protectedProcedure
    .input(z.array(z.object({
      key: z.string().min(1, "Key is required"),
      value: z.string(),
      type: z.string().default("string"),
    })))
    .mutation(async ({ ctx, input }) => {
      try {
        const operations = input.map(setting => 
          ctx.db.siteSetting.upsert({
            where: { key: setting.key },
            update: { value: setting.value },
            create: setting,
          })
        );
        await ctx.db.$transaction(operations);
        logger.info(`Site settings batch update: ${input.length} items`);
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update settings",
          cause: error,
        });
      }
    }),
});
