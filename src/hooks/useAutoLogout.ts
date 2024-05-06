import { useState, useEffect } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import useAuthFns from './useAuthFns';

const timeout = 60 * 1000 * 5; // 5mins
const promptBeforeIdle = 30000;

function useAutoLogout() {
  const [remaining, setRemaining] = useState(timeout);
  const [open, setOpen] = useState(false);
  const { logout } = useAuthFns();

  const onIdle = () => {
    logout();
    setOpen(false);
  };

  const onPrompt = () => {
    setOpen(true);
  };

  const { getRemainingTime, activate, isPrompted } = useIdleTimer({
    onIdle,
    onPrompt,
    timeout,
    promptBeforeIdle,
    throttle: 1000,
    leaderElection: true,
    syncTimers: 1000,
    crossTab: true,
  });

  const intervalDelay = isPrompted() ? 1000 : promptBeforeIdle;

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000));
    }, intervalDelay);

    return () => {
      clearInterval(interval);
    };
  });

  const timeTillPrompt = Math.max(remaining - promptBeforeIdle / 1000, 0);
  const seconds = timeTillPrompt > 1 ? 'seconds' : 'second';

  const handleStillHere = () => {
    activate();
  };

  const onClosePrompt = () => {
    setOpen(false);
    handleStillHere();
  };

  return {
    remainingSecs: remaining,
    seconds,
    openPrompt: open,
    onClosePrompt,
    promptBeforeIdle,
  };
}

export default useAutoLogout;
