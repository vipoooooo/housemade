import * as trpc from "@trpc/server";
import {
  getDeleteFile,
  getFile,
  uploadFile,
} from "../../../utils/google-service";
import { createRouter } from "../context";
import {
  deleteProjectSchema,
  oneProjectSchema,
  projectSchema,
  writeProjectSchema,
} from "./project.type";
import { v4 as uuidv4 } from "uuid";

export const projectRouter = createRouter()
  .query("projects", {
    input: projectSchema,
    resolve: async ({ ctx, input }) => {
      const projects = await ctx.prisma.project.findMany({
        where: { workerId: input.id },
        orderBy: { createdAt: "desc" },
      });

      if (!projects.length) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "project not found.",
        });
      }

      const theproject = await Promise.all(
        projects.map(async (project) => {
          let imageURL = "";
          try {
            imageURL = await getFile({
              id: project?.coverImg as string,
              folderId: "housemade-user-pfp",
            });
          } catch (err: any) {
            console.log(err.message);
          }

          return { ...project, imageURL };
        })
      );

      return {
        status: 200,
        message: "Here project",
        projects: theproject,
      };
    },
  })
  .query("project", {
    input: oneProjectSchema,
    resolve: async ({ ctx, input }) => {
      const project = await ctx.prisma.project.findFirst({
        where: { id: input.id },
      });

      if (!project) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "a specific project not found.",
        });
      }

      let imageURL = "";
      try {
        imageURL = await getFile({
          id: project?.coverImg as string,
          folderId: "housemade-user-pfp",
        });
      } catch (err: any) {
        console.log(err.message);
      }

      return {
        status: 200,
        message: "Here project",
        project: { ...project, imageURL },
      };
    },
  })
  .mutation("writeProject", {
    input: writeProjectSchema,
    resolve: async ({ ctx, input }) => {
      let image = input.image;

      if (input.imageBase64) {
        const uploadRes = await uploadFile({
          fileName: uuidv4(),
          folderId: "housemade-project-cover",
          fileData: input.imageBase64,
        });

        image = uploadRes.id || "";
      }

      const result = await ctx.prisma.project.upsert({
        where: { id: input.id || "" },
        update: {
          coverImg: image,
          title: input.title,
          description: input.description,
          client: input.client,
        },
        create: {
          coverImg: image,
          title: input.title,
          description: input.description,
          client: input.client,
          workerId: input.workerId,
        },
      });

      return {
        status: 200,
        message: "create project successfully",
        // result,
      };
    },
  })
  .mutation("deleteProject", {
    input: deleteProjectSchema,
    resolve: async ({ ctx, input }) => {
      const result = await ctx.prisma.project.delete({
        where: {
          id: input.id,
        },
      });
      if (!result) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "project cannot be deleted.",
        });
      }
      try {
        await getDeleteFile({ id: result.coverImg });
      } catch (err) {
        console.log("Image cannot be delete");
      }

      return {
        status: 200,
        message: "delete project successfully",
        result,
      };
    },
  });
