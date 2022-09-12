import * as trpc from "@trpc/server";
import { getFile } from "../../../utils/google-service";
import { createRouter } from "../context";
import { reviewSchema, writeReviewSchema } from "./review.type";

export const reviewRouter = createRouter()
  .query("reviews", {
    input: reviewSchema,
    resolve: async ({ ctx, input }) => {
      const reviews = await ctx.prisma.review.findMany({
        where: { workerId: input.id },
        include: {
          client: true,
        },
        orderBy: { createdAt: "desc" },
      });

      const thereview = await Promise.all( reviews.map(async (review) =>  
      {
        let imageURL = "";
        try {
          imageURL = await getFile({
            id: review?.client?.image as string ,
            folderId: "housemade-user-pfp",
          });
        } catch (err: any) {
          console.log(err.message);
        }

        return {...review, imageURL }
      }))
      
      console.log(thereview);

      if (!reviews.length) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "review not found.",
        });
      }

      return {
        status: 200,
        message: "Here review",
        reviews: thereview,
      };
    },
  })

  .mutation("review", {
    input: writeReviewSchema,
    resolve: async ({ ctx, input }) => {
      const result = await ctx.prisma.review.upsert({
        where: {
          id: input.reviewId,
        },
        update: {
          description: input.description,
          rating: input.rating,
        },
        create: {
          description: input.description,
          rating: input.rating,
          clientId: input.userId,
          workerId: input.workerId,
        },
      });

      return {
        status: 201,
        message: "Review successfully",
        result,
      };
    },
  });
