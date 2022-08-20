import * as trpc from "@trpc/server";
import { tuple, z } from "zod";
import { createRouter } from "../context";
import { profileSchema, workersSchema } from "./work.type";

export const workerRouter = createRouter()
  .query("workers", {
    input: workersSchema,
    resolve: async ({ input, ctx }) => {
      // .user
      const workers = await ctx.prisma.worker.findMany({
        where: {
          OR: [
            { categoryId: { equals: input.id } },
            { subcategoryId: { equals: input.id } },
          ],
        },
        include: {
          user: {
            include: {
              review_worker: true,
            },
          },
          subcategory: true,
        },
      });

      if (!workers.length) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "Workers not found.",
        });
      }

      const data = workers.map((worker: any) => {
        const totalR = worker.user.review_worker.length
          ? worker.user.review_worker.reduce((las: number, cur: any) => {
              return cur ? cur.rating + las : 0;
            }, 0)
          : 0;
        const rating = totalR ? totalR / worker.user.review_worker.length : 0;
        return {
          ...worker,
          rating,
          reviewer: worker.user.review_worker.length,
        };
      });

      return {
        status: 200,
        message: "Here workers",
        workers: data,
      };
    },
  })
  .query("profile", {
    input: profileSchema,
    resolve: async ({ ctx, input }) => {
      const profile = await ctx.prisma.worker.findFirst({
        where: { id: input.id },
        include: {
          user: {
            include: {
              review_worker: true,
            },
          },
          subcategory: true,
        },
      });

      const totalRating = profile?.user?.review_worker.reduce(
        (las: number, cur: any) => {
          return cur ? cur.rating + las : 0;
        },
        0
      );
      const rating =
        totalRating && profile?.user
          ? totalRating / profile?.user.review_worker.length
          : 0;

      return {
        status: 200,
        message: "Here profile",
        profile: {
          ...profile,
          rating,
          reviewer: profile?.user?.review_worker.length,
        },
      };
    },
  });
