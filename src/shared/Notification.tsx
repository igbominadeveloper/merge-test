'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { Snackbar } from '@mui/material';

type NotificationType = {
  onMessage: (message: string) => void;
};

const NotificationContext = createContext<NotificationType>({} as NotificationType);

function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const onMessage = (data: string) => {
    setMessage(data);
    setOpen(true);
  };

  const memoizedFn = useMemo(() => onMessage, []);

  const contextValue = useMemo(() => ({ onMessage: memoizedFn }), [memoizedFn]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        message={message}
        autoHideDuration={3000}
        onClose={handleClose}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#fff',
            color: '#212B36',
          },
        }}
      />

      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);

export default NotificationProvider;
