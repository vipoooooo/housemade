import * as z from "zod";

export const projectSchema = z.object({ id: z.string() });
export const oneProjectSchema = z.object({ id: z.string() });

export const writeProjectSchema = z.object({ 
    // imageBase64: z.string(),
    // image: z.string(),
    title: z.string(),
    client: z.string(),
    description: z.string(),
    workerId: z.string(),
 });

export type IProjectcategory = z.infer<typeof projectSchema>;
export type IOneProjectcategory = z.infer<typeof oneProjectSchema>;
export type IwriteProjectSchema = z.infer<typeof writeProjectSchema>;