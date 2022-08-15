import * as z from "zod";

export const workersSchema = z.object({ id: z.string() });
export const profileSchema = z.object({ id: z.string() });

export type IWorker = z.infer<typeof workersSchema>;
export type IProfile = z.infer<typeof profileSchema>;
