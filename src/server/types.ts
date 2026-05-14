import { z } from "zod";
import { 
  AdminRole, 
  BookingStatus, 
  InquiryStatus, 
  ModelApplicationStatus, 
  ServiceCategory, 
  MediaCategory 
} from "@prisma/client";

/**
 * Re-export Prisma enums for centralized access
 */
export {
  AdminRole,
  BookingStatus,
  InquiryStatus,
  ModelApplicationStatus,
  ServiceCategory,
  MediaCategory
};

/**
 * Common Zod Schemas
 */
export const PaginationSchema = z.object({
  limit: z.number().min(1).max(100).default(50),
  cursor: z.string().nullish(),
});

/**
 * Date normalization utility
 * Ensures dates are consistently handled as UTC or specific formats if needed
 */
export const normalizeDate = (date: Date | string | number): Date => {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date provided");
  }
  return d;
};

/**
 * Zod Date transformer
 * Consistently transforms string/number inputs to Date objects
 */
export const DateSchema = z.union([z.date(), z.string(), z.number()])
  .transform((v) => normalizeDate(v));

export const OptionalDateSchema = z.union([z.date(), z.string(), z.number()])
  .optional()
  .nullable()
  .transform((v) => (v ? normalizeDate(v) : undefined));
