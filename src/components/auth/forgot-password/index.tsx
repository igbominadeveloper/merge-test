'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import BackText from '@/shared/BackText';
import {
  ForgotPasswordSchema,
  ForgotPasswordSchemaType,
} from '@/lib/validations/auth/forgotPassword.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuthFns from '@/hooks/useAuthFns';

import ForgotPasswordForm from './form';
import ForgotPasswordOtp from './Otp';
import ResetPasswordView from '../ResetPassword';

type ActivePage = 'form' | 'otp' | 'reset';

export default function ForgotPassword() {
  const router = useRouter();
  const { loading, sendForgotPasswordCode } = useAuthFns();
  const [activePage, setActivePage] = useState<ActivePage>('form');
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [otp, setOtp] = useState('');

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordSchemaType>({ resolver: zodResolver(ForgotPasswordSchema) });

  const onSubmit: SubmitHandler<ForgotPasswordSchemaType> = async (
    data: ForgotPasswordSchemaType,
  ) => {
    await sendForgotPasswordCode(data.email, () => setIsRequestSent(true));
  };

  const render: Record<ActivePage, React.ReactNode> = {
    form: (
      <ForgotPasswordForm
        handleSubmit={handleSubmit(onSubmit)}
        goToOtpPage={() => setActivePage('otp')}
        control={control}
        isValid={isValid}
        errors={errors}
        requestSent={isRequestSent}
        isLoadingRequest={loading.FORGOT_PASSWORD_CODE}
      />
    ),

    otp: (
      <ForgotPasswordOtp
        email={watch('email')}
        setOtp={setOtp}
        otp={otp}
        onNext={() => setActivePage('reset')}
      />
    ),

    reset: <ResetPasswordView code={otp} />,
  };

  const handleBackClick = () => {
    if (activePage === 'form') {
      router.back();
    } else if (activePage === 'otp') {
      setActivePage('form');
      setIsRequestSent(false);
    } else {
      setActivePage('otp');
    }
  };

  const backText = {
    otp: 'Back',
    reset: 'Return to otp',
    form: 'Return to Login',
  };

  return (
    <>
      <BackText text={backText[activePage]} onClick={handleBackClick} />

      {activePage !== 'reset' && (
        <header className="mb-2 mt-6 text-[32px] font-bold leading-none text-[#212B36]">
          Forgot Password
        </header>
      )}

      {render[activePage]}
    </>
  );
}
