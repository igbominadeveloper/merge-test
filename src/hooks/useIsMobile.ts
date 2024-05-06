import { useCallback, useEffect, useState } from 'react';

const useIsMobile = (breakpoint = 640, listener?: () => void) => {
  const checkForDevice = useCallback(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < breakpoint;
    }
    return false;
  }, [breakpoint]);

  const [isMobile, setIsMobile] = useState(checkForDevice());

  useEffect(() => {
    const handlePageResized = () => {
      setIsMobile(checkForDevice());
      if (listener) listener();
    };

    window.addEventListener('resize', handlePageResized);
    window.addEventListener('orientationchange', handlePageResized);
    window.addEventListener('load', handlePageResized);
    window.addEventListener('reload', handlePageResized);

    return () => {
      window.removeEventListener('resize', handlePageResized);
      window.removeEventListener('orientationchange', handlePageResized);
      window.removeEventListener('load', handlePageResized);
      window.removeEventListener('reload', handlePageResized);
    };
  }, [listener, checkForDevice]);

  return {
    isMobile,
  };
};

export default useIsMobile;
