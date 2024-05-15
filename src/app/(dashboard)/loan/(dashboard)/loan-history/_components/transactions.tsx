'use client';

import PageTitle from '@/components/Dashboard/PageTitle';
import { useLoanTransactions } from '@/services/queries/loan';
import { useLoanTransactionsFilters } from '@/hooks/useLoanTransactionsFilter';
import Filters from './filters';
import Table from './table';
import NoTransactions from './no-transaction';

export default function Transactions() {
  const { data } = useLoanTransactions();
  const filters = useLoanTransactionsFilters();

  return data?.totalRecords === 0 ? (
    <NoTransactions />
  ) : (
    <>
      <div className="rounded-t-xl bg-white p-5">
        <PageTitle title="Loan Activity" className="md:text-xl" />
        <div className="mt-10">
          <Filters {...filters} />
        </div>
      </div>

      <div className="-mt-8">
        <Table {...filters} />
      </div>
    </>
  );
}
