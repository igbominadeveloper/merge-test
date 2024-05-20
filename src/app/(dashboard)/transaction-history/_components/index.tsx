'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import useIsMobile from '@/hooks/useIsMobile';
import PageHeader from './header';
import MobileTransactionTable from './table/mobile';
import DesktopTransactionTable from './table/desktop';
import AccountStatement from './account-statement';
import TransactionDetails from './transaction-details';

export default function TransactionHistory() {
  const [showGenerateStatement, setShowGenerateStatement] = useState(false);
  const { isMobile } = useIsMobile(1024);
  const searchParams = useSearchParams();
  const showTransactionDetails = !!searchParams.get('transactionID');

  return (
    <>
      <PageHeader generateStatement={() => setShowGenerateStatement(true)} />
      {isMobile && (
        <div className="mt-5 block h-full rounded-lg bg-white p-3 lg:hidden">
          <MobileTransactionTable />
        </div>
      )}

      <section className="hidden lg:block">
        <DesktopTransactionTable />
      </section>

      {showGenerateStatement && (
        <AccountStatement onClose={() => setShowGenerateStatement(false)} />
      )}

      {showTransactionDetails && <TransactionDetails />}
    </>
  );
}
