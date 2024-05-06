import { Metadata } from 'next';
import Apply from '@/app/(dashboard)/loan/_components/apply';

export const metadata: Metadata = {
  title: 'Loan',
};

export default function Loan() {
  return <Apply />;
}
