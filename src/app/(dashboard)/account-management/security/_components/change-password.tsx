'use client';

import Button from '@/shared/Form/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { PasswordWithChecks } from '@/shared/Form/password-input';
import TextInput from '@/shared/Form/TextInput';
import useUserFns from '@/hooks/useUserFns';
import { ChangePasswordSchema, ChangePasswordSchemaType } from '../../_validations/schema';

const defaultValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

function ChangePassword() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues,
  });
  const { changePassword, loading } = useUserFns();

  const onSubmit: SubmitHandler<ChangePasswordSchemaType> = async data => {
    await changePassword(data, () => reset(defaultValues));
  };

  return (
    <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
      <h3 className="flex-shrink-0 text-[20px] font-medium  sm:text-xl">Change Password</h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex basis-[50%] flex-col space-y-6"
        autoComplete="off"
      >
        <Controller
          control={control}
          name="oldPassword"
          render={({ field }) => (
            <TextInput
              {...field}
              fullWidth
              label="Old password"
              isError={!!errors.oldPassword}
              onBlur={field.onBlur}
              errorMessage={errors.oldPassword?.message}
              type="password"
            />
          )}
        />

        <Controller
          control={control}
          name="newPassword"
          render={({ field }) => (
            <PasswordWithChecks
              {...field}
              fullWidth
              label="New password"
              onBlur={field.onBlur}
              isError={!!errors.newPassword}
              errorMessage={errors.newPassword?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <TextInput
              {...field}
              fullWidth
              label="Confirm new password"
              isError={!!errors.confirmPassword}
              onBlur={field.onBlur}
              errorMessage={errors.confirmPassword?.message}
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
            disabled={loading.CHANGE_PASSWORD}
          />

          <Button
            text="Save Changes"
            type="submit"
            disabled={!isValid || loading.CHANGE_PASSWORD}
            className="w-full justify-center rounded-lg px-4"
            isLoading={loading.CHANGE_PASSWORD}
          />
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
