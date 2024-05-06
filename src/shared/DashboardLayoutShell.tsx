import PageTitle from '@/components/Dashboard/PageTitle';

type ShellType = { className?: string; children: React.ReactNode; title: string };

function DashboardLayoutShell({ children, className = '', title }: ShellType) {
  return (
    <div className={`flex min-h-screen w-full flex-col gap-6 ${className}`}>
      <PageTitle title={title} />
      {children}
    </div>
  );
}

export default DashboardLayoutShell;
