import { Category, SubCategory, User } from "@prisma/client";
import * as trpc from "@trpc/server";
import { verify } from "argon2";
import { createRouter } from "../context";
import { userSchema, getUserSchema } from "./user.type";
import { v4 as uuidv4 } from "uuid";

export const userRouter = createRouter()
  .query("getUser", {
    input: getUserSchema,
    resolve: async ({ ctx, input }) => {
      const user: User | null = await ctx.prisma.user.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!user) {
        return null;
      }

      return {
        code: 200,
        message: "User data",
        user,
      };
    },
  })
  .mutation("user", {
    input: userSchema,
    resolve: async ({ ctx, input }) => {
      // const isValidPassword = await verify(user.password, input.password);

      // if (!isValidPassword) {
      //   return null;
      // }
      // const image = uuidv4() + "." + input.pfp.type.split("/")[1];
      // const imagePath = "profile-image/";
      console.log(input, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

      const userResult = await ctx.prisma.user.update({
        where: { id: input.id },
        data: {
          // image: imagePath + image,
          image:
            "https://i.pinimg.com/564x/a9/97/ec/a997ec11c58c945802d2ac73b298f7d5.jpg",
          username: input.username,
          email: input.email,
        },
      });

      console.log(userResult, "~~~~~~~~~~~~~~~~~~~~~");

      // WORKER
      const subcategory = input.subcategoryId;
      if (input.role === "worker" && subcategory?.length) {
        const subCategory: SubCategory | null =
          await ctx.prisma.subCategory.findFirst({
            where: { id: subcategory[0]?.id },
          });

        if (!subCategory) {
          throw new trpc.TRPCError({
            code: "NOT_FOUND",
            message: "Subcategory not found.",
          });
        }

        const workerResult = await ctx.prisma.worker.update({
          where: { id: input.id },
          data: {
            subcategoryId: subcategory[0]?.id,
            categoryId: subCategory.categoryId,
            description: input.description,
            link: input.link,
          },
        });

        if (!workerResult) {
          throw new trpc.TRPCError({
            code: "BAD_REQUEST",
            message: "Can not update worker.",
          });
        }
      }

      return {
        status: 200,
        message: "Update user successfully",
      };
    },
  });
