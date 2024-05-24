import { z } from "zod";
import dayjs from "dayjs";

const eventFormSchema = z.object({
  date: z
    .date()
    .refine(
      (date) => date >= new Date("1900-01-01") && date <= new Date(),
      "Date of event must be between 1900-01-01 and today"
    ),
  time: z.string().refine((time) => {
    const parsedTime = dayjs(time, "HH:mm", true);
    return parsedTime.isValid();
  }, "Invalid time format. Use 'HH:mm'"),
  client_name: z
    .string()
    .nonempty("Client name is required"),
  address: z.string().nonempty("Address is required"),
  budget: z.string().optional(),
  phonenumber: z
    .string()
    .nonempty("Phone number is required")
    .regex(
      /^9\d{9}$/,
      "Phone number must start with 9 and be exactly 10 digits."
    ),
  company_name: z
    .string()
    .min(2, {message: "Company name is required"}),
  requirements: z.string().nonempty("Requirements are required"),
  feedback: z.string().nonempty("Feedback is required"),
  remarks: z.string().optional(),
});

export default eventFormSchema;
