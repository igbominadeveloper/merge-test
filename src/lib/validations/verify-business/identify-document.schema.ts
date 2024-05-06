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

export const IdentifyDocumentSchema = z.object({
  governmentId: z.string({ required_error: 'ID is required' }),
  file: z
    .custom<File>()
    .refine(file => file instanceof File, {
      message: 'Please upload a copy of your Identity Document',
    })
    .refine(file => file && file.size <= MAX_FILE_SIZE, {
      message: `Max file size is ${MAX_FILE_SIZE / 1000000}MB.`,
    })
    .refine(file => !file || ACCEPTED_FILE_TYPES.includes(file.type), {
      message: `Only ${acceptedExtensions} formats are supported.`,
    }),
});

export type IdentifyDocumentType = z.infer<typeof IdentifyDocumentSchema>;
