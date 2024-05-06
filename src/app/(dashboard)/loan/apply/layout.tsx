'use client';

import BackText from '@/shared/BackText';
import { ROUTES } from '@/utils/routes';
import { useRouter } from 'next/navigation';

function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <section>
      <BackText text="Back" onClick={() => router.push(`${ROUTES.Loan}`)} />

      {children}
    </section>
  );
}

export default Layout;
