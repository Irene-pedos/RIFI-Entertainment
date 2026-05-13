import { router, publicProcedure } from "./trpc.js";
import { authRouter } from "./routers/auth.js";
import { bookingRouter } from "./routers/booking.js";
import { inquiryRouter } from "./routers/inquiry.js";
import { modelRouter } from "./routers/model.js";
import { serviceRouter } from "./routers/service.js";
import { testimonialRouter } from "./routers/testimonial.js";
import { siteSettingRouter } from "./routers/siteSetting.js";
import { mediaRouter } from "./routers/media.js";
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
