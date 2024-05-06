import OTP from '@/components/otp';
import useAuthFns from '@/hooks/useAuthFns';
import useTimer from '@/hooks/useTimer';
import Button from '@/shared/Form/Button';

interface Props {
  email: string;
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  onNext: () => void;
}
export default function ForgotPasswordOtp({ email, setOtp, otp, onNext }: Props) {
  const { loading, sendForgotPasswordCode } = useAuthFns();
  const { mins, secs, stopTimer, restartTimer } = useTimer();

  const resendOtp = async () => {
    try {
      await sendForgotPasswordCode(email);
      restartTimer();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = () => {
    onNext();
    stopTimer();
  };

  return (
    <div className="max-w-full">
      <OTP
        receiver={email}
        otp={otp}
        setOtp={setOtp}
        minutes={mins}
        seconds={secs}
        resend={resendOtp}
        disabled={loading.FORGOT_PASSWORD_CODE}
      />

      <Button
        disabled={otp.length !== 6}
        onClick={handleSubmit}
        text="Verify"
        type="button"
        className="mt-5 w-full"
        isLoading={loading.FORGOT_PASSWORD_CODE}
      />
    </div>
  );
}
