'use client';

import { useEffect, useState } from 'react';
import { ButtonSwitch } from '@/shared/ButtonSwitch';
import { useSearchParams } from 'next/navigation';
import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import BankAd from '@/assets/bank-ad.png';
import {
  prefetchBankBeneficiaries,
  prefetchKatsuBeneficiaries,
  useAccountBalance,
} from '@/services/queries/wallet';
import { formatAmount } from '@/utils/helpers';
import ToBank from './to-banks';
import ToKatsu from './to-katsu';
import { TransferType } from './types';

type ActiveType = TransferType;

const options: { label: string; value: ActiveType }[] = [
  { label: 'Transfer to Katsu', value: 'katsu' },
  { label: 'Transfer to Other Banks', value: 'others' },
];
const brandTexts = ['Seamless', 'Secure'];

function TransferWrapper() {
  const search = useSearchParams();
  const [activeType, setActiveType] = useState<ActiveType>(
    (search.get('tab') as ActiveType) || 'katsu',
  );
  const [brandTextIndex, setBrandTextIndex] = useState(0);

  prefetchKatsuBeneficiaries();
  prefetchBankBeneficiaries();
  const { data: accountBalance } = useAccountBalance();

  const render: Record<ActiveType, React.ReactNode> = {
    katsu: <ToKatsu />,
    others: <ToBank />,
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setBrandTextIndex(prevIndex => (prevIndex === 0 ? 1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ButtonSwitch
        options={options}
        activeType={activeType}
        handleChange={value => setActiveType(value)}
        asQuery
        className="max-w-[500px] grid-cols-2"
      />

      <div className="mt-6 flex items-start justify-between gap-x-8 rounded-2xl bg-white p-5 sm:p-10">
        <div className="w-full flex-1 md:max-w-[500px]">
          <Stack direction="column" gap="20px" className="mb-8">
            <h4 className="text-[20px] font-semibold text-grey-800 md:text-2xl">
              Transfer to {activeType === 'katsu' ? 'Katsu' : 'Other Banks'}
            </h4>

            <Stack direction="row" alignItems="center" gap="10px">
              <Typography className="font-primary text-base text-secondary-400" component="h1">
                Available balance:
              </Typography>
              <Typography
                component="p"
                className="bg-success-100 rounded-md px-[5px] py-1 font-primary font-bold text-gray-800"
              >
                {formatAmount(accountBalance?.availableBalance)}
              </Typography>
            </Stack>
          </Stack>

          {render[activeType]}
        </div>

        <div className="borded hidden w-1/2 justify-between rounded-2xl border-red-500 bg-grey-400 p-8 md:flex md:flex-col md:self-stretch lg:w-[40%] xl:w-[44%]">
          <Stack direction="column">
            <Typography className="text-xs font-bold tracking-[3px] text-grey-700">
              ENJOY
            </Typography>
            <Typography
              className="animate-slide-up text-2xl font-bold text-primary-main"
              key={brandTextIndex}
            >
              {brandTexts[brandTextIndex]}
            </Typography>
            <Typography className="text-2xl font-bold">Transactions with Katsu</Typography>
          </Stack>
          <div className="self-stretch overflow-hidden rounded-xl">
            <Image className="min-h-[520px] object-cover" src={BankAd} alt="ad image" />
          </div>
        </div>
      </div>
    </>
  );
}
export default TransferWrapper;
