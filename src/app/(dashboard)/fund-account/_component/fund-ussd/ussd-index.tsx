'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/shared/Form/Button';
import {
  FundWithUSSDSchema,
  FundWithUSSDSchemaType,
} from '@/app/(dashboard)/fund-account/_validation/schema';
import { useUserProfile } from '@/services/queries/user';
import { FundWithUssd, USSD } from '@/types/transaction';
import OtpInput from '@/shared/OtpInput';
import { useState } from 'react';
import { UssdData } from '@/app/(dashboard)/fund-account/_component/types';
import useTrxFns from '@/hooks/useTrxFns';
import SearchSelectComponent from '@/shared/Form/FormSubcomponent/autocomplete';
import AmountInput from '@/shared/Form/AmountInput';

interface IUssdIndex {
  handleUssdData: (data: UssdData) => void;
  onNext: () => void;
  isBankLoading: boolean;
  banks: USSD[] | undefined;
}

function UssdIndex({ onNext, handleUssdData, banks, isBankLoading }: IUssdIndex) {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid, isDirty },
  } = useForm<FundWithUSSDSchemaType>({
    resolver: zodResolver(FundWithUSSDSchema),
    defaultValues: {
      amount: '',
      bankCode: '',
      pinCode: '',
    },
  });

  const { fundWithUssd, loading } = useTrxFns();
  const { data: userInfo } = useUserProfile();

  const businessAccount = userInfo?.businesses?.at(0);

  const onSubmit: SubmitHandler<FundWithUSSDSchemaType> = async data => {
    const fundPayload = {
      pinCode: data.pinCode,
      bankCode: data.bankCode,
      customer: {
        email: businessAccount?.email || '',
        name: businessAccount?.name || '',
        phoneNumber: businessAccount?.phone || '',
      },
      transactionCategory: 'FUNDING',
      amount: Number(data.amount),
    } as FundWithUssd;
    const bankName = banks?.find(bank => bank?.BankCode === data?.bankCode)?.BankName || '';
    const resData = await fundWithUssd(fundPayload);
    if (resData) {
      const ussdString = resData?.ResponseDetails?.UssdString;
      handleUssdData({ ussdString, bankName, amount: data.amount });
      onNext();
    }
  };

  const validateBankAndPin = async (name: string) => {
    if (name !== 'amount') {
      return;
    }
    const [hasBankCode, hasAmount] = await Promise.all([trigger('bankCode'), trigger('amount')]);
    if (hasBankCode && hasAmount) {
      setShowPin(true);
    }
  };

  const handlePin = (value: string) => {
    setPin(value);
    setValue('pinCode', value);
    trigger('pinCode');
  };

  return (
    <>
      <div>
        <h3 className="mb-1 text-xl font-semibold sm:text-2xl">Fund with USSD</h3>
        <p className="text-sm text-secondary-400">
          Enter the details below and generate a code to fund your account.
        </p>
      </div>

      <form className="mt-5 flex w-full flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="bankCode"
          render={({ field }) => (
            <SearchSelectComponent<USSD>
              {...field}
              isError={!!errors.bankCode}
              loading={isBankLoading}
              errorMessage={errors.bankCode?.message}
              value={banks?.find(bank => bank.BankCode === field.value) ?? null}
              getOptionLabel={option => (option as USSD).BankName || ''}
              label="Choose Bank"
              getOptionKey={option => (option as USSD).BankCode || ''}
              options={banks ?? []}
              onChange={(_, value) => {
                const val = (value as USSD)?.BankCode;
                field.onChange(val);
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="amount"
          render={({ field }) => (
            <AmountInput
              {...field}
              onChange={val => {
                field.onChange(val.target.value);
                validateBankAndPin('amount');
              }}
              fullWidth
              label="Amount"
              isError={!!errors.amount}
              errorMessage={errors.amount?.message}
            />
          )}
        />

        {showPin && (
          <div className="">
            <h6 className="pb-6 pt-2 text-center text-xs font-bold md:text-lg">
              Enter PIN to Confirm
            </h6>
            <div className="flex h-36 w-full items-center justify-center bg-[#FAFAFA]">
              <OtpInput autoFocus={false} length={6} value={pin} onChange={handlePin} />
            </div>
          </div>
        )}
        <Button
          className="justify-center rounded-lg border bg-primary-main text-xs font-semibold text-white md:text-base"
          text="Generate Code"
          type="submit"
          isLoading={loading.FUND_WITH_USSD}
          disabled={!isValid || !isDirty}
        />
      </form>
    </>
  );
}
export default UssdIndex;
