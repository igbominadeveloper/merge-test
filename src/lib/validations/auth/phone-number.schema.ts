import { z } from 'zod';

export const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

export const PhoneNumberSchema = z.object({
  phone: z
    .string({ required_error: 'Phone number is required' })
    .regex(phoneRegex, 'Invalid Number'),
});

export type PhoneNumberSchemaType = z.infer<typeof PhoneNumberSchema>;
