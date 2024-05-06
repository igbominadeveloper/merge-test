import React from 'react';
import SuccessModal from '@/shared/SuccessModal';
import { useRegistationDocumentModal } from '@/store/state/useVerifyModals';
import useHandleStep from '@/hooks/useHandleStep';
import ModalComponent from '@/shared/Modal';
import BusinessRegistration from './BusinessRegistration';
import BusinessAddress from './BusinessAddress';
import { BusinessVerificationProvider } from './BusinessVerificationContext';

enum Steps {
  'BUSINESSREG' = 'BUSINESSREG',
  'BUSINEESADDRESS' = 'BUSINEESADDRESS',
}
type Step = keyof typeof Steps;

function BusinessVerificationModals() {
  const steps = [Steps.BUSINESSREG, Steps.BUSINEESADDRESS];
  const { activeStep, handleNextStep, handleBackStep } = useHandleStep(steps);
  const { isModalOpen, setModal } = useRegistationDocumentModal();

  const renderPages: Record<Step, React.ReactNode> = {
    BUSINESSREG: <BusinessRegistration handleNextStep={handleNextStep} handleClose={setModal} />,
    BUSINEESADDRESS: <BusinessAddress goBack={handleBackStep} handleClose={setModal} />,
  };

  return (
    <div>
      <ModalComponent
        open={isModalOpen}
        onClose={setModal}
        evenPadding
        disableBackropClick
        disableEscapeKeyDown
        style={{ maxWidth: '450px', width: '100%', padding: '20px 20px 30px' }}
      >
        <BusinessVerificationProvider>{renderPages[activeStep]}</BusinessVerificationProvider>
      </ModalComponent>
      <SuccessModal
        open={false}
        heading="Verified!"
        subHeading="Your business registration document has been successfully verified."
        buttonLabel="Done"
      />
    </div>
  );
}

export default BusinessVerificationModals;
