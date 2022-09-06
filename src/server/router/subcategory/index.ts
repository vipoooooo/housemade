import * as trpc from "@trpc/server";
import { z } from "zod";
import { createRouter } from "../context";
import { subcategorySchema } from "./subcategory.type";

export const subcategoryRouter = createRouter()
  .query("subcategories", {
    input: subcategorySchema,
    resolve: async ({ ctx, input }) => {
      const subcategories = await ctx.prisma.subCategory.findMany({
        where: { categoryId: input.id },
        include: { category: true },
      });

      if (!subcategories.length) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "Subcategory not found.",
        });
      }

      return {
        status: 200,
        message: "Here Subcategory",
        subcategories,
      };
    },
  })
  .query("subcategorylist", {
    resolve: async ({ ctx }) => {
      const subcategorylist = await ctx.prisma.subCategory.findMany();

      if (!subcategorylist.length) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "Subcategory not found.",
        });
      }

      return {
        status: 200,
        message: "Here Subcategory",
        subcategorylist: subcategorylist.map((sub) => ({
          label: sub.title,
          id: sub.id,
        })),
      };
    },
  });
