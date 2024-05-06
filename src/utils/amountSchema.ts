import { z } from 'zod';
import { convertToNumber } from './general';
import { formatAmount } from './helpers';

export const amountSchema = z
  .string()
  .transform(value => convertToNumber(value).toString())
  .refine(value => Number(value) >= 100, {
    message: `The minimum amount is ${formatAmount(100)}`,
  });
