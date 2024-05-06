import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

interface IProps {
  open: boolean;
  timeOut: number;
  onClose: () => void;
  remainingSecs: number;
}

function AutoLogOutPrompt({ open, timeOut, onClose, remainingSecs }: IProps) {
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
  };

  const action = (
    <Button color="secondary" size="small" onClick={handleClose}>
      Stay Logged In
    </Button>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={timeOut}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{
        '& .MuiSnackbarContent-root': {
          backgroundColor: '#fff',
          color: '#212B36',
        },
      }}
    >
      <SnackbarContent
        message={`Are you still there?
         Your session will end in ${remainingSecs}s`}
        action={action}
      />
    </Snackbar>
  );
}

export default AutoLogOutPrompt;
