import { z, ZodSchema } from 'zod';
/* eslint-disable no-useless-escape */

export const ResetPasswordSchema: ZodSchema<{
  password: string;
  confirmPassword: string;
}> = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be more than 8 characters.' })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:<,>.?\\[\]\/]).*$/,
        'Please enter the correct password format',
      ),
    confirmPassword: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters'),
  })
  .refine(
    values => {
      return values.password === values.confirmPassword;
    },
    {
      message: 'Passwords must match!',
      path: ['confirmPassword'],
    },
  );
export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;
