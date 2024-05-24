import { z } from "zod";



export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Must be a valid email." }),
  password: z.string().min(2, {message: "password is required"})

});

export type loginSchemaType = z.infer<typeof loginSchema>;
