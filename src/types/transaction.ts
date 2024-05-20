import { StringNull } from '.';

export enum TransactionTypeEnum {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export type TransactionType = keyof typeof TransactionTypeEnum;

export enum TransactionCategoryEnum {
  SALES = 'SALES',
  'CASH-IN' = 'CASH-IN',
  'CASH-OUT' = 'CASH-OUT',
  'TOP-UP' = 'TOP-UP',
  'BILLS' = 'BILLS',
  'TRANSFER' = 'TRANSFER',
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  CHARGE = 'CHARGE',
  FUNDING = 'FUNDING',
  LOAN = 'LOAN',
}

export type TransactionCategory = keyof typeof TransactionCategoryEnum;

export enum TransactionStatusEnum {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export type TransactionStatus = keyof typeof TransactionStatusEnum;

export interface TransactionFilters {
  search?: string | null;
  transactionType?: TransactionType | null;
  transactionCategory?: TransactionCategory | null;
  startDate?: string | null;
  endDate?: string | null;
  page?: string | null;
  pageSize?: string | null;
}

export interface FilterProps {
  search: string | null;
  transactionCategory: TransactionCategory | null;
  transactionType: TransactionType | null;
  startDate: string | null;
  endDate: string | null;
  page: number | null;
  pageSize: number | null;
  setEndDate: (value: string | null) => void;
  setSearch: (value: string | null) => void;
  setStartDate: (value: string | null) => void;
  setTransactionType: (value: TransactionType | null) => void;
  setTransactionCategory: (value: TransactionCategory | null) => void;
}

export interface Beneficiary {
  uuId: string;
  firstName: string;
  lastName: string;
  userTag: StringNull;
  phoneNumber: StringNull;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountId: StringNull;
}

export interface Transaction {
  accountId: string;
  amount: number;
  category: TransactionCategory;
  createdDate: string;
  currency: string;
  customerId: string;
  id: string;
  narration: string;
  paymentCode: string;
  paymentId: string;
  paymentMethod: string;
  receiverDetail: {
    accountName: string;
    accountId: string;
    accountNumber: string;
    bankCode: string | null;
    bankName: string | null;
    type: string;
  };
  referenceAccountId: string;
  referenceId: string;
  requestId: string;
  senderDetail: {
    accountName: string;
    accountId: string;
    accountNumber: string;
    bankCode: string | null;
    bankName: string | null;
    type: string;
  };
  source: string;
  subSource: string;
  subSourceStatus: string;
  tenantId: string;
  terminalId: string;
  transactionId: string;
  transactionStatus: TransactionStatus;
  transactionType: TransactionType;
  updatedDate: string;
}

export interface RecentTransactions {
  results: Transaction[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  total: number;
}

export interface AllTransactions
  extends Pick<RecentTransactions, 'results' | 'total' | 'totalPages'> {
  currentPage: number;
  nextPage: number;
  perPageLimit: number;
  previousPage: number;
}

export interface SingleTransactions {
  data: [Transaction];
  status: boolean;
  message: string;
}
export interface Bank {
  name: string;
  code: string;
}

export interface Metrics {
  day: string;
  totalAmount: number;
  volume: string;
  id: string;
  type: TransactionType;
}

export interface MetricsResponse {
  data: Metrics[];
}
export interface USSD {
  BankName: string;
  BankCode: string;
  UssdString: string;
}
export interface FundWithUssd {
  bankCode: string;
  accountId: string;
  accountUserId: string;
  customer: {
    email: string;
    name: string;
    phoneNumber: string;
  };
  pinCode: string;
  transactionCategory: TransactionCategory;
  amount: number;
}

export interface TransferResponse {
  message: string;
  requestId: string;
}

export interface AccountStatementResponse extends Omit<AllTransactions, 'results'> {
  results: AccountStatementLineItem[];
}
export interface AccountStatementLineItem {
  accountId: string;
  amount: number;
  bankName: string;
  created: string;
  currency: string;
  description: string;
  externalReference: string;
  id: string;
  narration: string;
  newBalance: number;
  previousBalance: number;
  recipientAccount: string;
  reference: string;
  senderAccount: string;
  status: string;
  tenantId: string;
  type: string;
  userId: string;
}

export interface AccountStatementPayload {
  accountNumber: string;
  businessAddress: string;
  businessName: string;
  endDate: string;
  startDate: string;
}
