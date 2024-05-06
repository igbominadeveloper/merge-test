import AuthLayout from '@/components/Layout/AuthLayout';

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return <AuthLayout>{children}</AuthLayout>;
}

export default Layout;
