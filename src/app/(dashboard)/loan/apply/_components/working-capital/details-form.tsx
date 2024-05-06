'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '@/shared/Form/TextInput';
import Button from '@/shared/Form/Button';
import AmountInput from '@/shared/Form/AmountInput';
import { WorkingCapitalSchema, WorkingCapitalSchemaType } from '../../_validation';
import { WorkingCapitalType } from './types';

interface Props {
  onNext: () => void;
  setData: React.Dispatch<React.SetStateAction<WorkingCapitalType>>;
  defaultData: WorkingCapitalType;
}

function WorkingCapitalApplicationForm({ onNext, defaultData, setData }: Props) {
  const {
    formState: { errors, isDirty, isValid },
    control,
    handleSubmit,
  } = useForm<WorkingCapitalSchemaType>({
    mode: 'all',
    resolver: zodResolver(WorkingCapitalSchema),
    defaultValues: {
      loanTenor: defaultData?.loanTenor || '',
      requestAmount: defaultData?.requestAmount || '',
      loanPurpose: defaultData?.loanPurpose || '',
    },
  });

  const titleClass = 'mb-4 text-2xl font-semibold';

  const onSubmit: SubmitHandler<WorkingCapitalSchemaType> = data => {
    setData({ ...defaultData, ...data });
    onNext();
  };

  return (
    <form className="max-w-xl" onSubmit={handleSubmit(onSubmit)}>
      <h4 className={titleClass}>Loan information</h4>

      <div className="space-y-5">
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
          name="loanPurpose"
          render={({ field }) => (
            <TextInput
              {...field}
              type="text"
              fullWidth
              isError={!!errors.loanPurpose}
              label="Loan Purpose"
              variant="filled"
              errorMessage={errors?.loanPurpose?.message || ''}
            />
          )}
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

export default WorkingCapitalApplicationForm;
