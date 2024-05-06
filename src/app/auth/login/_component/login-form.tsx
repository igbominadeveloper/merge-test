'use client';

import { LoginSchema } from '@/lib/validations/auth/login.schema';
import BasicPasswordInput from '@/shared/Form/BasicPasswordInput';
import Button from '@/shared/Form/Button';
import FooterText from '@/shared/Form/FormSubcomponent/FooterText';
import TextInput from '@/shared/Form/TextInput';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ROUTES } from '@/utils/routes';
import useAuthFns from '@/hooks/useAuthFns';

type LoginSchemaType = z.infer<typeof LoginSchema>;

export default function LoginView() {
  const { login, loading } = useAuthFns();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema), mode: 'all' });

  const onSubmit: SubmitHandler<LoginSchemaType> = async data => {
    await login(data);
  };

  return (
    <>
      <header>
        <h3 className="mb-3 text-[32px] font-bold leading-none text-[#212B36]">Login</h3>
        <p className="text-grey-500 text-base leading-none text-grey-900 sm:text-lg">
          Enter your details to access your account
        </p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex w-full flex-col space-y-6">
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <TextInput
              {...field}
              fullWidth
              label="Email Address"
              isError={!!errors.username}
              onBlur={field.onBlur}
              errorMessage={errors.username?.message}
              type="email"
              placeholder="Enter Email Address"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <BasicPasswordInput
              {...field}
              fullWidth
              label="Enter password"
              onBlur={field.onBlur}
              isError={!!errors.password}
              errorMessage={errors.password?.message}
              placeholder="Enter Password"
            />
          )}
        />
        <div className="ml-auto w-fit font-medium underline">
          <Link className="text-base font-semibold" href={ROUTES['forgot-password']}>
            Forgot password?
          </Link>
        </div>
        <Button
          text="Login"
          type="submit"
          disabled={!isDirty || !isValid || Object.values(errors).length > 0 || loading.SIGNIN}
          isLoading={loading.SIGNIN}
        />

        <FooterText text="Don’t have an account?" linkText="Sign up" link={ROUTES.signup} />
      </form>
    </>
  );
}
