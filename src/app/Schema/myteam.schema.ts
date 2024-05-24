import { z } from "zod";


const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];

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
  address_province: z.string(),
  address_district: z.string(),
  address_municipility: z.string()

});

export type myteamSchemaType = z.infer<typeof myteamSchema>;
