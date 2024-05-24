import { z } from "zod";

export const EventDataSchema = z.object({
  client_name: z.string().min(3, { message: "Client name is required" }),
  address: z.string().min(3, { message: "Address is required" }),
  phonenumber: z.string().min(3, { message: "Phone number is required" }),
  company_name: z.string().min(3, { message: "Company name is required" }),
  requirements: z.string().optional(),
  feedback: z.string().min(3, { message: "Feedback is required" }),
  remarks: z.string().min(3, { message: "Remarks are required" }),
  budget: z.string().min(1, { message: "Budget is required" }),
});

export type eventdataSchemaType = z.infer<typeof EventDataSchema>;
