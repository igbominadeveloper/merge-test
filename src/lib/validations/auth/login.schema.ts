import { ZodSchema, z } from 'zod';

export const LoginSchema: ZodSchema<{
  username: string;
  password: string;
}> = z.object({
  username: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid Email Address' }),
  password: z.string({ required_error: 'Password is required' }).min(3),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
