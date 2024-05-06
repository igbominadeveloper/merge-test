'use client';

import { useEffect, useState } from 'react';
import Hamburger from '@/components/icons/hamburger';
import { useNavigationEvent } from '@/hooks/useNavigationEvent';
import { Box, Drawer } from '@mui/material';
import useIsMobile from '@/hooks/useIsMobile';
import Logo from '@/shared/logo';

import PageTransition from '@/components/page-transition';
import Sidebar from '@/components/Layout/Sidebar';
import { useUserProfile } from '@/services/queries/user';
import useKYCKYBVerification from '@/hooks/useKYCKYBVerification';
import ModalComponent from '@/shared/Modal';
import { ROUTES } from '@/utils/routes';
import Encrypt from '@/utils/encrypt';
import { useRouter } from 'next/navigation';
import useAutoLogout from '@/hooks/useAutoLogout';
import AutoLogOutPrompt from '@/components/Dashboard/auto-logout-prompt';
import IncompleteKYC from './incomplete-kyc';

const drawerWidth = 268;

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { isMobile } = useIsMobile(1280);
  const { data } = useUserProfile();
  const business = data?.businesses.find(userBusiness => userBusiness.type === 'BANKING');
  const { showKYCModal, currentRouteTitle } = useKYCKYBVerification();
  const router = useRouter();
  const { onClosePrompt, openPrompt, promptBeforeIdle, remainingSecs } = useAutoLogout();

  useEffect(() => {
    if (data) {
      if (!data?.emailVerification) {
        router.push(
          `${ROUTES['verify-email']}?id=${encodeURIComponent(Encrypt.encrypt(`${data?.username},${business?.name}`))}`,
        );
      } else {
        setHasLoaded(true);
      }
    }

    // eslint-disable-next-line
  }, [data]);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = '#F4F6F8';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  useNavigationEvent(() => {
    setMobileOpen(false);
    setIsClosing(false);
  });

  return hasLoaded && data ? (
    <main className="relative flex h-full min-h-screen w-full flex-col items-start overflow-y-auto bg-grey-400 xl:flex-row">
      <header className=" flex w-full items-center  space-x-4 bg-white p-4 xl:hidden">
        <button type="button" aria-label="toggle-menu" onClick={handleDrawerToggle}>
          <Hamburger />
        </button>

        <Logo />
      </header>

      <Box
        className="block xl:hidden"
        component="aside"
        sx={{ width: drawerWidth, flexShrink: { sm: 0 } }}
        aria-label="side bar"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={theme => ({
            textAlign: 'center',
            [theme.breakpoints.up('xl')]: {
              display: 'none',
            },
            display: 'block',
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRightWidth: 0,
            },
          })}
        >
          <Sidebar onCloseSidebar={handleDrawerClose} />
        </Drawer>
      </Box>

      {!isMobile && (
        <aside
          className="sticky top-0 h-screen overflow-y-auto scrollbar-hide"
          style={{ minWidth: drawerWidth }}
        >
          <Sidebar onCloseSidebar={handleDrawerClose} />
        </aside>
      )}

      <div className="flex min-h-screen w-full flex-1 flex-grow flex-col  gap-6 bg-grey-400 px-4 py-3 md:py-5 xl:px-10">
        {children}
      </div>

      {showKYCModal && (
        <ModalComponent open={showKYCModal} style={{ maxWidth: 480, padding: '40px 20px 20px' }}>
          <IncompleteKYC title={currentRouteTitle} />
        </ModalComponent>
      )}

      <AutoLogOutPrompt
        open={openPrompt}
        onClose={onClosePrompt}
        remainingSecs={remainingSecs}
        timeOut={promptBeforeIdle}
      />
    </main>
  ) : (
    <PageTransition />
  );
}

export default DashboardLayout;
