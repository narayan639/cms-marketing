import { z } from "zod";


export const forgotSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Email is required." })
    .email({ message: "Must be a valid email." }).transform((email) => email.toLowerCase()),
 
});

export type forgotSchemaType = z.infer<typeof forgotSchema>;
