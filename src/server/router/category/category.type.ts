import * as z from "zod";

export const categorySchema = z.object({ id: z.string() });

export type IFindCategory = z.infer<typeof categorySchema>;
