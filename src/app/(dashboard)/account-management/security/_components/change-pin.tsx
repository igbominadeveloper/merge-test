'use client';

import Button from '@/shared/Form/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import TextInput from '@/shared/Form/TextInput';
import useTrxFns from '@/hooks/useTrxFns';
import { ChangePinSchema, ChangePinSchemaType } from '../../_validations/schema';

const defaultValues = {
  confirmPin: '',
  newPin: '',
  currentPassword: '',
};

function ChangePin() {
  const { createPin, loading } = useTrxFns();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ChangePinSchemaType>({
    resolver: zodResolver(ChangePinSchema),
    defaultValues,
    mode: 'all',
  });

  const onSubmit: SubmitHandler<ChangePinSchemaType> = async data => {
    await createPin(
      { pin: data.confirmPin, password: data.currentPassword, type: 'PASSWORD' },
      () => reset(defaultValues),
    );
  };

  return (
    <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
      <h3 className="flex-shrink-0 text-[20px] font-medium  sm:text-xl">Change Pin</h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex basis-[50%] flex-col space-y-6"
        autoComplete="off"
      >
        <Controller
          control={control}
          name="newPin"
          render={({ field }) => (
            <TextInput
              {...field}
              fullWidth
              label="New PIN"
              isError={!!errors.newPin}
              onBlur={field.onBlur}
              errorMessage={errors.newPin?.message}
              type="number"
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPin"
          render={({ field }) => (
            <TextInput
              {...field}
              fullWidth
              label="Confirm New PIN"
              isError={!!errors.confirmPin}
              onBlur={field.onBlur}
              errorMessage={errors.confirmPin?.message}
              type="number"
            />
          )}
        />

        <Controller
          control={control}
          name="currentPassword"
          render={({ field }) => (
            <TextInput
              {...field}
              fullWidth
              label="Current Password"
              isError={!!errors.currentPassword}
              onBlur={field.onBlur}
              errorMessage={errors.currentPassword?.message}
              type="password"
            />
          )}
        />

        <div className="grid grid-cols-2 items-center gap-2">
          <Button
            text="Cancel"
            handleClick={() => reset(defaultValues)}
            type="button"
            variant="secondary"
            disabled={loading.CREATE_PIN}
          />

          <Button
            text="Save Changes"
            type="submit"
            disabled={!isValid || loading.CREATE_PIN}
            className="w-full justify-center rounded-lg px-4"
            isLoading={loading.CREATE_PIN}
          />
        </div>
      </form>
    </div>
  );
}

export default ChangePin;
