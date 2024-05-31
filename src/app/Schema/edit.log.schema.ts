import { z } from "zod";

export const EventDataSchema = z.object({
  client_name: z.string().min(3, { message: "Client name is required" }),
  address: z.string().min(3, { message: "Address is required" }),
  phonenumber: z.string().min(10).max(10, { message: "Phone number should 10 digits only" }),
  company_name: z.string().min(3, { message: "Company name is required" }),
  requirements: z.string().min(3, { message: "Requirements is required" }),
  feedback: z.string().min(3, { message: "Feedback is required" }),
  remarks: z.string().optional(),
  budget: z.string().min(1, { message: "Budget is required" }),
});

export type eventdataSchemaType = z.infer<typeof EventDataSchema>;
