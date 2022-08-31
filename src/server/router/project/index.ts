import * as trpc from "@trpc/server";
import { createRouter } from "../context";
import { oneProjectSchema, projectSchema, writeProjectSchema } from "./project.type";

export const projectRouter = createRouter()
  .query("projects", {
    input: projectSchema,
    resolve: async ({ ctx, input }) => {
      const projects = await ctx.prisma.project.findMany({
        where: { workerId: input.id },
      });

      if (!projects.length) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "project not found.",
        });
      }

      return {
        status: 200,
        message: "Here project",
        projects: projects,
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
          message: "project not found.",
        });
      }

      return {
        status: 200,
        message: "Here project",
        project,
      };
    },
  })

  .mutation("writeProject", {
    input: writeProjectSchema,
    resolve: async({ ctx, input}) => {

      const result = await ctx.prisma.project.create({
        data:{
          // coverImg: input.coverImg,
          title: input.title,
          description: input.description,
          client: input.client,
          workerId: input.workerId,
        }
      });

      return {
        status: 200,
        message: "create project successfully",
        result,
      }
    },
  });
