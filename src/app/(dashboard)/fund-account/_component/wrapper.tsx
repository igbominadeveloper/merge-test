'use client';

import { useState } from 'react';
import { ButtonSwitch } from '@/shared/ButtonSwitch';
import { useSearchParams } from 'next/navigation';
import { useBanksUSSD } from '@/services/queries/bank';
import BankTransfer from './bank-transfer';
import FundWithUssd from './fund-ussd';

type ActiveType = 'bank-transfer' | 'ussd';

const options: { label: string; value: ActiveType }[] = [
  { label: 'Fund with Bank Transfer', value: 'bank-transfer' },
  { label: 'Fund with USSD', value: 'ussd' },
];

function Wrapper() {
  const search = useSearchParams();
  const [activeType, setActiveType] = useState<ActiveType>(
    (search.get('tab') as ActiveType) || 'bank-transfer',
  );
  const { data: banks, isLoading: isBankLoading } = useBanksUSSD();

  const render: Record<ActiveType, React.ReactNode> = {
    'bank-transfer': <BankTransfer />,
    ussd: <FundWithUssd banks={banks} isBankLoading={isBankLoading} />,
  };

  return (
    <>
      <ButtonSwitch
        options={options}
        activeType={activeType}
        handleChange={value => setActiveType(value)}
        asQuery
        className="max-w-[500px]"
      />

      <div className="mt-6 rounded-2xl bg-white p-5 sm:p-10">{render[activeType]}</div>
    </>
  );
}
export default Wrapper;
