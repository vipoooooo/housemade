import * as trpc from "@trpc/server";
import { createRouter } from "../context";
import { projectSchema } from "./project.type";

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
    input: projectSchema,
    resolve: async ({ ctx, input }) => {
      const project = await ctx.prisma.project.findFirst({
        where: { id: input.id },
      });

      return {
        status: 200,
        message: "Here project",
        project,
      };
    },
  });
