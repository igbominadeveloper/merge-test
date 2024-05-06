import OtpInput from '@/shared/Form/FormSubcomponent/OtpInput';

interface Props {
  receiver?: string;
  otp: string;
  className?: string;
  setOtp: (value: string) => void;
  resend?: () => void;
  disabled?: boolean;
  seconds: number;
  minutes: number;
  description?: React.ReactNode | string | undefined;
}

export default function OTP(props: Props) {
  const { className, receiver, otp, setOtp, resend, disabled, minutes, seconds, description } =
    props;

  return (
    <div className={`flex flex-col ${className}`}>
      {description ?? (
        <p className="mb-6 text-grey-900">
          Enter the code that has been sent to <span className="text-primary-main">{receiver}</span>
        </p>
      )}

      <OtpInput value={otp} onChange={setOtp} />

      {minutes === 0 && seconds === 0 ? (
        <div className="mt-5 flex items-center gap-1">
          <p className="text-grey-900">Didn’t get a code?</p>

          <button
            type="button"
            onClick={resend}
            className="font-semibold text-primary-main underline underline-offset-4 outline-none"
            disabled={disabled}
          >
            Click to resend
          </button>
        </div>
      ) : (
        <p className="mt-5 text-sm font-medium text-secondary-400">
          Resend in{' '}
          <span className="text-primary-main">{`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</span>
        </p>
      )}
    </div>
  );
}
