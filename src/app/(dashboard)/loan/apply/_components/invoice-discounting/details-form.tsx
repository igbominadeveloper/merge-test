'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '@/shared/Form/TextInput';
import Button from '@/shared/Form/Button';
import DatePickerInput from '@/shared/Form/DatepickerInput';
import AmountInput from '@/shared/Form/AmountInput';
import { InvoiceDiscountingSchema, InvoiceDiscountingSchemaType } from '../../_validation';
import { InvoiceDiscountingType } from './types';

interface Props {
  onNext: () => void;
  setData: React.Dispatch<React.SetStateAction<InvoiceDiscountingType>>;
  defaultData: InvoiceDiscountingType;
}

function InvoiceDiscountingApplicationForm({ onNext, setData, defaultData }: Props) {
  const {
    formState: { errors, isDirty, isValid },
    control,
    handleSubmit,
    getValues,
  } = useForm<InvoiceDiscountingSchemaType>({
    mode: 'all',
    resolver: zodResolver(InvoiceDiscountingSchema),
    defaultValues: {
      loanTenor: defaultData?.loanTenor ?? '',
      requestAmount: defaultData?.requestAmount ?? '',
      counterPartyAddress: defaultData?.counterPartyAddress ?? '',
      counterPartyName: defaultData?.counterPartyName ?? '',
      counterPartyEmailAddress: defaultData?.counterPartyEmailAddress ?? '',
      invoiceDate: defaultData?.invoiceDate ?? new Date(),
    },
  });

  const gridClass = 'grid grid-cols-2 gap-5';
  const titleClass = 'mb-4 text-2xl font-semibold';

  const onSubmit: SubmitHandler<InvoiceDiscountingSchemaType> = data => {
    setData({ ...defaultData, ...data });

    onNext();
  };

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <h4 className={titleClass}>Loan information</h4>

      <div className={gridClass}>
        <Controller
          control={control}
          name="requestAmount"
          render={({ field }) => (
            <AmountInput
              {...field}
              fullWidth
              isError={!!errors.requestAmount}
              label="Request amount"
              errorMessage={errors?.requestAmount?.message || ''}
            />
          )}
        />

        <Controller
          control={control}
          name="loanTenor"
          render={({ field }) => (
            <TextInput
              {...field}
              type="number"
              fullWidth
              isError={!!errors.loanTenor}
              label="Loan tenor (days)"
              variant="filled"
              errorMessage={errors?.loanTenor?.message || ''}
            />
          )}
        />

        <Controller
          control={control}
          name="counterPartyName"
          render={({ field }) => (
            <TextInput
              {...field}
              type="text"
              fullWidth
              isError={!!errors.counterPartyName}
              label="Counterparty’s name"
              variant="filled"
              errorMessage={errors?.counterPartyName?.message || ''}
            />
          )}
        />
        <Controller
          control={control}
          name="counterPartyAddress"
          render={({ field }) => (
            <TextInput
              {...field}
              type="text"
              fullWidth
              isError={!!errors.counterPartyAddress}
              label="Counterparty’s Address"
              variant="filled"
              errorMessage={errors?.counterPartyAddress?.message || ''}
            />
          )}
        />
        <Controller
          control={control}
          name="counterPartyEmailAddress"
          render={({ field }) => (
            <TextInput
              {...field}
              type="email"
              fullWidth
              isError={!!errors.counterPartyEmailAddress}
              label="Counterparty’s email"
              variant="filled"
              errorMessage={errors?.counterPartyEmailAddress?.message || ''}
            />
          )}
        />
        <Controller
          control={control}
          name="invoiceDate"
          render={({ field }) => {
            const value = getValues('invoiceDate') || null;
            return (
              <DatePickerInput
                isError={!!errors.invoiceDate}
                errorMessage={errors.invoiceDate?.message}
                {...field}
                value={dayjs(value)}
                onChange={date => {
                  const newDate = new Date(date as unknown as Date);
                  field.onChange(newDate);
                }}
                label="Date invoice was issued"
              />
            );
          }}
        />
      </div>

      <div className="mt-6 flex w-full justify-end">
        <Button
          text="Continue"
          ariaLabel="Continue"
          type="submit"
          className="min-w-[236px]"
          disabled={!isValid || (Object.values(defaultData! || {}).length < 0 && !isDirty)}
        />
      </div>
    </form>
  );
}

export default InvoiceDiscountingApplicationForm;
