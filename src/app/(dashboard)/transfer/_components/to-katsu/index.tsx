'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { InputAdornment } from '@mui/material';
import Image from 'next/image';
import useTrxFns from '@/hooks/useTrxFns';
import { Spinner } from '@/components/icons';
import { Beneficiary } from '@/types/transaction';
import SearchSelectComponent from '@/shared/Form/FormSubcomponent/autocomplete';
import {
  KatsuTransferSchema,
  KatsuTransferType,
} from '@/app/(dashboard)/transfer/_validation/schema';
import Button from '@/shared/Form/Button';
import AmountInput from '@/shared/Form/AmountInput';
import TextInput from '@/shared/Form/TextInput';
import { convertToNumber } from '@/utils/general';
import { useAccountBalance, useBeneficiaries } from '@/services/queries/wallet';
import blueCheckIcon from '@/assets/icons/blue-check.svg';
import { useUserProfile } from '@/services/queries/user';
import { ConfirmTransfer } from '../confirm-transfer';

enum Stages {
  'TO_KATSU_DETAILS',
  'CONFIRM_TRANSFER',
}

type StagesType = keyof typeof Stages;

function ToKatsu() {
  const [currentStage, setCurrentStage] = useState<StagesType>('TO_KATSU_DETAILS');
  const [katsuAccountDetails, setKatsuAccountDetails] = useState<any>({});
  const { getKatsuAccountDetails, loading } = useTrxFns();
  const { data: beneficiaries, isLoading } = useBeneficiaries(`beneficiaryType=WALLET`);
  const { data: accountBalance } = useAccountBalance();
  const { data: userProfile } = useUserProfile();
  const wallet = userProfile?.businesses[0]?.wallet;

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isValid, isDirty },
    watch,
  } = useForm<KatsuTransferType>({
    resolver: zodResolver(KatsuTransferSchema),
    defaultValues: {
      accountName: '',
      accountNumber: '',
      bankNameKatsu: '',
      narration: '',
      amount: '',
      bank: '',
    },
    mode: 'all',
  });
  const values = watch();

  useEffect(() => {
    const prefillBankDetails = async () => {
      const resData = await getKatsuAccountDetails(values?.accountNumber);

      if (resData) {
        setValue('accountName', resData?.name);
        setValue('bankNameKatsu', resData?.wallet?.virtualBankName);
        setKatsuAccountDetails(resData?.wallet);
      }
    };

    if (values.accountNumber?.length === 10 || values.accountNumber?.length === 13) {
      prefillBankDetails();
    }

    // eslint-disable-next-line
  }, [values.accountNumber, wallet?.floatAccountNumber]);

  const amountConverted = convertToNumber(values.amount);

  const onSubmit: SubmitHandler<KatsuTransferType> = () => {
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
      {currentStage === 'TO_KATSU_DETAILS' ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
          <SearchSelectComponent<Beneficiary>
            isError={!!errors.bank}
            loading={isLoading}
            loadingText="Loading..."
            errorMessage={errors.bank?.message}
            value={
              beneficiaries?.find(
                (beneficiary: Beneficiary) => beneficiary?.phoneNumber === values.accountNumber,
              ) ?? null
            }
            getOptionLabel={option =>
              `${(option as Beneficiary).firstName} ${(option as Beneficiary).lastName}` || ''
            }
            label="Choose a Beneficiary "
            getOptionKey={option => (option as Beneficiary).uuId || ''}
            options={beneficiaries ?? []}
            onChange={(_, value) => {
              setValue('accountNumber', (value as Beneficiary)?.phoneNumber || '');
              setValue('accountName', '');
              setValue('bankNameKatsu', '');
            }}
          />

          <div className="relative flex h-[22px] w-full items-center">
            <hr className="relative my-8 h-px w-full border-0 bg-grey-700/20" />
            <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 text-xs text-grey-700">
              OR
            </span>
          </div>
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
                  setValue('bankNameKatsu', '');
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="bankNameKatsu"
            render={({ field }) => (
              <TextInput
                {...field}
                fullWidth
                disabled
                value={field.value ? field.value : ''}
                label="Beneficiary Bank Name"
                isError={!!errors.bankNameKatsu}
                errorMessage={errors.bankNameKatsu?.message}
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
            {loading.GET_ACCOUNT_DETAILS ? (
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

          <div>
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
          </div>

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
          <Button text="Confirm Transfer" type="submit" disabled={!isValid || !isDirty} />
        </form>
      ) : (
        ''
      )}

      {currentStage === 'CONFIRM_TRANSFER' ? (
        <ConfirmTransfer
          data={{
            amount: amountConverted || '',
            recipientAccountId: katsuAccountDetails?.floatAccountId,
            narration: watch('narration') || '',
            category: 'TRANSFER',
          }}
          accountName={watch('accountName')}
          transferType="katsu"
          onBack={() => setCurrentStage('TO_KATSU_DETAILS')}
        />
      ) : (
        ''
      )}
    </>
  );
}
export default ToKatsu;
