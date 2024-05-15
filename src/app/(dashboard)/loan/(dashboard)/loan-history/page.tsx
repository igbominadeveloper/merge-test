import { Metadata } from 'next';
import Transactions from './_components/transactions';

export const metadata: Metadata = {
  title: 'Loan History ',
};

export default function ActiveLoans() {
  return <Transactions />;
}
