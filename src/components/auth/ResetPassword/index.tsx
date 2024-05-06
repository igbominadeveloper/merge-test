'use client';

import useAuthFns from '@/hooks/useAuthFns';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  ResetPasswordSchema,
  ResetPasswordSchemaType,
} from '@/lib/validations/auth/resetPassword.schema';
import BasicPasswordInput from '@/shared/Form/BasicPasswordInput';
import Button from '@/shared/Form/Button';
import { PasswordWithChecks } from '@/shared/Form/password-input';
import SuccessModal from '@/shared/SuccessModal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

export default function ResetPasswordView({ code }: { code: string }) {
  const { resetPassword, loading } = useAuthFns();
  const [requestSent, setRequestSent] = useState(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordSchemaType>({ resolver: zodResolver(ResetPasswordSchema) });

  const onSubmit: SubmitHandler<ResetPasswordSchemaType> = async (
    data: ResetPasswordSchemaType,
  ) => {
    await resetPassword({ password: data.confirmPassword, code }, () => setRequestSent(true));
  };

  return (
    <>
      <header className="mt-6">
        <h3 className="mb-4 text-[32px] font-bold leading-none text-[#212B36]">
          Reset your password
        </h3>
        <p className="text-grey-500 text-base leading-none text-secondary-400">
          Be sure to enter a password you will remember
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 grid gap-6">
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <PasswordWithChecks
              {...field}
              fullWidth
              label="Create password"
              onBlur={field.onBlur}
              isError={!!errors.password}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <BasicPasswordInput
              {...field}
              fullWidth
              label="Confirm Password"
              isError={!!errors.confirmPassword}
              onBlur={field.onBlur}
              errorMessage={errors.confirmPassword?.message}
            />
          )}
        />

        <Button
          text="Update Password"
          type="submit"
          disabled={!isValid || loading.RESET_PASSWORD}
          isLoading={loading.RESET_PASSWORD}
        />
      </form>

      {requestSent && (
        <SuccessModal
          buttonLabel="Continue to Login"
          onButtonClick={() => router.push('/login')}
          heading="Password Reset Complete"
          subHeading="Your password has been successfully changed"
          open={requestSent}
        />
      )}
    </>
  );
}
