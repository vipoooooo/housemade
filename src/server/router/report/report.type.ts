import * as z from "zod";

export const writeReportSchema = z.object({
  description: z.string(),
  userId: z.string(),
  workerId: z.string(),
});

export type IWriteReport = z.infer<typeof writeReportSchema>;
