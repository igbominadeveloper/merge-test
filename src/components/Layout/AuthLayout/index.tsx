import Logo from '@/shared/logo';

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

function AuthLayout({ children, className = '' }: LayoutProps) {
  return (
    <main className="flex min-h-screen flex-col space-y-10 bg-white sm:space-y-0 sm:p-[35px]">
      <div className="bg-white p-5 min-[450px]:p-8 sm:bg-transparent">
        <Logo />
      </div>

      <div className="mx-auto flex h-full w-full flex-1 items-start justify-start px-5 min-[450px]:px-8 sm:items-center sm:justify-center">
        <div className={`w-full sm:max-w-[480px] ${className}`}>{children}</div>
      </div>
    </main>
  );
}

export default AuthLayout;
