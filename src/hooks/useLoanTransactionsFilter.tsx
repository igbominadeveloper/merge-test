/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { LoanStatusFilter } from '@/types/loan';

export function useLoanTransactionsFilters() {
  const searchParams = useSearchParams();
  const [loanStatus, _setLoanStatus] = useState<LoanStatusFilter | null>(
    (searchParams.get('loanByStatus') as LoanStatusFilter) || null,
  );
  const [page, _setPage] = useState<number | null>(
    searchParams.get('page') ? Number(searchParams.get('page')) - 1 : null,
  );
  const [pageSize, _setPageSize] = useState<number | null>(
    searchParams.get('limit') ? Number(searchParams.get('limit')) : null,
  );

  const resetPage = () => _setPage(0);

  const setPage = (value: number) => {
    _setPage(value);
  };

  const setLoanStatus = (value: LoanStatusFilter | null) => {
    _setLoanStatus(value);
    resetPage();
  };

  const setPageSize = (value: number) => {
    _setPageSize(value);
    resetPage();
  };

  return {
    page,
    pageSize,
    loanStatus,
    setPage,
    setPageSize,
    setLoanStatus,
  };
}
