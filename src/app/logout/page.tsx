'use client';

import { useEffect } from 'react';
import PageTransition from '@/components/page-transition';
import useAuthFns from '@/hooks/useAuthFns';

function Logout() {
  const { logout } = useAuthFns();

  useEffect(() => {
    logout();

    // eslint-disable-next-line
  }, []);

  return <PageTransition />;
}

export default Logout;
