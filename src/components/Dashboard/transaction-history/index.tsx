'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import useIsMobile from '@/hooks/useIsMobile';
import GenerateStatement from '@/components/Dashboard/transaction-history/GenerateStatement';
import PageHeader from '@/components/Dashboard/transaction-history/header';
import DesktopTable from '@/components/Dashboard/transaction-history/table/desktop';
import MobileTable from '@/components/Dashboard/transaction-history/table/mobile';
import TransactionDetails from './TransactionDetails';

export default function PageWrapper() {
  const [showGenerateStatement, setShowGenerateStatement] = useState(false);
  const { isMobile } = useIsMobile(1024);
  const searchParams = useSearchParams();
  const showTransactionDetails = !!searchParams.get('transactionID');

  return (
    <>
      <PageHeader generateStatement={() => setShowGenerateStatement(true)} />
      {isMobile && (
        <div className="mt-5 block h-full rounded-lg bg-white p-3 lg:hidden">
          <MobileTable />
        </div>
      )}

      <section className="hidden lg:block">
        <DesktopTable />
      </section>

      {showGenerateStatement && (
        <GenerateStatement onClose={() => setShowGenerateStatement(false)} />
      )}

      {showTransactionDetails && <TransactionDetails />}
    </>
  );
}
