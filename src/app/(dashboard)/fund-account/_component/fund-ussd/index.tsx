'use client';

import { useState } from 'react';
import { UssdData } from '@/app/(dashboard)/fund-account/_component/types';
import { USSD } from '@/types/transaction';
import USSDCode from './ussd-code';
import UssdIndex from './ussd-index';

enum Stages {
  'USSD_INDEX',
  'USSD_CODE',
}

type StagesType = keyof typeof Stages;

function FundWithUssd({
  banks,
  isBankLoading,
}: {
  isBankLoading: boolean;
  banks: USSD[] | undefined;
}) {
  const [currentStage, setCurrentStage] = useState<StagesType>('USSD_INDEX');
  const [ussdData, setUssdData] = useState({ ussdString: '', bankName: '', amount: '' });

  const handleUssdData = (data: UssdData) => {
    setUssdData(data);
  };

  const render: Record<StagesType, React.ReactNode> = {
    USSD_CODE: <USSDCode ussdData={ussdData} onBack={() => setCurrentStage('USSD_INDEX')} />,
    USSD_INDEX: (
      <UssdIndex
        banks={banks}
        isBankLoading={isBankLoading}
        handleUssdData={handleUssdData}
        onNext={() => setCurrentStage('USSD_CODE')}
      />
    ),
  };

  return <div className="w-full max-w-[553px]">{render[currentStage]}</div>;
}

export default FundWithUssd;
