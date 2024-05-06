'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Success from '@/components/success';
import BackText from '@/shared/BackText';
import CreateTransactionPin from './_component/create';
import EnterOtp from './_component/otp';

type StepType = 'create' | 'otp' | 'success';

function CreatePin() {
  const [activeType, setActiveType] = useState<StepType>('create');
  const [transactionPin, setTransactionPin] = useState('');
  const [otpToken, setOtpToken] = useState('');
  const router = useRouter();

  const renderPages: Record<StepType, React.ReactNode> = {
    create: (
      <CreateTransactionPin
        onNext={(pin: string) => {
          setTransactionPin(pin);
          setActiveType('otp');
        }}
      />
    ),
    otp: (
      <EnterOtp
        otpToken={otpToken}
        setOtpToken={setOtpToken}
        transactionPin={transactionPin}
        onNext={() => setActiveType('success')}
      />
    ),
    success: (
      <Success
        heading="PIN created"
        subHeading="You have successfully created your transaction PIN"
        buttonLabel="Continue to Dashboard"
        onButtonClick={() => router.push('/')}
      />
    ),
  };

  const heading: Record<Exclude<StepType, 'success'>, { title: string; description: string }> = {
    create: {
      description: 'Enter your Transaction PIN',
      title: 'Create Pin!',
    },
    otp: {
      description: 'Enter the 6-digits code that has been sent to your phone or email',
      title: 'Enter OTP',
    },
  };

  const backAction: Record<Exclude<StepType, 'success' | 'create'>, () => void> = {
    otp: () => setActiveType('create'),
  };

  return (
    <>
      {activeType === 'otp' && (
        <BackText text="Back" onClick={backAction[activeType]} className="mb-3" />
      )}

      {activeType !== 'success' && (
        <div className="flex flex-col gap-5">
          <h3 className="text-3xl font-bold">{heading[activeType].title}</h3>
          <p className="text-textColor-main">{heading[activeType].description}</p>
        </div>
      )}

      {renderPages[activeType]}
    </>
  );
}

export default CreatePin;
