import { BusinessType, BusinessTypeEnum } from '@/types/user';
import { isDesiredAge } from '@/utils/general';
import { ZodSchema, z } from 'zod';
/* eslint-disable no-useless-escape */

const validateString = (name: string) =>
  z
    .string({ required_error: `Please enter ${name}` })
    .trim()
    .min(1, { message: `${name} is required` })
    .refine(
      value => {
        const trimmedValue = value.trim();
        const withoutExtraSpaces = trimmedValue.replace(/\s+/g, ' ');
        return withoutExtraSpaces === value;
      },
      {
        message: `${name} has extra spaces`,
      },
    );

export const BusinessDetailSchema: ZodSchema<{
  businessName: string;
  businessType: BusinessType;
  businessAdress: string;
}> = z.object({
  businessName: validateString('Business Name').refine(value => value.length <= 60, {
    message: 'Business Name must not be more than 60 characters',
  }),
  businessType: BusinessTypeEnum,
  businessAdress: validateString('Business Address').refine(value => value.length <= 100, {
    message: 'Business Nddress must not be more than 100 characters',
  }),
});

export type BusinessDetailsType = z.infer<typeof BusinessDetailSchema>;

export const BusinessRepSchema: ZodSchema<{
  firstname: string;
  lastname: string;
  address: string;
  dob: Date;
  username: string;
  gender: string;
  state: string;
  lga: string;
  phone: string;
  password: string;
}> = z.object({
  firstname: validateString('First name').refine(value => value.length < 30, {
    message: 'First name must be less than 30 characters',
  }),
  lastname: validateString('last name').refine(value => value.length < 30, {
    message: 'Last name must be less than 30 characters',
  }),
  address: validateString('address').refine(value => value.length < 100, {
    message: 'Address must be less than 100 characters',
  }),
  dob: z
    .date({
      required_error: 'Please pick date of birth',
      invalid_type_error: 'Please pick date of birth',
    })
    .refine(value => isDesiredAge(value), {
      message: 'You must be at least 18 years old.',
    }),
  username: z.string().min(1, { message: 'Email is required' }).email('Email is invalid'),
  gender: z.string().min(1, { message: 'Please select gender' }),
  state: z.string().min(1, { message: 'Please select a state' }),
  lga: z.string().min(1, { message: 'Please select a local government' }),
  phone: z.string().min(11, 'Phone number is invalid').max(11, 'Phone number is invalid'),
  password: z
    .string()
    .min(8, { message: 'Password must be more than 8 characters' })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:<,>.?\\[\]\/]).*$/,
      'Please enter the correct password format',
    ),
});

export type BusinessRepType = z.infer<typeof BusinessRepSchema>;
