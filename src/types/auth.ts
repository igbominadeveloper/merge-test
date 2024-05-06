import { BusinessCategory, BusinessType } from './user';

interface BusinessRequestDto {
  name: string;
  email: string;
  phone: string;
  industry: BusinessType;
  businessAddress: string;
  category: BusinessCategory; // Assuming these are the only two options
}

export interface SignupDto {
  firstName: string;
  lastName: string;
  address: string;
  gender: string;
  password: string;
  phone: string;
  dob: string;
  state: {
    name: string;
    code: string;
  };
  country: {
    code: string;
    name: string;
    currency: string;
  };
  username: string;
  city: {
    name: string;
    code: string;
  };
  businessRequestDto: BusinessRequestDto;
}

export enum SignupAgreement {
  'TERMS_OF_SERVICE' = 'TERMS_OF_SERVICE',
  'PRIVACY_POLICY' = 'PRIVACY_POLICY',
}

export type SignupAgreementID = keyof typeof SignupAgreement;

export interface SignupAgreementSection {
  id: SignupAgreementID;
  title: string;
  summary: string;
  headings: {
    label: string;
    link: string;
  }[];
}
