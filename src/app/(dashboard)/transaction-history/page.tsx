import { Metadata } from 'next';
import TransactionHistory from './_components';

export const metadata: Metadata = {
  title: 'Transaction History',
};

export default function Page() {
  return <TransactionHistory />;
}
