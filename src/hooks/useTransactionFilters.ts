/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { TransactionCategory, TransactionType } from '@/types/transaction';

type TypeOrNull<T> = T | null;

export function useTransactionFilters() {
  const searchParams = useSearchParams();
  const [transactionType, _setTransactionType] = useState<TypeOrNull<TransactionType>>(
    searchParams.get('transactionType') as TypeOrNull<TransactionType>,
  );

  const [transactionCategory, _setTransactionCategory] = useState<TypeOrNull<TransactionCategory>>(
    searchParams.get('transactionCategory') as TypeOrNull<TransactionCategory>,
  );
  const [search, _setSearch] = useState<string | null>(searchParams.get('search') ?? null);
  const [startDate, _setStartDate] = useState<string | null>(searchParams.get('startDate') ?? null);
  const [endDate, _setEndDate] = useState<string | null>(searchParams.get('endDate') ?? null);
  const [page, _setPage] = useState<number | null>(
    searchParams.get('page') ? Number(searchParams.get('page')) - 1 : null,
  );
  const [pageSize, _setPageSize] = useState<number | null>(
    searchParams.get('pageSize') ? Number(searchParams.get('pageSize')) : null,
  );

  const resetPage = () => _setPage(0);

  const setPage = (value: number | null) => {
    _setPage(value);
  };

  const setTransactionType = (value: TypeOrNull<TransactionType>) => {
    _setTransactionType(value);
    resetPage();
  };

  const setTransactionCategory = (value: TypeOrNull<TransactionCategory>) => {
    _setTransactionCategory(value);
    resetPage();
  };

  const setSearch = (value: string | null) => {
    _setSearch(value);
    resetPage();
  };

  const setStartDate = (value: string | null) => {
    _setStartDate(value);
    resetPage();
  };

  const setEndDate = (value: string | null) => {
    _setEndDate(value);
    resetPage();
  };

  const setPageSize = (value: number | null) => {
    _setPageSize(value);
    resetPage();
  };

  return {
    transactionType,
    search,
    startDate,
    endDate,
    transactionCategory,
    page,
    pageSize,
    setSearch,
    setEndDate,
    setStartDate,
    setTransactionType,
    setTransactionCategory,
    setPage,
    setPageSize,
  };
}
