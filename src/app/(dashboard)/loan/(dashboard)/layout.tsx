'use client';

import { usePathname } from 'next/navigation';
import DashboardLayoutShell from '@/shared/DashboardLayoutShell';
import { ButtonSwitch } from '@/shared/ButtonSwitch';
import { ROUTES } from '@/utils/routes';
import { prefetchProductTypes } from '@/services/queries/loan';
import InfoStats from '../_components/info-stats';

const options = [
  { label: 'Apply for Loans', value: '' },
  { label: 'Loan History', value: 'loan-history' },
];

interface Props {
  children: React.ReactNode;
}

export default function LoanLayoutWrapper({ children }: Props) {
  const activeType = usePathname().split('/').slice(2, 4).join('/') ?? '';

  prefetchProductTypes();

  return (
    <DashboardLayoutShell title="Loan">
      <div className="flex flex-col gap-8">
        <InfoStats />

        <ButtonSwitch
          handleChange={() => {}}
          options={options}
          activeType={activeType}
          asLink
          path={ROUTES.Loan}
          className="max-w-[388px]"
        />

        {children}
      </div>
    </DashboardLayoutShell>
  );
}
