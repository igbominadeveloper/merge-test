import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { loanTypeParam, loanTypes } from '@/app/(dashboard)/loan/_utils';
import Commodity from '../_components/commodity-financing';
import InventoryFinancing from '../_components/invetory-financing';
import WorkingCapital from '../_components/working-capital';
import InvoiceDiscounting from '../_components/invoice-discounting';

type Props = {
  params: { id: string };
};

const findLoanType = (id: string) => loanTypes.find(item => loanTypeParam(item.title) === id);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  const loanType = findLoanType(id);

  return {
    title: `${loanType?.title || ''} | Loan Application`,
    description: loanType?.description || '',
  };
}

function Page({ params }: { params: { id: string } }) {
  const loanType = findLoanType(params.id);

  if (!loanType) {
    notFound();
  }

  const renderPages = {
    'commodity-financing': <Commodity />,
    'inventory-financing': <InventoryFinancing />,
    'working-capital': <WorkingCapital />,
    'invoice-discounting': <InvoiceDiscounting />,
  };

  return (
    <div className="mt-5">
      <h3 className="text-[32px] font-bold">{loanType?.title}</h3>

      <div className="mt-5 rounded-2xl bg-white p-8">
        {renderPages[params.id as keyof typeof renderPages]}
      </div>
    </div>
  );
}

export default Page;
