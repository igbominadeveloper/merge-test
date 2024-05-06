'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import katsuAd from '@/assets/katsu-ad.png';
import { redirect, useParams } from 'next/navigation';
import useLoanTransactions from '@/hooks/useLoanTransctions';
import { ROUTES } from '@/utils/routes';
import AmountConfiguration from './amount';
import PaymentMethodSelection from './payment-method';

enum Step {
  Amount = 'Amount',
  Payment = 'Payment',
}
export default function PayOff() {
  const { id } = useParams<{ id: string }>();
  const { getTransactionByID } = useLoanTransactions();
  const loan = getTransactionByID(id)!;

  const [step, setStep] = useState<Step>(Step.Amount);
  const [amount, setAmount] = useState<string | null>(null);
  const headerText =
    step === Step.Amount ? 'How much would you like to pay-off?' : 'Choose a payment method';

  useEffect(() => {
    if (!loan) {
      return redirect(ROUTES.Loan);
    }
  }, [loan]);

  const today = new Date();
  const newDate = new Date(today);
  newDate.setDate(newDate.getDate() + Number(loan?.paymentTenorInDays ?? 0));
  const formattedDate = newDate.toLocaleDateString();

  const render: Record<Step, React.ReactNode> = {
    [Step.Amount]: (
      <AmountConfiguration
        loanAmount={loan?.loanAmount ?? 0}
        dueDate={formattedDate ?? ''}
        onChange={(value: string) => {
          setAmount(value);
          setStep(Step.Payment);
        }}
      />
    ),
    [Step.Payment]: <PaymentMethodSelection amount={amount ?? ''} />,
  };

  return (
    <div className="grid min-h-[740px] max-w-5xl grid-cols-[524px_1fr] gap-8 rounded-xl bg-white p-9 pt-10">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-grey-800">{headerText}</h1>
        <div className="flex h-full flex-col justify-between">{render[step]}</div>
      </div>

      <div className="max-h-[609px] max-w-[413px] self-end">
        <Image src={katsuAd} alt="Katsu Ad" className="h-full w-full" />
      </div>
    </div>
  );
}
