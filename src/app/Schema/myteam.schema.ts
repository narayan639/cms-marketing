import { z } from "zod";



export const myteamSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Must be a valid email." }).transform((email) => email.toLowerCase()),
    phone: z
    .string()
    .length(10, { message: "Phone number must be exactly 10 digits." }),
});

export type myteamSchemaType = z.infer<typeof myteamSchema>;
