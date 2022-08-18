import * as z from "zod";

export const reviewSchema = z.object({ id: z.string() });
export const writeReviewSchema = z.object({
  reviewId: z.string(),
  description: z.string(),
  rating: z.number(),
  userId: z.string(),
  workerId: z.string(),
});

export type IReview = z.infer<typeof reviewSchema>;
export type IWriteReview = z.infer<typeof writeReviewSchema>;
