import { z } from "zod";



export const myteamSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Must be a valid email." }),
  phone: z
    .string()
    .min(10, { message: "Phone number is required." })
    .max(14, { message: "Phone no shouldn't be more than 14 digits." }),
});

export type myteamSchemaType = z.infer<typeof myteamSchema>;
