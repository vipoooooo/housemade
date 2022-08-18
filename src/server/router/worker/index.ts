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
        // include worker
        include: {
          user: true,
          subcategory: true,
        },
      });
      console.log(workers);
      if (!workers.length) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "Workers not found.",
        });
      }

      return {
        status: 200,
        message: "Here workers",
        workers,
      };
    },
  })
  .query("profile", {
    input: profileSchema,
    resolve: async ({ ctx, input }) => {
      const profile = await ctx.prisma.worker.findFirst({
        where: { id: input.id },
        include: {
          user: true, // Return all fields
          subcategory: true,
        },
      });

      return {
        status: 200,
        message: "Here profile",
        profile,
      };
    },
  });
