import React from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Transaction, TransactionType, TransactionTypeEnum } from '@/types/transaction';
import { formatAmount, toUrlQuery } from '@/utils/helpers';
import Filters from '@/components/Dashboard/transaction-history/table/filters';
import MobileTable from '@/components/table/mobile';
import { TRANSACTION_ICONS } from '@/utils/dashboardItems';
import { useTransactionFilters } from '@/hooks/useTransactionFilters';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/utils/routes';
import { useAllTransactions } from '@/services/queries/transaction';
import { TypeOrNull } from '@/types/general';

dayjs.extend(localizedFormat);

function formatDateString(date: string | Date): string {
  return dayjs(date).format('D MMM YYYY h:mm A');
}

interface RowProps {
  transaction: Transaction;
  transactionType: TypeOrNull<TransactionType>;
  onRowClick: (id: string) => void;
}
function Row({ transaction, transactionType, onRowClick }: RowProps) {
  const getRecipientAccountName = () => {
    if (transactionType === null) {
      const isCredit = transaction.transactionType === TransactionTypeEnum.CREDIT;

      if (isCredit) {
        // the value to display is the sender
        return transaction?.senderDetail?.accountName;
      }
      return transaction?.receiverDetail?.accountName;
    }
  };
  return (
    <div
      onClick={() => onRowClick(transaction?.transactionId)}
      className="flex items-center gap-4 border-b border-dashed border-gray-200 pb-2 last-of-type:border-0"
    >
      <div className="rounded-full bg-primary-main/10 p-2">
        {/* there should be a distinct icon for inflow */}
        <Image
          src={TRANSACTION_ICONS[transaction?.transactionType]}
          alt="transfer-icon"
          height={20}
          width={20}
        />
      </div>

      <div className="flex flex-1 flex-col">
        <p className="text-sm font-semibold">{getRecipientAccountName()}</p>
        <p className="text-[12px] leading-6 text-gray-500">
          {formatDateString(transaction.createdDate)}
        </p>
      </div>

      <p className="text-xs text-black/80">{formatAmount(transaction?.amount)}</p>
    </div>
  );
}

export default function TransactionTable() {
  const router = useRouter();

  const {
    search,
    transactionType,
    startDate,
    endDate,
    transactionCategory,
    page,
    pageSize,
    setEndDate,
    setSearch,
    setStartDate,
    setTransactionType,
    setTransactionCategory,
  } = useTransactionFilters();

  const filters = {
    search,
    endDate,
    startDate,
    transactionType,
    transactionCategory,
    page,
    pageSize,
  };

  const query = {
    pageNumber: page ? Number(page) + 1 : 0,
    pageSize: pageSize ? Number(pageSize) : 10,
    filterByCategories: transactionCategory ? transactionCategory?.toUpperCase() : null,
    filterByTypes: transactionType ? transactionType?.toUpperCase() : null,
    fromDate: startDate ? `${startDate} 00:00` : null,
    toDate: endDate ? `${endDate} 23:59` : null,
    search,
  };

  const { data, isLoading } = useAllTransactions(toUrlQuery(query));

  const showTransactionDetails = (transactionID: string) => {
    router.push(`${ROUTES.Transactions}?transactionID=${transactionID}`);
  };

  return (
    <>
      <div className="mb-4">
        <Filters
          setEndDate={setEndDate}
          setSearch={setSearch}
          setStartDate={setStartDate}
          setTransactionType={setTransactionType}
          setTransactionCategory={setTransactionCategory}
          {...filters}
        />
      </div>

      <MobileTable
        isLoading={isLoading}
        rows={data?.results ?? []}
        rowsPerPage={pageSize || 10}
        page={page || 0}
        rowId="transactionId"
      >
        {(row, rowKey) => (
          <Row
            key={rowKey}
            onRowClick={() => showTransactionDetails(row.transactionId)}
            transaction={row}
            transactionType={transactionType}
          />
        )}
      </MobileTable>
    </>
  );
}
