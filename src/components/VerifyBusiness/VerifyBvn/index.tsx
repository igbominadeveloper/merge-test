import React from 'react';
import SuccessModal from '@/shared/SuccessModal';
import { useBvnModal } from '@/store/state/useVerifyModals';
import VerifyBvn from './VerifyBvn';

function VerifyBvnModals() {
  const { isModalOpen, setModal } = useBvnModal();

  return (
    <div>
      <VerifyBvn open={isModalOpen} handleClose={setModal} />
      <SuccessModal
        open={false}
        heading="Verified!"
        subHeading="Your BVN has been successfully verified"
        buttonLabel="Done"
      />
    </div>
  );
}

export default VerifyBvnModals;
