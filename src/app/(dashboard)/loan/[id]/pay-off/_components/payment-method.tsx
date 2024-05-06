'use client';

import { useState } from 'react';
import { formatAmount } from '@/utils/helpers';
import SelectOption from './select-option';
import { PaymentMethodEnum } from '../types';
import PaymentDetails from './payment-details';

interface Props {
  accountBalance?: number;
  amount: string;
}

export default function PaymentMethod({ accountBalance = 1000, amount }: Props) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodEnum | null>(null);
  const isWallet = paymentMethod === PaymentMethodEnum.Wallet;
  const isTransfer = paymentMethod === PaymentMethodEnum.Transfer;

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-7">
        <SelectOption
          checked={isWallet}
          name="payment-method"
          onChange={() => setPaymentMethod(PaymentMethodEnum.Wallet)}
        >
          <div className="flex flex-col gap-0.5">
            <h1 className={`font-bold ${isWallet && 'text-primary-main'}`}>
              Katsu Account Balance
            </h1>
            <p className={`${isWallet ? 'text-primary-main' : 'text-grey-900'} text-sm`}>
              Balance: {formatAmount(accountBalance)}{' '}
            </p>
          </div>
        </SelectOption>

        <SelectOption
          checked={isTransfer}
          name="payment-method"
          onChange={() => setPaymentMethod(PaymentMethodEnum.Transfer)}
        >
          <p className={`font-bold ${isTransfer && 'text-primary-main'}`}>Bank Transfer</p>
        </SelectOption>
      </div>

      <div className="h-[1px] w-full bg-gray-200" />

      <PaymentDetails paymentMethod={paymentMethod} amount={amount} />
    </div>
  );
}
