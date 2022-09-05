import * as trpc from "@trpc/server";
import { createRouter } from "../context";
import { categorySchema } from "./category.type";

export const categoryRouter = createRouter()
  .query("categories", {
    resolve: async ({ ctx }) => {
      const categories = await ctx.prisma.category.findMany({
        orderBy: { title: "asc" },
      });

      if (!categories.length) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "Category not found.",
        });
      }

      return {
        status: 200,
        message: "Here Category",
        categories: categories,
      };
    },
  })
  .query("categoriesWithSubcategory", {
    resolve: async ({ ctx }) => {
      const categories = await ctx.prisma.category.findMany({
        include: {
          subcategories: {
            select: { id: true, title: true },
          },
        },
        orderBy: { title: "asc" },
      });

      if (!categories.length) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "Category with subcategories not found.",
        });
      }

      let optionValue = {};
      for (let i = 0; i < categories.length; i++) {
        Object.assign(optionValue, {
          [`${categories[i]?.title}`]: categories[i]?.subcategories.map(
            (sub) => ({
              id: sub.id,
              label: sub.title,
            })
          ),
        });
      }

      return {
        status: 200,
        message: "Here Category",
        categories: optionValue,
      };
    },
  })
  .query("category", {
    input: categorySchema,
    resolve: async ({ input, ctx }) => {
      const category = await ctx.prisma.category.findFirst({});
    },
  });
