import * as z from "zod";

export const workersSchema = z.object({ id: z.string() });
export const profileSchema = z.object({ id: z.string() });
export const registerWorkerSchema = z.object({
  userId: z.string(),
  subcategoryId: z.any().optional(),
  description: z.string().optional(),
  link: z.string().url().optional(),
});

export type IWorker = z.infer<typeof workersSchema>;
export type IProfile = z.infer<typeof profileSchema>;
export type IRegisterWorker = z.infer<typeof registerWorkerSchema>;
