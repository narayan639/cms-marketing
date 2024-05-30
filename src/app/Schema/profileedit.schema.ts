import { z } from "zod";


export const profileSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(30,{message:"Neame must under 30 characters"}),
  email: z
    .string()
    .min(3, { message: "Email is required." })
    .email({ message: "Must be a valid email." }).transform((email) => email.toLowerCase()),
  phone: z
    .string()
    .min(10)
    .max(10, { message: "Phone number should be exactly 10 digits." }),
  address_province: z.string(),
  address_district: z.string(),
  address_municipility: z.string(),
  
 
});

export type profileSchemaType = z.infer<typeof profileSchema>;
