import * as z from "zod";

export const subcategorySchema = z.object({ id: z.string() })

export type IFindSubcategory = z.infer<typeof subcategorySchema>;