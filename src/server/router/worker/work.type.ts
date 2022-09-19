import * as z from "zod";

export const workersSchema = z.object({ id: z.string() });
export const registerWorkerSchema = z.object({
  userId: z.string(),
  subcategoryId: z.any().optional(),
  description: z.string().optional(),
  link: z.string().url().optional(),
});
export const bookmarkSchema = z.object({
  id: z.string(),
  bookmark: z.boolean(),
});

export type IWorker = z.infer<typeof workersSchema>;
export type IProfile = z.infer<typeof workersSchema>;
export type IRegisterWorker = z.infer<typeof registerWorkerSchema>;
export type IBookmark = z.infer<typeof bookmarkSchema>;
