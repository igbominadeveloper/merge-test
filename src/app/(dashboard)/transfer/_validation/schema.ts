import { ZodSchema, z } from 'zod';
import { amountSchema } from '@/utils/amountSchema';

export const KatsuTransferSchema = z.object({
  bankNameKatsu: z.string().min(1, { message: 'Please choose a bank' }),
  accountName: z.string().min(1, { message: 'Account name is required' }),
  amount: amountSchema,
  accountNumber: z
    .string()
    .min(10, { message: 'Enter a valid account number' })
    .max(13, { message: 'Enter a valid account number' }),
  narration: z.string().optional(),
  bank: z.string().optional(),
});

export type KatsuTransferType = z.infer<typeof KatsuTransferSchema>;

export const OthersTransferSchema: ZodSchema<{
  accountName: string;
  bankName: string;
  accountNumber: string;
  narration?: string;
  amount: string;
}> = z.object({
  accountName: z.string(),
  bankName: z.string().min(3, { message: 'Please choose a bank' }),
  narration: z.string(),
  amount: amountSchema,
  accountNumber: z
    .string()
    .length(10, { message: 'Account number must be exactly 10 characters long' }),
});

export type OthersTransferType = z.infer<typeof OthersTransferSchema>;
