import { useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import OTP from '@/components/otp';
import Button from '@/shared/Form/Button';
import useTimer from '@/hooks/useTimer';

interface Props {
  phoneNumber: string;
  loading: boolean;
  handleSubmit: (otp: string) => void;
  cancelHandler: () => void;
}

export default function OtpVerification(props: Props) {
  const { mins, secs } = useTimer();
  const { phoneNumber, loading, handleSubmit, cancelHandler } = props;
  const [otp, setOtp] = useState('');

  return (
    <div className="flex flex-col items-center">
      <NotificationsIcon sx={{ height: 75, width: 75 }} className="text-grey-900" />
      <h2 className="my-3 text-2xl font-semibold">Verification code</h2>
      <OTP
        receiver={phoneNumber}
        otp={otp}
        setOtp={setOtp}
        className="items-center"
        seconds={secs}
        minutes={mins}
      />

      <div className="mt-10 flex w-full flex-col gap-4 md:flex-row">
        <Button className="w-full" text="Cancel" variant="secondary" onClick={cancelHandler} />
        <Button
          className="w-full"
          disabled={otp.length !== 6}
          isLoading={loading}
          handleClick={() => handleSubmit(otp)}
          text="Verify"
        />
      </div>
    </div>
  );
}
