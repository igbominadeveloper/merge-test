'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import BackText from '@/shared/BackText';
import { ListItem } from '@/shared/ListItem';
import { formatAmount } from '@/utils/helpers';
import { TransferType } from '@/app/(dashboard)/transfer/_components/types';
import OtpInput, { baseTextFieldProps } from '@/shared/Form/FormSubcomponent/OtpInput';
import Button from '@/shared/Form/Button';
import { ROUTES } from '@/utils/routes';
import useTrxFns from '@/hooks/useTrxFns';
import TransferSuccesModal from './success-modal';

type Data = {
  amount: number | string;
  accountName?: string;
  bankName?: string;
  accountNumber?: string;
  narration?: string;
  recipientAccountId: string;
  bankCode?: string;
  category: string;
};

interface IProps {
  accountName?: string;
  data: Data;
  transferType: TransferType;
  onBack: () => void;
}

export function ConfirmTransfer({ accountName, data, transferType, onBack }: IProps) {
  const [otp, setOtp] = useState('');
  const [successModal, setSuccessModal] = useState(false);
  const { transferToKatsu, transferToOtherBank, loading } = useTrxFns();
  const router = useRouter();
  const [transactionID, setTransactionID] = useState('');
  const queryClient = useQueryClient();

  const onTransferCompleted = () => {
    queryClient.invalidateQueries({ queryKey: ['userAccountBalance'] });
    queryClient.invalidateQueries({ queryKey: ['recent-transactions'] });
    queryClient.invalidateQueries({ queryKey: ['transactions'] });
    queryClient.invalidateQueries({ queryKey: ['transactionMetrics'] });
  };

  const viewTransactionDetails = async () => {
    onTransferCompleted();
    router.push(`${ROUTES.Transactions}?transactionID=${transactionID}`);
  };

  const onVerify = async () => {
    if (transferType === 'katsu') {
      const response = await transferToKatsu({
        ...data,
        pinCode: otp,
      });

      if (response) {
        setSuccessModal(true);
        setTransactionID(response?.requestId ?? '');
        onTransferCompleted();
      }
      return;
    }

    if (transferType === 'others') {
      const response = await transferToOtherBank({
        amount: data.amount,
        bank: {
          bankCode: data.bankCode as string,
          accountNumber: data.accountNumber as string,
          bankName: data.bankName as string,
        },
        category: data.category,
        pinCode: otp,
      });

      if (response) {
        setSuccessModal(true);
        setTransactionID(response?.requestId ?? '');
        onTransferCompleted();
      }
    }
  };

  const listItemData = [
    {
      key: 'Amount',
      value: `${formatAmount(Number(data.amount))}`,
    },
    {
      key: transferType === 'katsu' ? 'Recipient name' : 'Recipient number',
      value: transferType === 'katsu' ? accountName || '' : data.accountNumber || '',
    },
    ...(transferType === 'katsu'
      ? [
          {
            key: 'Narration',
            value: data.narration || '',
          },
        ]
      : [
          {
            key: 'Recipient name',
            value: data.accountName || '',
          },
          {
            key: 'Recipient bank',
            value: data.bankName || '',
          },
          {
            key: 'Narration',
            value: data.narration || '',
          },
        ]),
  ];

  return (
    <>
      <div className="flex max-w-full flex-col gap-6">
        <BackText text="Back" onClick={onBack} />
        <h4 className="text-lg font-semibold text-grey-800 md:text-xl">Confirm Transfer</h4>

        <ListItem data={listItemData} />
        <h6 className="text-center text-xs font-bold md:text-lg">Enter PIN to Confirm</h6>
        <div className="flex h-36 max-w-full items-center justify-center">
          <OtpInput
            length={6}
            value={otp}
            onChange={setOtp}
            TextFieldsProps={{
              ...baseTextFieldProps,
              InputProps: { ...baseTextFieldProps?.InputProps, type: 'password' },
            }}
          />
        </div>

        <Button
          text="Transfer"
          type="button"
          disabled={otp.length !== 6}
          onClick={onVerify}
          isLoading={loading.TRANSFER_TO_KATSU || loading.TRANSFER_TO_OTHER_BANK}
        />
      </div>

      {successModal ? (
        <TransferSuccesModal
          onClose={() => {
            router.replace('/');
            onTransferCompleted();
          }}
          viewReceipt={viewTransactionDetails}
        />
      ) : (
        ''
      )}
    </>
  );
}
