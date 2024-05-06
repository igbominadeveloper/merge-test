import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import OtpInput from '@/shared/OtpInput';
import Button from '@/shared/Form/Button';
import LineItem from '@/app/(dashboard)/fund-account/_component/bank-transfer/line-item';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import SuccessModal from '@/shared/SuccessModal';
import { formatAmount } from '@/utils/helpers';
import { ROUTES } from '@/utils/routes';
import { PaymentMethodEnum } from '../types';

interface Props {
  amount: string;
  paymentMethod: PaymentMethodEnum | null;
}

function Wallet({ amount }: { amount: string }) {
  const [otp, setOtp] = useState('');
  const [isSuccessful, setIsSucessful] = useState(false);
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const submit = () => {
    setIsSucessful(true);
  };

  const close = () => {
    setOtp('');
    setIsSucessful(false);
    router.push(`${ROUTES.Loan}/${id}/details`);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-14">
        <h1 className="text-lg font-bold">Enter Transaction PIN to Confirm</h1>
        <OtpInput value={otp} onChange={setOtp} />
      </div>

      <Button
        disabled={otp.length !== 4}
        text={`Pay ${formatAmount(parseFloat(amount))}`}
        onClick={submit}
      />

      <SuccessModal
        onButtonClick={close}
        open={isSuccessful}
        heading="Successful"
        subHeading="You have successfully made your payment"
        buttonLabel="Done"
      />
    </>
  );
}

function Transfer() {
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  const accountDetails = {
    accountNumber: '0235460326',
    accountName: '020 Network Limited',
    bank: 'Katsu Microfinance Bank',
  };

  const bankDetails = [
    { title: 'Beneficiary', value: accountDetails.accountName },
    { title: 'Account number', value: accountDetails.accountNumber },
    { title: 'Bank name', value: accountDetails.bank },
  ];

  const copyAccountDetails = () => {
    const account = `
    Account Number: ${accountDetails.accountNumber}
    Account Name: ${accountDetails.accountName}
    Bank: ${accountDetails.bank}`;

    copyToClipboard(account);
  };
  return (
    <>
      <div className="flex flex-col gap-5">
        <p className="text-xl font-semibold">Transfer to the Sabi Katsu MFB account below:</p>
        <div className="flex flex-col space-y-3">
          {bankDetails.map(line => (
            <LineItem key={line.title} {...line} />
          ))}
        </div>
      </div>

      <Button
        text={isCopied ? 'Copied' : 'Copy details'}
        variant="light-primary"
        onClick={copyAccountDetails}
      />
    </>
  );
}

export default function PaymentDetails({ paymentMethod, amount }: Props) {
  if (!paymentMethod)
    return <Button disabled={!paymentMethod} text={`Pay ${formatAmount(parseFloat(amount))}`} />;

  if (paymentMethod === PaymentMethodEnum.Wallet) {
    return <Wallet amount={amount} />;
  }

  return <Transfer />;
}
