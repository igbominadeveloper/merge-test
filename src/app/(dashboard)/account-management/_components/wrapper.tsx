'use client';

import { Suspense, useState } from 'react';
import { ButtonSwitch } from '@/shared/ButtonSwitch';
import { ROUTES } from '@/utils/routes';
import { usePathname } from 'next/navigation';
import PageTransition from '@/components/page-transition';

type ActiveType = 'profile' | 'security' | 'beneficiaries';

const options: { label: string; value: ActiveType }[] = [
  { label: 'Profile', value: 'profile' },
  { label: 'Security', value: 'security' },
  { label: 'Beneficiaries', value: 'beneficiaries' },
];

function Wrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeType, setActiveType] = useState<ActiveType>(
    (pathname.split('/')[2] as ActiveType) || 'profile',
  );

  return (
    <Suspense fallback={<PageTransition />}>
      <ButtonSwitch
        options={options}
        activeType={activeType}
        handleChange={value => setActiveType(value)}
        asLink
        path={ROUTES.AccountManagement}
        className="max-w-screen-sm"
      />

      <div className="mt-6 rounded-2xl bg-white p-5 sm:p-10">{children}</div>
    </Suspense>
  );
}
export default Wrapper;
