import { router, publicProcedure } from "../trpc.js";
export const exampleRouter = router({
    hello: publicProcedure.query(() => {
        return { message: "Hello from tRPC!" };
    }),
});
