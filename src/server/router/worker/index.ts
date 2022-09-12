import { Review, SubCategory, User, Worker } from "@prisma/client";
import * as trpc from "@trpc/server";
import { getFile } from "../../../utils/google-service";
import { createRouter } from "../context";
import { profileSchema, workersSchema } from "./work.type";

export const workerRouter = createRouter()
  .query("workers", {
    input: workersSchema,
    resolve: async ({ input, ctx }) => {
      type WorkerT = Worker & {
        user: User & {
          review_worker: Review[];
        };
        subcategory: SubCategory;
      };

      const workers: WorkerT[] = await ctx.prisma.worker.findMany({
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

      // const theworker = await Promise.all(
      //   workers.map(async (worker) => {
      //     let imageURL = "";
      //     try {
      //       imageURL = await getFile({
      //         id: worker?.user?.image as string,
      //         folderId: "housemade-user-pfp",
      //       });
      //     } catch (err: any) {
      //       console.log(err.message);
      //     }

      //     return { ...worker, imageURL };
      //   })
      // );

      if (!workers.length) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "Workers not found.",
        });
      }

      const data = await Promise.all(
        workers.map(async (worker) => {
          let imageURL = "";
          try {
            imageURL = await getFile({
              id: worker.user.image as string,
              folderId: "housemade-user-pfp",
            });
          } catch (err: any) {
            console.log(err.message);
          }

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
            imageURL,
          };
        })
      );

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

      let imageURL = "";
      try {
        imageURL = await getFile({
          id: profile?.user?.image as string,
          folderId: "housemade-user-pfp",
        });
      } catch (err: any) {
        console.log(err.message);
      }

      return {
        status: 200,
        message: "Here profile",
        profile: {
          ...profile,
          rating,
          reviewer: profile?.user?.review_worker.length,
          imageURL,
        },
      };
    },
  });
