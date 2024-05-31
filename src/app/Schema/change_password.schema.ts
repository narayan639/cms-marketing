import { z } from "zod";

export const changepasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: 'Old password is required.' })
      .trim(),
    new_password: z
      .string()
      .trim()
      .min(1, { message: 'New password is required.' })
      .min(8, { message: 'New password should be at least 8 characters long.' })
      .regex(/[a-z]/, { message: 'New password should contain at least one lowercase letter.' })
      .regex(/[A-Z]/, { message: 'New password should contain at least one uppercase letter.' })
      .regex(/\d/, { message: 'New password should contain at least one number.' })
      .regex(/[\W_]/, { message: 'New password should contain at least one special character.' }),
    confirm_password: z.string().trim(),
  })
  .refine(
    ({ confirm_password, new_password }) => confirm_password === new_password,
    {
      message: 'Confirm password must match new password.',
      path: ['confirm_password'],
    }
  );

export type changepassword_SchemaType = z.infer<typeof changepasswordSchema>;
