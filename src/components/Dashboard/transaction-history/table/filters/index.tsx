'use client';

import React, { useCallback, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useIsMobile from '@/hooks/useIsMobile';
import { FilterProps } from '@/types/transaction';
import useParamSearch from '@/hooks/useParamSearch';
import DesktopFilters from './desktop';
import MobileFilters from './mobile';

export default function TableFilters(props: FilterProps) {
  const {
    endDate,
    search,
    startDate,
    transactionType,
    transactionCategory,
    page,
    pageSize,
    setEndDate,
    setSearch,
    setStartDate,
    setTransactionType,
    setTransactionCategory,
  } = props;
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile } = useIsMobile(1024);
  const { createQueryStringFromObject } = useParamSearch();

  const updateInstantFilters = useCallback(
    (filters: Record<string, string | number | null | undefined>) => {
      const queryString = createQueryStringFromObject(filters);
      router.push(`${pathname}?${queryString}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, pathname],
  );

  useEffect(() => {
    const filters = {
      transactionType,
      transactionCategory,
      startDate,
      endDate,
      search,
      page: Number(page) + 1,
      pageSize,
    };

    updateInstantFilters(filters);
  }, [
    transactionCategory,
    search,
    transactionType,
    isMobile,
    startDate,
    endDate,
    page,
    pageSize,
    updateInstantFilters,
  ]);

  return (
    <>
      <section className="hidden lg:block">
        <DesktopFilters
          transactionType={transactionType}
          transactionCategory={transactionCategory}
          search={search}
          startDate={startDate}
          endDate={endDate}
          page={page}
          pageSize={pageSize}
          setEndDate={setEndDate}
          setSearch={setSearch}
          setStartDate={setStartDate}
          setTransactionType={setTransactionType}
          setTransactionCategory={setTransactionCategory}
        />
      </section>

      <section className="block lg:hidden">
        <MobileFilters
          transactionCategory={transactionCategory}
          transactionType={transactionType}
          search={search}
          startDate={startDate}
          endDate={endDate}
          page={page}
          pageSize={pageSize}
          setEndDate={setEndDate}
          setSearch={setSearch}
          setStartDate={setStartDate}
          setTransactionType={setTransactionType}
          setTransactionCategory={setTransactionCategory}
        />
      </section>
    </>
  );
}
