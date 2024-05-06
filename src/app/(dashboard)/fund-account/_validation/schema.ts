import { amountSchema } from '@/utils/amountSchema';
import { ZodSchema, z } from 'zod';

export const FundWithUSSDSchema: ZodSchema<{
  bankCode: string;
  amount: string;
  pinCode: string;
}> = z.object({
  bankCode: z.string({ required_error: 'Please select a bank' }),
  pinCode: z
    .string({ required_error: 'Please enter your pin' })
    .min(6, 'Pin must not be less than 6 digits')
    .max(6, 'Pin must not be more than 6 digits'),
  amount: amountSchema,
});

export type FundWithUSSDSchemaType = z.infer<typeof FundWithUSSDSchema>;
