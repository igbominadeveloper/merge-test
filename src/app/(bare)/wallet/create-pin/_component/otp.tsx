import OTP from '@/components/otp';
import useTimer from '@/hooks/useTimer';
import useTrxFns from '@/hooks/useTrxFns';
import Button from '@/shared/Form/Button';

type EnterOtpType = {
  otpToken: string;
  setOtpToken: React.Dispatch<React.SetStateAction<string>>;
  onNext: () => void;
  transactionPin: string;
};

function EnterOtp({ otpToken, setOtpToken, onNext, transactionPin }: EnterOtpType) {
  const { mins, secs, restartTimer } = useTimer();
  const { verifyTransactionPin, createPin, loading } = useTrxFns();

  const resendOtp = async () => {
    try {
      await createPin({ pin: transactionPin, type: 'OTP' });
      restartTimer();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (token: string) => {
    await verifyTransactionPin(token, onNext);
  };

  const handleChange = (input: string) => {
    setOtpToken(input);

    if (input.length === 6) {
      handleSubmit(input);
    }
  };

  return (
    <>
      <OTP
        otp={otpToken}
        setOtp={handleChange}
        resend={resendOtp}
        disabled={loading.VERIFY_TRANSACTION_PIN || loading.CREATE_PIN}
        seconds={secs}
        minutes={mins}
        description={<div className="mb-6" />}
        className=""
      />

      <Button
        text="Confirm Pin"
        className="mt-5 w-full"
        type="button"
        disabled={otpToken.length !== 6 || loading.VERIFY_TRANSACTION_PIN}
        onClick={() => handleSubmit(otpToken)}
        isLoading={loading.VERIFY_TRANSACTION_PIN}
      />
    </>
  );
}

export default EnterOtp;
