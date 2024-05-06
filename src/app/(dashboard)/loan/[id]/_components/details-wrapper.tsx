'use client';

// import { useParams, usePathname } from 'next/navigation';
import PageTitle from '@/components/Dashboard/PageTitle';
// import { ButtonSwitch } from '@/shared/ButtonSwitch';
// import { ROUTES } from '@/utils/routes';
import InfoHeader from './info-header';

export default function Wrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { id } = useParams<{ id: string }>();
  // const activeType = usePathname().split('/').slice(4, 5).join('/') ?? '';

  // const options = [
  //   { label: 'Loan Details', value: '' },
  //   { label: 'Repayment History', value: 'repayment-history' },
  // ];

  return (
    <div className="flex max-w-[772px] flex-col gap-8">
      <PageTitle title="Loan Details" />
      <InfoHeader />

      {/* <ButtonSwitch
        handleChange={() => {}}
        options={options}
        activeType={activeType}
        asLink
        path={`${ROUTES.Loan}/${id}/details`}
        className="max-w-[388px]"
      /> */}

      {children}
    </div>
  );
}
