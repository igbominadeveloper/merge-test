import { useState } from 'react';
import { usePhoneNumberModal } from '@/store/state/useVerifyModals';
import ModalComponent from '@/shared/Modal';
import { PhoneNumberSchemaType } from '@/lib/validations/auth/phone-number.schema';
import Success from '@/components/success';
import { getPhoneVerificationToken, validatePhoneVerificationToken } from '@/services/clients/kyc';
import { useUserProfile } from '@/services/queries/user';
import { useNotification } from '@/shared/Notification';
import getErrorMessage from '@/utils/getErrorMessage';
import PhoneNumber from './phone-number';
import OtpVerification from './otp';

enum Stages {
  'PHONE_NUMBER',
  'OTP',
  'COMPLETE',
}

type Stage = keyof typeof Stages;

function VerifyPhoneNumberModal() {
  const { isModalOpen, setModal } = usePhoneNumberModal();
  const [currentStage, setCurrentStage] = useState<Stage>('PHONE_NUMBER');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setLoading] = useState(false);
  const { data: user, refetch } = useUserProfile();
  const { onMessage } = useNotification();

  const submitHandler = async (data: PhoneNumberSchemaType) => {
    setPhoneNumber(data.phone);
    if (!user?._id) return;

    setLoading(true);
    try {
      await getPhoneVerificationToken(user._id, data.phone);
      setCurrentStage('OTP');
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      onMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (otp: string) => {
    if (!user?._id) return;
    setLoading(true);

    try {
      await validatePhoneVerificationToken(user._id, otp);
      await refetch();
      setCurrentStage('COMPLETE');
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      onMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setCurrentStage('PHONE_NUMBER');
    setModal();
  };

  const render: Record<Stage, React.ReactNode> = {
    PHONE_NUMBER: (
      <PhoneNumber cancelHandler={closeModal} submitHandler={submitHandler} loading={isLoading} />
    ),
    OTP: (
      <OtpVerification
        loading={isLoading}
        cancelHandler={closeModal}
        handleSubmit={verifyOtp}
        phoneNumber={phoneNumber}
      />
    ),
    COMPLETE: (
      <Success
        onButtonClick={closeModal}
        heading="Verified!"
        subHeading="Your Phone Number has been successfully verified."
        buttonLabel="Done"
      />
    ),
  };

  return (
    <div>
      <ModalComponent
        evenPadding
        open={isModalOpen}
        onClose={closeModal}
        disableBackropClick
        disableEscapeKeyDown
        style={{ maxWidth: '500px', width: '100%', padding: '20px 20px 30px' }}
      >
        {render[currentStage]}
      </ModalComponent>
    </div>
  );
}

export default VerifyPhoneNumberModal;
