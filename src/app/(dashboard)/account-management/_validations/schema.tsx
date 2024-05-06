import { z, ZodSchema } from 'zod';

export const AddBeneficiarySchema: ZodSchema<{
  accountName: string;
  bankName: string;
  accountNumber: string;
}> = z.object({
  accountName: z.string(),
  bankName: z.string(),
  accountNumber: z
    .string()
    .length(10, { message: 'Account number must be exactly 10 characters long' }),
});

export type AddBeneficiaryType = z.infer<typeof AddBeneficiarySchema>;

export const ChangePasswordSchema: ZodSchema<{
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}> = z
  .object({
    oldPassword: z.string({ required_error: 'Old password is required' }),
    newPassword: z
      .string({ required_error: 'New Password is required' })
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z
      .string({ required_error: 'Confirm Password is required' })
      .min(8, 'Password must be at least 8 characters'),
  })
  .refine(
    values => {
      return values.newPassword === values.confirmPassword;
    },
    {
      message: 'Passwords must match!',
      path: ['confirmPassword'],
    },
  );

export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;

export const ChangePinSchema: ZodSchema<{
  newPin: string;
  confirmPin: string;
  currentPassword: string;
}> = z
  .object({
    currentPassword: z
      .string({ required_error: 'Please enter your current password' })
      .min(1, { message: 'Please enter your password' }),
    newPin: z
      .string()
      .refine(value => /^\d+$/.test(value), {
        message: 'Input must contain only numbers',
      })
      .refine(value => value.length === 6, {
        message: 'New PIN must be 6 characters long',
      }),
    confirmPin: z.string({ required_error: 'Enter Confirm Pin' }),
  })

  .refine(data => Number(data.newPin) === Number(data.confirmPin), {
    message: 'New PIN and confirm PIN must match',
    path: ['confirmPin'],
  });

export type ChangePinSchemaType = z.infer<typeof ChangePinSchema>;

export const ProfileDetailSchema: ZodSchema<{
  firstName: string;
  lastName: string;
  bvn: string;
  dob: Date;
  gender: string;
}> = z.object({
  firstName: z.string({ required_error: 'Please enter first name' }),
  lastName: z.string({ required_error: 'Please enter last name' }),
  bvn: z.string().max(11, { message: 'Please enter a valid bvn' }),
  dob: z.date({
    required_error: 'Please pick date of birth',
    invalid_type_error: 'Please pick date of birth',
  }),
  gender: z.string({
    required_error: 'Please select a gender',
  }),
});

export type ProfileDetailSchemaType = z.infer<typeof ProfileDetailSchema>;

export const BusinessDetailSchema = z.object({
  businessName: z.string(),
  businessType: z.string(),
  businessAddress: z.string(),
  regDate: z.date(),
  regNumber: z.string(),
});

export type BusinessDetailSchemaType = z.infer<typeof BusinessDetailSchema>;
