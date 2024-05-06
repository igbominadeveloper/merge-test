'use client';

import emailSent from '@/assets/icons/email-sent.svg';

import ModalComponent from '@/shared/Modal';
import Image from 'next/image';
import Button from '@/shared/Form/Button';

interface Props {
  onClose: () => void;
  viewReceipt: () => void;
}
function TransferSuccesModal(props: Props) {
  const { onClose, viewReceipt } = props;

  return (
    <ModalComponent
      evenPadding
      open
      disableBackropClick
      style={{
        maxWidth: '480px',
      }}
    >
      <Image className="mx-auto mb-2 mt-4" width={80} height={80} src={emailSent} alt="mail icon" />
      <p className="mb-2 text-center text-[24px] font-semibold text-grey-800">
        Transfer Successful
      </p>
      {/* Beneficiaries are added automatically...in future development there is a possibilty this can be added back as a manual way for users to add beneficiaries if they want to. */}
      {/* <div className="text-body1 mb-5 flex w-full items-center justify-center gap-[9px] text-center text-grey-900">
        <IOSSwitch size="small" color="primary" />
        <p className="text-xs text-grey-800">Save as beneficiary</p>
      </div> */}
      <div className="mt-9 grid w-[300px] grid-cols-2 gap-3 md:w-[432px]">
        <Button variant="secondary" text="View Receipt" type="button" onClick={viewReceipt} />

        <Button text="Done" type="button" onClick={onClose} />
      </div>
    </ModalComponent>
  );
}
export default TransferSuccesModal;
