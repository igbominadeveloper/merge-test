import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { useRouter } from 'next/navigation';
import Filters from '@/components/Dashboard/transaction-history/table/filters';
import DesktopTable from '@/components/table/desktop';
import { useTransactionFilters } from '@/hooks/useTransactionFilters';
import { Column } from '@/types/general';
import { Transaction, TransactionTypeEnum } from '@/types/transaction';
import { formatAmount, formatDateString, toUrlQuery, trimText } from '@/utils/helpers';
import { ROUTES } from '@/utils/routes';
import { useAllTransactions } from '@/services/queries/transaction';
import DesktopRow from './desktop-row';

dayjs.extend(localizedFormat);

export default function TransactionTable() {
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
    setPage,
    setPageSize,
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

  const isDebit = transactionType?.toUpperCase() === TransactionTypeEnum.DEBIT;
  const isCredit = transactionType?.toUpperCase() === TransactionTypeEnum.CREDIT;
  // eslint-disable-next-line no-nested-ternary
  const senderReceiverColumn: Column<Transaction> = isDebit
    ? {
        id: 'receiverDetail',
        label: 'Receiver',
        format: value => (value as Transaction['receiverDetail'])?.accountName || '-',
      }
    : isCredit
      ? {
          id: 'senderDetail',
          label: 'Sender',
          format: value =>
            // TODO: find a way to get both values here because when it's a self-deposit, the sender is null
            (value as Transaction['senderDetail'])?.accountName ?? '-',
        }
      : {
          id: 'receiverDetail',
          label: 'Receiver / Sender',
          format: value => (value as Transaction['receiverDetail'])?.accountName || '-',
        };

  const columns: Column<Transaction>[] = [
    {
      id: 'transactionId',
      label: 'Transaction ID',
      minWidth: 90,
      format: value => (value ? trimText(value as string, 22) : ''),
    },
    {
      minWidth: 100,
      ...senderReceiverColumn,
    },
    {
      id: 'transactionType',
      label: 'Transaction Type',
      minWidth: 80,
    },
    {
      id: 'createdDate',
      label: 'Transaction Date',
      minWidth: 120,
      format: value => formatDateString(value as string),
    },
    {
      id: 'amount',
      label: 'Amount',
      minWidth: 120,
      format: value => formatAmount(value as number),
    },
    {
      id: 'transactionStatus',
      label: 'Status',
      minWidth: 90,
    },
    {
      label: 'Action',
      minWidth: 120,
    },
  ];
  const router = useRouter();
  const query = {
    pageNumber: page ? Number(page) + 1 : 1,
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
      <div className="mt-5">
        <Filters
          setEndDate={setEndDate}
          setSearch={setSearch}
          setStartDate={setStartDate}
          setTransactionType={setTransactionType}
          setTransactionCategory={setTransactionCategory}
          {...filters}
        />
      </div>

      <DesktopTable
        onPageChange={newPage => setPage(newPage)}
        isLoading={isLoading}
        rows={data?.results ?? []}
        columns={columns}
        hover={false}
        rowsPerPage={pageSize || 10}
        page={page || 0}
        rowId="transactionId"
        total={data?.total}
        onRowsPerPageChange={perPage => setPageSize(perPage)}
      >
        {(row, column) => (
          <DesktopRow onRowClick={showTransactionDetails} column={column} row={row} />
        )}
      </DesktopTable>
    </>
  );
}
