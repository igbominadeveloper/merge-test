export type AddBeneficiaryDTO = {
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  bankName: string | null;
  bankCode: string | null;
  accountNumber: string | null;
  userId?: string;
  uuId?: string;
  deleted: boolean;
  accountId?: string | null;
};

export type TransferToKatsu = {
  amount: string | number;
  accountName?: string;
  bankName?: string;
  accountNumber?: string;
  narration?: string;
  recipientAccountId: string;
  bankCode?: string;
  category: string;
  pinCode: string | number;
};
export type TransferToOtherBank = {
  amount: string | number;
  accountName?: string;
  bankName?: string;
  accountNumber?: string;
  bank?: OtherBankTypes;
  narration?: string;
  bankCode?: string;
  category: string;
  pinCode: string | number;
};
type OtherBankTypes = {
  bankCode: string;
  accountNumber: string;
  bankName: string;
};
