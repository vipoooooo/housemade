import * as z from "zod";

export const reviewSchema = z.object({ id: z.string() });

export type IReviewcategory = z.infer<typeof reviewSchema>;
