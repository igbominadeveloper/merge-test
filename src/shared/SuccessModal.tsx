'use client';

import React from 'react';
import Success from '@/components/success';
import ModalComponent from './Modal';

type Props = {
  open: boolean;
  onClose?: () => void;
  heading: string;
  subHeading: string;
  buttonLabel: string;
  onButtonClick?: () => void;
};

function SuccessModal({ open, onClose, heading, subHeading, buttonLabel, onButtonClick }: Props) {
  return (
    <ModalComponent
      evenPadding
      open={open}
      onClose={onClose}
      sx={{
        width: {
          xs: '90%',
        },
        maxWidth: '480px',
      }}
    >
      <Success
        heading={heading}
        subHeading={subHeading}
        buttonLabel={buttonLabel}
        onButtonClick={onButtonClick}
      />
    </ModalComponent>
  );
}

export default SuccessModal;
