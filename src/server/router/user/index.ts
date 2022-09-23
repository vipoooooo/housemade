import { Category, SubCategory, User, Worker } from "@prisma/client";
import * as trpc from "@trpc/server";
import { verify } from "argon2";
import { createRouter } from "../context";
import { userSchema, getUserSchema } from "./user.type";
import { v4 as uuidv4 } from "uuid";
import {
  uploadFile,
  getFile,
  getMultipleFile,
  getDeleteFile,
  getDeleteFiles,
} from "../../../utils/google-service";

export const userRouter = createRouter()
  .query("getUser", {
    input: getUserSchema,
    resolve: async ({ ctx, input }) => {
      if (!input.id) return;

      const user = await ctx.prisma.user.findFirst({
        where: { id: input.id },
        include: {
          worker: { include: { subcategory: true } },
          review_worker: true,
        },
      });

      if (!user) {
        return null;
      }

      let imageURL = "";
      try {
        imageURL = await getFile({
          id: user.image as string,
          folderId: "housemade-user-pfp",
        });
      } catch (err: any) {
        console.log(err.message);
      }

      return {
        code: 200,
        message: "User data",
        user: { ...user, imageURL },
      };
    },
  })
  .mutation("user", {
    input: userSchema,
    resolve: async ({ ctx, input }) => {
      let image = input.image;

      if (input.imageBase64) {
        /* 
          - check if image is already exist ? delete image : do nothing
          - saving storage space
        */
        try {
          await getDeleteFile({ id: input.image });
        } catch (err) {
          console.log("Old image not found");
        }

        const uploadRes = await uploadFile({
          fileName: uuidv4(),
          folderId: "housemade-user-pfp",
          fileData: input.imageBase64,
        });

        image = uploadRes.id || "";
      }

      const userResult = await ctx.prisma.user.update({
        where: { id: input.id },
        data: {
          image,
          username: input.username,
          email: input.email,
        },
      });

      // WORKER
      const subcategory = input.subcategoryId[0];
      if (input.role === "worker") {
        const subCategory: SubCategory | null =
          await ctx.prisma.subCategory.findFirst({
            where: { id: subcategory.id },
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
            subcategoryId: subcategory.id,
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
