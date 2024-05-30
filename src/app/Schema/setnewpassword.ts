import { z } from "zod";



export const setnewpasswordSchema =z
.object({
  new_password: z
    .string()
    .trim()
    .min(1, { message: 'New password is required.' })
    .min(8, {
      message: 'New password should be at least 8 characters long.',
    }),
  confirm_password: z.string().trim(),
})
.refine(
  ({ confirm_password, new_password }) => {
    return confirm_password === new_password
  },
  {
    message: 'Confirm password must match new password.',
    path: ['confirm_password'],
  },
)

export type setnewpassword_SchemaType = z.infer<typeof setnewpasswordSchema>;
