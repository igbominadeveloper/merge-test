import validateZodFile from '@/utils/validateZodFile';
import { z } from 'zod';

const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf',
];

export const BusinessRegistrationSchema = z.object({
  registrationNumber: z.string({ required_error: 'Registration Number is required' }),
  registrationDate: z.date({ required_error: 'Registration Date is required' }).refine(value => {
    const inputDate = new Date(value);
    const currentDate = new Date();
    return inputDate <= currentDate;
  }, 'Date must be less than or equal to the current date'),
  tin: z.string({ required_error: 'TIN is required' }).min(5, 'TIN must be at least 5 characters'),

  cacDocument: validateZodFile({
    requiredMessage: 'Please upload a copy of your CAC Document',
    acceptedFileTypes: ACCEPTED_FILE_TYPES,
  }),
});

export type BusinessRegistrationType = z.infer<typeof BusinessRegistrationSchema>;
