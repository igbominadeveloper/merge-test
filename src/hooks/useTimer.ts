import { useEffect, useState } from 'react';

const useTimer = (initTime = 60) => {
  const maxSec = 59;
  const getMins = (time: number) => Math.floor(time / (maxSec + 1));
  const getSecs = (time: number) => time % (maxSec + 1);

  const [mins, setMins] = useState<number>(getMins(initTime));
  const [secs, setSecs] = useState<number>(getSecs(initTime));

  const restartTimer = (time = initTime) => {
    setMins(getMins(time));
    setSecs(getSecs(time));
  };

  const stopTimer = () => {
    restartTimer(0);
  };

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (secs > 0) {
        setSecs(secs - 1);
      }
      if (secs === 0) {
        if (mins === 0) {
          clearInterval(myInterval);
        } else {
          setMins(mins - 1);
          setSecs(maxSec);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return {
    mins,
    secs,
    restartTimer,
    stopTimer,
  };
};

export default useTimer;
