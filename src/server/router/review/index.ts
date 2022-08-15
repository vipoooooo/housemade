import * as trpc from "@trpc/server";
import { createRouter } from "../context";
import { reviewSchema } from "./review.type";

export const reviewRouter = createRouter().query("reviews", {
  input: reviewSchema,
  resolve: async ({ ctx, input }) => {
    const reviews = await ctx.prisma.review.findMany({
      where: { workerId: input.id },
      include: {
        user: true,
      },
    });

    if (!reviews.length) {
      throw new trpc.TRPCError({
        code: "NOT_FOUND",
        message: "review not found.",
      });
    }

    return {
      status: 200,
      message: "Here review",
      reviews: reviews,
    };
  },
});
