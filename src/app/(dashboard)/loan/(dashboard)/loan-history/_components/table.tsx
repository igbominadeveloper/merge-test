import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { capitalize } from '@mui/material';
import Link from 'next/link';
import DesktopTable from '@/components/table/desktop';
import { Column } from '@/types/general';
import { LoanTransaction, LoanStatusEnum, LoanTransactionFilter } from '@/types/loan';
import { formatAmount, formatDateString, toUrlQuery } from '@/utils/helpers';
import StatusBadge, { Status } from '@/components/Dashboard/status-badge';
import { ROUTES } from '@/utils/routes';
import { useLoanTransactions } from '@/services/queries/loan';

const columns: Column<LoanTransaction>[] = [
  {
    id: 'createdAt',
    label: 'Date',
    minWidth: 100,
    format: value => formatDateString(value as string),
  },
  {
    id: 'productCategory',
    label: 'Loan Request Type',
    minWidth: 100,
  },
  {
    id: 'loanAmount',
    label: 'Amount',
    minWidth: 120,
    format: value => formatAmount(value as number),
  },
  {
    id: 'paymentTenorInDays',
    label: 'Duration',
    minWidth: 120,
    format: value => `${value} Days`,
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 100,
  },
  {
    label: 'Actions',
    minWidth: 90,
  },
];

const statuses: Record<LoanStatusEnum, Status> = {
  [LoanStatusEnum.Approved]: 'success',
  [LoanStatusEnum.DisbursementOfFunds]: 'success',
  [LoanStatusEnum.CreditAssessment]: 'warning',
  [LoanStatusEnum.Rejected]: 'danger',
  [LoanStatusEnum.New]: 'secondary',
  [LoanStatusEnum.HeadCreditApproval]: 'warning',
  [LoanStatusEnum.ChiefCommercialOfficerApproval]: 'warning',
  [LoanStatusEnum.DirectorFinancialServicesApproval]: 'warning',
  [LoanStatusEnum.ExecutionAndSigningOfPreDisbursementDocuments]: 'warning',
  [LoanStatusEnum.CollateralManagerVisit]: 'warning',
};

function TransactionStatusBadge({ status }: { status: LoanStatusEnum }) {
  return <StatusBadge theme={statuses[status]} status={status} />;
}

interface RowProps {
  column: Column<LoanTransaction>;
  row: LoanTransaction;
}
function Row(props: RowProps) {
  const { column, row } = props;

  if (column.id === 'status') {
    return <TransactionStatusBadge status={row.status} />;
  }

  if (column.id) {
    const value = row[column.id];
    if (column.format) {
      return column.format(value as string);
    }
    return capitalize(value as string);
  }

  return (
    <div className="flex items-center gap-6">
      <Link
        href={`${ROUTES.Loan}/${row._id}/details`}
        className="flex items-center justify-center rounded-lg
      bg-[#EDF6FF] px-3 py-1 font-bold capitalize text-primary-main hover:bg-[#d6eafa]"
      >
        View
      </Link>

      <Link
        href={`${ROUTES.Loan}/${row._id}/pay-off`}
        className={`hidden items-center justify-center rounded-lg px-3 py-1 font-bold capitalize  ${row.status !== LoanStatusEnum.Approved ? 'pointer-events-none bg-gray-100 text-gray-500' : 'bg-primary-main text-white hover:bg-primary-main/90'}`}
      >
        Pay-off
      </Link>
    </div>
  );
}

export default function Table(props: LoanTransactionFilter) {
  const { loanStatus, page, pageSize, setPage, setPageSize } = props;

  const query = {
    page: page ? Number(page) + 1 : 1,
    limit: pageSize ? Number(pageSize) : 10,
    loanByStatus: loanStatus,
  };

  const router = useRouter();

  useEffect(() => {
    const queryString = toUrlQuery(query);
    router.replace(`${ROUTES.Loan}/loan-history?${queryString}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, loanStatus]);

  const { data, isLoading } = useLoanTransactions(toUrlQuery(query));
  const loans = data?.results;

  return (
    <DesktopTable
      rows={loans ?? []}
      columns={columns}
      rowId="_id"
      hover={false}
      rowsPerPage={pageSize || 10}
      page={page || 0}
      minHeight={500}
      total={data?.totalRecords}
      isLoading={isLoading}
      onRowsPerPageChange={perPage => setPageSize(perPage)}
      onPageChange={newPage => setPage(newPage)}
    >
      {(row, column) => <Row column={column} row={row} />}
    </DesktopTable>
  );
}
