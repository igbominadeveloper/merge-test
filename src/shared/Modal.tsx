import { Box, Modal, SxProps, Theme } from '@mui/material';
import { CSSProperties, ReactNode } from 'react';

export default function ModalComponent({
  children,
  open,
  onClose,
  evenPadding,
  style,
  sx,
  disableBackropClick = false,
  disableEscapeKeyDown = false,
}: {
  children: ReactNode;
  open: boolean;
  onClose?: () => void;
  evenPadding?: boolean;
  style?: CSSProperties;
  sx?: SxProps<Theme>;
  disableBackropClick?: boolean;
  disableEscapeKeyDown?: boolean;
}) {
  const disabledReasons: string[] = [];
  if (disableBackropClick) disabledReasons.push('backdropClick');
  if (disableEscapeKeyDown) disabledReasons.push('escapeKeyDown');

  const dismissModal = (_event: Event, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (disabledReasons.includes(reason)) return;

    if (onClose) onClose();
  };

  return (
    <Modal
      open={open}
      onClose={dismissModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        background: 'rgba(52, 64, 84, 0.6)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Box
        style={{
          minWidth: 300,
          minHeight: 100,
          backgroundColor: 'white',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '20px',
          outline: 'none',
          padding: evenPadding ? '24px' : '76px 24px',
          boxShadow:
            '0px 8px 8px -4px rgba(16, 24, 40, 0.04), 0px 20px 24px -4px rgba(16, 24, 40, 0.10)',
          ...style,
        }}
        sx={{ width: { xs: '100%' }, maxWidth: '480px', padding: 10, ...sx }}
      >
        {children}
      </Box>
    </Modal>
  );
}
