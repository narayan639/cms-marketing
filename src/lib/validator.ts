import { z } from "zod";
import dayjs from "dayjs";

const eventFormSchema = z.object({
  date: z
    .date()
    .refine(
      (date) => date >= new Date("1900-01-01") && date <= new Date(),
      { message: "Date of event must be between 1900-01-01 and today" }
    ),
  time: z.string().refine((time) => {
    const parsedTime = dayjs(time, "HH:mm", true);
    return parsedTime.isValid();
  }, { message: "Invalid time format. Use 'HH:mm'" }),
  client_name: z
    .string().min(3,{ message: "Client name is required" }),
  address: z.string().nonempty({ message: "Address is required" }),
  budget: z.string().optional(),
  phonenumber: z
    .string()
    .nonempty({ message: "Phone number is required" })
    .regex(
      /^9\d{9}$/,
      { message: "Phone number must start with 9 and be exactly 10 digits." }
    ),
  company_name: z
    .string()
    .min(2, { message: "Company name is required and must be at least 2 characters" }),
  requirements: z.string().nonempty({ message: "Requirements are required" }),
  feedback: z.string().nonempty({ message: "Feedback is required" }),
  remarks: z.string().optional(),
});

export default eventFormSchema;
