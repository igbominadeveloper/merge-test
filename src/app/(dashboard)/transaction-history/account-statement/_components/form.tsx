import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import React from 'react';
import DatePickerInput from '@/shared/Form/DatepickerInput';
import Button from '@/shared/Form/Button';
import { AccountStatementSchema, AccountStatementType } from '../_validation/schema';

interface Props {
  loading: boolean;
  onClose: () => void;
  onSubmit: (data: AccountStatementType) => void;
}
export default function AccountStatementForm(props: Props) {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<AccountStatementType>({
    resolver: zodResolver(AccountStatementSchema),
  });
  const { loading, onSubmit, onClose } = props;

  return (
    <form className="mt-4 flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="startDate"
        render={({ field }) => (
          <DatePickerInput
            isError={!!errors.startDate}
            disabled={loading}
            {...field}
            errorMessage={errors.startDate?.message}
            label="Start Date"
            value={dayjs(getValues('startDate') || null)}
            onChange={date => {
              const newDate = new Date(date as unknown as Date);
              field.onChange(newDate);
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="endDate"
        render={({ field }) => (
          <DatePickerInput
            isError={!!errors.endDate}
            disabled={loading}
            label="End Date"
            errorMessage={errors.endDate?.message}
            {...field}
            value={dayjs(getValues('endDate') || null)}
            onChange={date => {
              const newDate = new Date(date as unknown as Date);
              field.onChange(newDate);
            }}
          />
        )}
      />

      <section className="mt-5 flex flex-col gap-3 md:flex-row md:gap-6">
        <Button
          text="Cancel"
          type="button"
          variant="secondary"
          disabled={loading}
          handleClick={onClose}
          className="w-full rounded-lg bg-gray-700/10 p-4 py-3 text-sm font-bold text-black"
        />
        <Button
          text="Generate"
          isLoading={loading}
          type="submit"
          className="w-full rounded-lg bg-primary-main p-4 py-3 text-sm font-bold text-white hover:bg-primary-main/90"
        />
      </section>
    </form>
  );
}
