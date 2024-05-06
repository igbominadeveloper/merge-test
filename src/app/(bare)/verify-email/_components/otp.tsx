'use client';

import { useState } from 'react';
import OTP from '@/components/otp';
import Button from '@/shared/Form/Button';
import useAuthFns from '@/hooks/useAuthFns';
import useTimer from '@/hooks/useTimer';

interface Props {
  onSuccess: () => void;
  userId: string;
  email: string;
}

export default function OTPInput(props: Props) {
  const { onSuccess, userId, email } = props;
  const [otp, setOtp] = useState('');
  const { sendEmailVerification, loading, verifyEmailToken } = useAuthFns();
  const { restartTimer, secs, mins } = useTimer();

  const handleSubmit = async (token: string) => {
    await verifyEmailToken(token, userId, onSuccess);
  };

  const resendOtp = async () => {
    try {
      await sendEmailVerification();
      restartTimer();
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (o: string) => {
    setOtp(o);

    if (o.length === 6) {
      handleSubmit(o);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="my-3 text-2xl font-semibold">Verify your email</h2>
      <OTP
        receiver={email}
        otp={otp}
        setOtp={handleChange}
        resend={resendOtp}
        disabled={loading.SEND_EMAIL_VERIFICATION || loading.VERIFY_EMAIL_TOKEN}
        seconds={secs}
        minutes={mins}
      />

      <Button
        disabled={otp.length !== 6 || loading.VERIFY_EMAIL_TOKEN}
        handleClick={() => handleSubmit(otp)}
        text="Verify Email"
        className="mt-6"
        isLoading={loading.VERIFY_EMAIL_TOKEN}
      />
    </div>
  );
}
