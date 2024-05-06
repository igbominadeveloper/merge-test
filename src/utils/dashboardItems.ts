import CreditIcon from '@/assets/icons/fund-account.svg';
import LoanIcon from '@/assets/icons/loans.svg';
import TransferIcon from '@/assets/icons/transfer.svg';
import {
  TransactionCategory,
  TransactionCategoryEnum,
  TransactionType,
  TransactionTypeEnum,
} from '@/types/transaction';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { ROUTES } from './routes';

type Options = TransactionCategory | TransactionType | TransactionCategory;
type TransactionIconType = {
  [K in Options]: StaticImport;
};

export const TRANSACTION_ICONS: TransactionIconType = {
  DEBIT: TransferIcon,
  CREDIT: CreditIcon,
  // airtime: TransferIcon,
  // transfer: TransferIcon,
  'CASH-IN': CreditIcon,
  'CASH-OUT': TransferIcon,
  SALES: CreditIcon,
  BILLS: TransferIcon,
  'TOP-UP': CreditIcon,
  TRANSFER: TransferIcon,
  DEPOSIT: CreditIcon,
  WITHDRAW: TransferIcon,
  CHARGE: TransferIcon,
  FUNDING: CreditIcon,
  LOAN: LoanIcon,
};

export const transactionListItems: {
  id: string;
  name: string;
  type: TransactionCategory;
  amount: number;
  date: string;
}[] = [];

export const loadingChartData = [
  {
    day: 'Monday',
    amount: 0,
  },
  {
    day: 'Tuesday',
    amount: 0,
  },
  {
    day: 'Wednesday',
    amount: 0,
  },
  {
    day: 'Thursday',
    amount: 0,
  },
  {
    day: 'Friday',
    amount: 0,
  },
  {
    day: 'Saturday',
    amount: 0,
  },
  {
    day: 'Sunday',
    amount: 0,
  },
];

export const quickActionsItems: {
  name: string;
  type: Options;
  href: string;
  opensInNewTab: boolean;
}[] = [
  {
    name: 'Fund Account',
    type: TransactionTypeEnum.CREDIT,
    href: ROUTES.FundAccount,
    opensInNewTab: false,
  },
  {
    name: 'Transfer',
    type: TransactionTypeEnum.DEBIT,
    href: ROUTES.Transfer,
    opensInNewTab: false,
  },
  {
    name: 'Loan',
    href: ROUTES.Loan,
    type: TransactionCategoryEnum.LOAN,
    opensInNewTab: false,
  },
];
