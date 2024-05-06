'use client';

import React, { ReactElement } from 'react';
import StarsIcon from '@mui/icons-material/Stars';
import { useLoanTransactions } from '@/services/queries/loan';
import { LoanStatusEnum } from '@/types/loan';

interface StatProps {
  title: string;
  value: string | null;
  icon: ReactElement<any, any>;
}
function Stat({ icon, title, value }: StatProps) {
  return (
    <div className="flex justify-between rounded-2xl bg-white p-6">
      <div className="flex flex-col justify-between">
        <h1 className="font-normal text-gray-500">{title}</h1>
        <p className="text-xl font-bold lg:text-3xl">{value ?? 0}</p>
      </div>
      {icon}
    </div>
  );
}

export default function InfoStats() {
  const { data } = useLoanTransactions(`loanByStatus=${LoanStatusEnum.Approved}`);
  // const upcomingPayments = 0;
  const activeLoans = data?.totalRecords || 0;

  const stats: StatProps[] = [
    {
      title: 'Active Loans',
      value: activeLoans?.toString() ?? '0',
      icon:
        activeLoans > 0 ? (
          <StarsIcon className="size-12 text-[#1877F2]" />
        ) : (
          <StarsIcon className="size-12 text-grey-900" />
        ),
    },
    // {
    //   title: 'Upcoming Payments',
    //   value: formatAmount(upcomingPayments),
    //   icon:
    //     upcomingPayments > 0 ? (
    //       <NotificationImportantIcon className="size-12 text-[#1877F2]" />
    //     ) : (
    //       <NotificationImportantIcon className="size-12 text-grey-900" />
    //     ),
    // },
  ];

  return (
    <div className="grid grid-flow-row grid-rows-[repeat(2,_124px)] gap-8 lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-[124px]">
      {stats.map(stat => (
        <Stat {...stat} key={stat.title} />
      ))}
    </div>
  );
}
