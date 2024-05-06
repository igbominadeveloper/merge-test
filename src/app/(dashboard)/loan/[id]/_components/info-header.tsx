'use client';

import { useLoanTransaction } from '@/services/queries/loan';
import { formatAmount } from '@/utils/helpers';
import { useParams } from 'next/navigation';

export default function InfoHeader() {
  const { id } = useParams<{ id: string }>();
  const { data } = useLoanTransaction(id);

  const infoItems = [
    {
      title: 'Loan Amount',
      value: data?.loanAmount ? formatAmount(data?.loanAmount) : 0,
    },
    {
      title: 'Duration',
      value: `${data?.paymentTenorInDays ?? 0} Days`,
    },
  ];

  return (
    <div className="flex h-[138px] justify-between divide-x divide-white/20 rounded-xl bg-primary-main p-6 font-primary text-white">
      {infoItems.map(infoItem => (
        <div className="flex flex-1 flex-col gap-2 pl-10 first-of-type:pl-0" key={infoItem.title}>
          <h3>{infoItem.title}</h3>
          <p className="text-[32px] font-bold">{infoItem.value}</p>
        </div>
      ))}
    </div>
  );
}
