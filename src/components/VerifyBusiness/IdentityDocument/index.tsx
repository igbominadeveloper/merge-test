import SuccessModal from '@/shared/SuccessModal';
import React from 'react';
import { useIdentifyDocumentsModal } from '@/store/state/useVerifyModals';
import IdentityDocument from './identityDocument';

function IdentifyDocumentModals() {
  const { isModalOpen, setModal } = useIdentifyDocumentsModal();

  return (
    <div>
      <IdentityDocument open={isModalOpen} handleClose={setModal} />
      <SuccessModal
        open={false}
        heading="Verified!"
        subHeading="Your identity document has been successfully verified."
        buttonLabel="Done"
      />
    </div>
  );
}

export default IdentifyDocumentModals;
