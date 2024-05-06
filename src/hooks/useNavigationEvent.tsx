import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export const useNavigationEvent = (onPathnameChange: () => void) => {
  const pathname = usePathname(); // Get current route

  const storedPathNameRef = useRef(pathname);

  useEffect(() => {
    if (storedPathNameRef.current !== pathname) {
      onPathnameChange();
      storedPathNameRef.current = pathname;
    }
  }, [pathname, onPathnameChange]);
};
