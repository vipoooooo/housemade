import * as z from "zod";

export const getUserSchema = z.object({
  id: z.string(),
});

export const userSchema = z.object({
  id: z.string(),
  role: z.string(),
  pfp:
    typeof window === "undefined"
      ? z.any()
      : z.union([z.instanceof(File), z.string()]),
  username: z.string(),
  email: z.string(),
  // password: z.string(),
  // subcategoryId: z
  //   .array(z.object({ label: z.string(), id: z.string() }))
  //   .optional(),
  subcategoryId: z.any().optional(),
  description: z.string().optional(),
  link: z.string().url().optional(),
});

export type IGetUser = z.infer<typeof getUserSchema>;
export type IUser = z.infer<typeof userSchema>;
export type IWorker = z.infer<typeof userSchema>;
