'use client';

import { useState } from 'react';
import { useUserProfile } from '@/services/queries/user';
import { useSearchParams } from 'next/navigation';
import Encrypt from '@/utils/encrypt';

import OTPInput from './otp';
import VerifyEmailSuccess from './success';

enum Stages {
  'OTP',
  'SUCCESS',
}

type StageType = keyof typeof Stages;

function VerifyEmail() {
  const [currentStage, setCurrentStage] = useState<StageType>('OTP');
  const search = useSearchParams();
  const id = search.get('id');
  const decoded = (Encrypt.decrypt(decodeURIComponent(id!)) as string)?.split(',');
  const email = decoded?.at(0) ?? '';
  const businessName = decoded?.at(1) ?? '';
  const { data } = useUserProfile();

  const renderPages: Record<
    StageType,
    {
      title?: string;
      description?: string;
      component: React.ReactNode;
    }
  > = {
    OTP: {
      component: (
        <OTPInput
          email={email ?? ''}
          userId={data?._id ?? ''}
          onSuccess={() => setCurrentStage('SUCCESS')}
        />
      ),
    },

    SUCCESS: {
      component: <VerifyEmailSuccess businessName={businessName ?? ''} />,
    },
  };

  return renderPages[currentStage].component;
}
export default VerifyEmail;
