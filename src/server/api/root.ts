import { router, publicProcedure } from "./trpc";
import { authRouter } from "./routers/auth";
import { bookingRouter } from "./routers/booking";
import { inquiryRouter } from "./routers/inquiry";
import { modelRouter } from "./routers/model";
import { serviceRouter } from "./routers/service";
import { testimonialRouter } from "./routers/testimonial";
import { siteSettingRouter } from "./routers/site-setting";
import { mediaRouter } from "./routers/media";

export const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: "ok", timestamp: new Date() };
  }),
  auth: authRouter,
  booking: bookingRouter,
  inquiry: inquiryRouter,
  model: modelRouter,
  service: serviceRouter,
  testimonial: testimonialRouter,
  siteSetting: siteSettingRouter,
  media: mediaRouter,
});

export type AppRouter = typeof appRouter;
