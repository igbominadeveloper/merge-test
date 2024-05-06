'use client';

import { useState } from 'react';
import { ButtonSwitch } from '@/shared/ButtonSwitch';
import { useSearchParams } from 'next/navigation';
import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import BankAd from '@/assets/bank-ad.jpeg';
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

function TransferWrapper() {
  const search = useSearchParams();
  const [activeType, setActiveType] = useState<ActiveType>(
    (search.get('tab') as ActiveType) || 'katsu',
  );
  prefetchKatsuBeneficiaries();
  prefetchBankBeneficiaries();
  const { data: accountBalance } = useAccountBalance();

  const render: Record<ActiveType, React.ReactNode> = {
    katsu: <ToKatsu />,
    others: <ToBank />,
  };

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
              <Typography className="text-base text-secondary-400" component="h1">
                Available balance:
              </Typography>
              <Typography
                component="p"
                className="rounded-md bg-grey-400 px-[5px] py-1 font-bold text-gray-800"
              >
                {formatAmount(accountBalance?.availableBalance)}
              </Typography>
            </Stack>
          </Stack>

          {render[activeType]}
        </div>

        <Image
          className=" hidden w-1/2 rounded-xl md:block lg:w-[40%] xl:w-[44%] "
          width={413}
          height={600}
          src={BankAd}
          alt="ad image"
        />
      </div>
    </>
  );
}
export default TransferWrapper;
