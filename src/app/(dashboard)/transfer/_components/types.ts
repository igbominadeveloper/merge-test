import { Banks } from '@/components/TransferPage/Banks';

export type BankTypes = (typeof Banks)[number];

export interface Beneficiary {
  accountNumber: string;
  accountName: string;
  bank: BankTypes;
}

export interface BeneficiariesOthers {
  [key: string]: Beneficiary;
}

export type TransferType = 'katsu' | 'others';
