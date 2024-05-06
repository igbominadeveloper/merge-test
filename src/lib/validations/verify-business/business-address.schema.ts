import { z } from 'zod';

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf',
];
const acceptedExtensions = ACCEPTED_FILE_TYPES.map(fileType => `.${fileType.split('/')[1]}`).join(
  ', ',
);

export const BusinessAddressSchema = z.object({
  address: z
    .string({ required_error: 'address is required' })
    .min(5, 'address must be at least 5 characters'),
  addressDocument: z
    .custom<File>()
    .refine(file => file instanceof File, {
      message: 'Please upload a utility bill with your business address',
    })
    .refine(file => file && file.size <= MAX_FILE_SIZE, {
      message: `Max file size is ${MAX_FILE_SIZE / 1000000}MB.`,
    })
    .refine(file => !file || ACCEPTED_FILE_TYPES.includes(file.type), {
      message: `Only ${acceptedExtensions} formats are supported.`,
    }),
});

export type BusinessAddressType = z.infer<typeof BusinessAddressSchema>;
