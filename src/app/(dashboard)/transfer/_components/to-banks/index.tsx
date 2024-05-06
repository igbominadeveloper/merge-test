'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { InputAdornment } from '@mui/material';
import Image from 'next/image';
import TextInput from '@/shared/Form/TextInput';
import Button from '@/shared/Form/Button';
import SearchSelectComponent from '@/shared/Form/FormSubcomponent/autocomplete';
import { Bank, Beneficiary } from '@/types/transaction';
import { Spinner } from '@/components/icons';
import AmountInput from '@/shared/Form/AmountInput';
import useTrxFns from '@/hooks/useTrxFns';
import {
  OthersTransferSchema,
  OthersTransferType,
} from '@/app/(dashboard)/transfer/_validation/schema';
import { convertToNumber } from '@/utils/general';
import { useBanks } from '@/services/queries/bank';
import { useAccountBalance, useBeneficiaries } from '@/services/queries/wallet';
import { useUserProfile } from '@/services/queries/user';
import blueCheckIcon from '@/assets/icons/blue-check.svg';
import { ConfirmTransfer } from '../confirm-transfer';

enum Stages {
  'TO_OTHER_BANK_DETAILS',
  'CONFIRM_TRANSFER',
}

type StagesType = keyof typeof Stages;

function ToBank() {
  const [currentStage, setCurrentStage] = useState<StagesType>('TO_OTHER_BANK_DETAILS');
  const { validateAccountNumber, loading } = useTrxFns();
  const { data: banks } = useBanks();
  const { data: beneficiaries, isLoading } = useBeneficiaries(`beneficiaryType=BANK`);
  const { data: accountBalance } = useAccountBalance();
  const { data: userProfile } = useUserProfile();
  const wallet = userProfile?.businesses[0]?.wallet;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty },
    watch,
    setError,
  } = useForm<OthersTransferType>({
    resolver: zodResolver(OthersTransferSchema),
    defaultValues: {
      accountName: '',
      accountNumber: '',
      bankName: '',
      narration: '',
      amount: '',
    },
    mode: 'all',
  });

  const values = watch();
  const amountConverted = convertToNumber(values.amount);

  useEffect(() => {
    if (values.accountNumber?.length === 10) {
      (async () =>
        validateAccountNumber(
          { accountNumber: values.accountNumber, bankCode: values.bankName },
          value => setValue('accountName', value),
        ))();
    }

    // eslint-disable-next-line
  }, [values.accountNumber]);

  const onSubmit: SubmitHandler<OthersTransferType> = () => {
    if (values.accountNumber === wallet?.floatAccountNumber) {
      setError('accountNumber', { message: 'You cannot transfer to yourself' });
      return;
    }
    if (
      !accountBalance?.availableBalance ||
      (accountBalance?.availableBalance && amountConverted > accountBalance?.availableBalance)
    ) {
      setError('amount', { message: 'Insufficient balance' });
      return;
    }
    setCurrentStage('CONFIRM_TRANSFER');
  };

  return (
    <>
      {currentStage === 'TO_OTHER_BANK_DETAILS' ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col space-y-6">
          <SearchSelectComponent<Beneficiary>
            value={
              beneficiaries?.find(
                (bankData: Beneficiary) => bankData.bankCode === values.bankName,
              ) ?? null
            }
            loading={isLoading}
            loadingText="Loading..."
            getOptionLabel={option =>
              `${(option as Beneficiary).firstName} ${(option as Beneficiary).lastName}` || ''
            }
            label="Choose a Beneficiary "
            getOptionKey={option => (option as Beneficiary).uuId || ''}
            options={beneficiaries ?? []}
            onChange={(_, value) => {
              setValue('bankName', (value as Beneficiary)?.bankCode || '');
              setValue('accountNumber', (value as Beneficiary)?.accountNumber || '');
              setValue('accountName', '');
            }}
          />

          <div className="relative flex h-[22px] w-full items-center">
            <hr className="relative my-8 h-px w-full border-0 bg-grey-700/20" />
            <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 text-xs text-grey-700">
              OR
            </span>
          </div>

          <SearchSelectComponent<Bank>
            isError={!!errors.bankName}
            errorMessage={errors.bankName?.message}
            value={banks?.find(bank => bank.code === values.bankName) ?? null}
            getOptionLabel={option => (option as Bank).name || ''}
            label="Choose Bank"
            getOptionKey={option => (option as Bank).code || ''}
            options={banks ?? []}
            onChange={(_, value) => {
              setValue('bankName', (value as Bank)?.code || '');
              setValue('accountNumber', '');
              setValue('accountName', '');
            }}
          />

          <Controller
            control={control}
            name="accountNumber"
            render={({ field }) => (
              <TextInput
                {...field}
                fullWidth
                label="Beneficiary Account Number"
                value={field.value ? field.value : ''}
                isError={!!errors.accountNumber}
                errorMessage={errors.accountNumber?.message}
                onChange={e => {
                  field.onChange(e);
                  setValue('accountName', '');
                }}
              />
            )}
          />

          <div>
            <Controller
              control={control}
              name="accountName"
              render={({ field }) => (
                <TextInput
                  {...field}
                  fullWidth
                  disabled
                  InputLabelProps={{
                    sx: {
                      '&.Mui-disabled': {
                        color: `${values.accountName && '#1976d2 !important'}`,
                      },
                      fontSize: '14px',
                    },
                  }}
                  InputProps={{
                    sx: {
                      background: `${values.accountName && '#1977F214 !important'}`,
                      '&.MuiFilledInput-root::before': {
                        borderBottom: 'none',
                        borderBottomStyle: 'unset !important',
                      },
                      '&.MuiInputBase-root.MuiFilledInput-root.Mui-disabled': {
                        background: '#f6f7f8',
                      },
                      '& .MuiInputBase-inputAdornedEnd.Mui-disabled': {
                        background: `${values.accountName && 'transparent'}`,
                      },
                    },
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        variant="standard"
                        className={`${!values.accountName && 'hidden'}`}
                      >
                        <Image alt="blue-check" src={blueCheckIcon} />
                      </InputAdornment>
                    ),
                  }}
                  value={field.value ? field.value : ''}
                  label="Beneficiary Account Name"
                  isError={!!errors.accountName}
                  errorMessage={errors.accountName?.message}
                />
              )}
            />
            {loading.VALIDATE_ACCOUNT ? (
              <div className="mt-1 flex items-center  space-x-2">
                <Spinner
                  color="text-primary-main"
                  className="!ml-0 !mr-0"
                  width="w-4"
                  height="h-4"
                />

                <span className="text-sm text-primary-main">Getting account name...</span>
              </div>
            ) : (
              ''
            )}{' '}
          </div>
          <Controller
            control={control}
            name="amount"
            render={({ field }) => (
              <AmountInput
                {...field}
                fullWidth
                label="Amount"
                isError={!!errors.amount}
                errorMessage={errors.amount?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="narration"
            render={({ field }) => (
              <TextInput
                {...field}
                fullWidth
                label="Narration"
                isError={!!errors.narration}
                errorMessage={errors.narration?.message}
              />
            )}
          />
          <Button
            className=""
            text="Confirm Transfer"
            type="submit"
            disabled={!isValid || !isDirty}
          />
        </form>
      ) : (
        ''
      )}

      {currentStage === 'CONFIRM_TRANSFER' ? (
        <ConfirmTransfer
          data={{
            amount: amountConverted,
            accountName: watch('accountName'),
            bankName: banks?.find((bank: Bank) => bank?.code === watch('bankName'))?.name || '',
            narration: watch('narration'),
            accountNumber: watch('accountNumber'),
            bankCode: watch('bankName'),
            category: 'TRANSFER',
            recipientAccountId: '',
          }}
          transferType="others"
          onBack={() => setCurrentStage('TO_OTHER_BANK_DETAILS')}
        />
      ) : (
        ''
      )}
    </>
  );
}
export default ToBank;
