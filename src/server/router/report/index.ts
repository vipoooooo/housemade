import * as trpc from "@trpc/server";
import { createRouter } from "../context";
import { writeReportSchema } from "./report.type";

export const reportRouter = createRouter().mutation("report", {
  input: writeReportSchema,
  resolve: async ({ ctx, input }) => {
    console.log("input", input);

    const result = await ctx.prisma.report.create({
      data: {
        description: input.description,
        clientId: input.userId,
        workerId: input.workerId,
      },
    });

    return {
      status: 201,
      message: "Report successfully",
      result,
    };
  },
});
