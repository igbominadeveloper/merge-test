import React from 'react';
import SuccessModal from '@/shared/SuccessModal';
import { useNinModal } from '@/store/state/useVerifyModals';
import VerifyNin from './VerifyNin';

function VerifyNinModals() {
  const { isModalOpen, setModal } = useNinModal();

  return (
    <div>
      <VerifyNin open={isModalOpen} handleClose={setModal} />
      <SuccessModal
        open={false}
        heading="Verified!"
        subHeading="Your Nin has been successfully verified"
        buttonLabel="Done"
      />
    </div>
  );
}

export default VerifyNinModals;
