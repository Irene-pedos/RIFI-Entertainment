import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc.js";
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
        key: z.string(),
        value: z.string(),
    }))
        .mutation(({ ctx, input }) => {
        return ctx.db.siteSetting.update({
            where: { key: input.key },
            data: { value: input.value },
        });
    }),
    upsertMany: protectedProcedure
        .input(z.array(z.object({
        key: z.string(),
        value: z.string(),
        type: z.string().default("string"),
    })))
        .mutation(async ({ ctx, input }) => {
        const operations = input.map(setting => ctx.db.siteSetting.upsert({
            where: { key: setting.key },
            update: { value: setting.value },
            create: setting,
        }));
        await ctx.db.$transaction(operations);
        return { success: true };
    }),
});
