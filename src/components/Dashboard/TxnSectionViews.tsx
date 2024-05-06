'use client';

import { useState } from 'react';
import useIsMobile from '@/hooks/useIsMobile';
import { ButtonSwitch } from '@/shared/ButtonSwitch';

import Chart from './chart';
import RecentTransaction from './recent-transaction';

type TrxType = 'trend' | 'recent';

const options: { label: string; value: TrxType }[] = [
  { label: 'Recent Transactions', value: 'recent' },
  { label: 'Transaction Trend', value: 'trend' },
];

function TransactionOverview() {
  const [activeTxnType, setActiveTxnType] = useState<TrxType>('trend');
  const { isMobile } = useIsMobile(768);

  const renderMobile: Record<TrxType, React.ReactNode> = {
    trend: <Chart className="min-h-[450px]" />,
    recent: <RecentTransaction className="min-h-[450px]" />,
  };

  return isMobile ? (
    <div className="">
      <ButtonSwitch
        options={options}
        activeType={activeTxnType}
        handleChange={value => setActiveTxnType(value)}
        className="mb-3 w-full grid-cols-2"
      />

      <div className="h-full max-h-[450px] w-full">{renderMobile[activeTxnType]}</div>
    </div>
  ) : (
    <div className="grid max-h-[406px] min-h-[406px] w-full grid-cols-7 gap-6">
      <Chart />
      <RecentTransaction />
    </div>
  );
}

export default TransactionOverview;
