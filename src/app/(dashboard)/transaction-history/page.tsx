import { Metadata } from 'next';

import TransactionHistory from '@/components/Dashboard/transaction-history';

export const metadata: Metadata = {
  title: 'Transaction History',
};

export default function Page() {
  return <TransactionHistory />;
}
