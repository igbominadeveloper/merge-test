import { z } from 'zod';
import { isDesiredAge } from '@/utils/general';

export const VerifyBvnSchema = z.object({
  bvn: z
    .string({ required_error: 'Please provide your BVN' })
    .min(11, 'BNN should be at least 11 characters'),
});

export const VerifyNinSchema = z.object({
  nin: z
    .string({ required_error: 'Please provide your NIN' })
    .min(11, 'NIN should be at least 11 characters'),
  dob: z
    .date({
      required_error: 'Please pick date of birth',
      invalid_type_error: 'Please pick date of birth',
    })
    .refine(value => isDesiredAge(value), {
      message: 'You must be at least 18 years old.',
    }),
});

export type VerifyBvnType = z.infer<typeof VerifyBvnSchema>;
export type VerifyNinType = z.infer<typeof VerifyNinSchema>;
