import { Metadata } from 'next';
import Transactions from './_components/transactions';

export const metadata: Metadata = {
  title: 'Active Loans',
};

export default function ActiveLoans() {
  return <Transactions />;
}
