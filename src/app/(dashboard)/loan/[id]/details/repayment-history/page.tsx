import { Metadata } from 'next';
import PageTitle from '@/components/Dashboard/PageTitle';
import LineItems from './_components/line-items';
import Wrapper from '../../_components/details-wrapper';

export const metadata: Metadata = {
  title: 'Loan Repayment History',
};

export default function Page() {
  return (
    <Wrapper>
      <div className="divide-y divide-gray-200 rounded-xl bg-white">
        <div className="p-6">
          <PageTitle title="History" className="md:text-xl" />
        </div>
        <section className="flex flex-col p-6 py-4">
          <LineItems />
        </section>
      </div>
    </Wrapper>
  );
}
