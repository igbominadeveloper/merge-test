'use client';

import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '@/shared/Form/TextInput';
import BackText from '@/shared/BackText';
import Button from '@/shared/Form/Button';
import useTrxFns from '@/hooks/useTrxFns';
import { Spinner } from '@/components/icons';
import SuccessModal from '@/shared/SuccessModal';

import { useRouter } from 'next/navigation';
import { ROUTES } from '@/utils/routes';
import { useUserProfile } from '@/services/queries/user';
import SearchSelectComponent from '@/shared/Form/FormSubcomponent/autocomplete';
import { useBanks } from '@/services/queries/bank';
import { Bank } from '@/types/transaction';
import { AddBeneficiarySchema, AddBeneficiaryType } from '../../_validations/schema';

function AddBeneficiary() {
  const [toggleModal, setToggleModal] = useState(false);
  const { validateAccountNumber, loading, addBeneficiary } = useTrxFns();
  const { data: banks } = useBanks();
  const { data: user } = useUserProfile();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty },
    watch,
  } = useForm<AddBeneficiaryType>({
    resolver: zodResolver(AddBeneficiarySchema),
    defaultValues: {
      accountName: '',
      accountNumber: '',
      bankName: '',
    },
  });

  const values = watch();

  useEffect(() => {
    if (values.accountNumber.length === 10) {
      (async () =>
        validateAccountNumber(
          { accountNumber: values.accountNumber, bankCode: values.bankName },
          value => setValue('accountName', value),
        ))();
    }

    // eslint-disable-next-line
  }, [values.accountNumber]);

  const onSubmit: SubmitHandler<AddBeneficiaryType> = async (data: AddBeneficiaryType) => {
    // remove extra white spaces
    const accountName = data.accountName.replace(/\s+/g, ' ').trim().split(' ');

    await addBeneficiary(
      {
        accountNumber: data.accountNumber,
        bankCode: data.bankName,
        bankName: banks?.find((bank: Bank) => bank?.code === data?.bankName)?.name || '',
        firstName: accountName?.at(0) || '',
        lastName: accountName?.at(accountName.length - 1) || '',
        userId: user?._id,
        deleted: false,
      },
      () => setToggleModal(true),
    );
  };

  return (
    <div className="max-w-md">
      <BackText text="Back" className="mb-4" />
      <h3 className="text-[20px] font-medium sm:text-xl ">Add new beneficiary</h3>
      <form className="mt-5 flex w-full flex-col space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                value={field.value ? field.value : ''}
                label="Beneficiary Account Name"
                isError={!!errors.accountName}
                errorMessage={errors.accountName?.message}
              />
            )}
          />
          {loading.VALIDATE_ACCOUNT && (
            <div className="mt-1 flex items-center  space-x-2">
              <Spinner color="text-primary-main" className="!ml-0 !mr-0" width="w-4" height="h-4" />

              <span className="text-sm text-primary-main">Getting account name...</span>
            </div>
          )}{' '}
        </div>

        <Button
          className="w-full"
          text="Save Beneficiary"
          type="submit"
          isLoading={loading.ADD_BENEFICIARY}
          disabled={!isValid || !isDirty || loading.ADD_BENEFICIARY || loading.VALIDATE_ACCOUNT}
        />
      </form>

      {toggleModal && (
        <SuccessModal
          heading="Successfully Added"
          subHeading="Your beneficiary has been successfully added"
          buttonLabel="Done"
          onButtonClick={() => {
            setToggleModal(false);
            router.push(`${ROUTES.AccountManagement}/beneficiaries`);
          }}
          open={toggleModal}
        />
      )}
    </div>
  );
}
export default AddBeneficiary;
