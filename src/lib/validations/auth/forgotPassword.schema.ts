import { z } from 'zod';
import { emailRegex } from '@/utils/general';

export const ForgotPasswordSchema = z.object({
  email: z.string().regex(emailRegex).email({ message: 'Invalid email address' }),
});

export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;
