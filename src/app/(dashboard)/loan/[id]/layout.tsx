'use client';

import { useRouter } from 'next/navigation';
import { ROUTES } from '@/utils/routes';
import BackText from '@/shared/BackText';

export default function Wrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-8">
      <BackText text="Back" onClick={() => router.push(`${ROUTES.Loan}/active-loans`)} />
      {children}
    </div>
  );
}
