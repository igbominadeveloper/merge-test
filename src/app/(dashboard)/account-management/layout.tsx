import DashboardLayoutShell from '@/shared/DashboardLayoutShell';
import Wrapper from './_components/wrapper';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayoutShell title="Account Management">
      <Wrapper>{children}</Wrapper>
    </DashboardLayoutShell>
  );
}

export default Layout;
