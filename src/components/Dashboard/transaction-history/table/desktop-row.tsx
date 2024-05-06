import { Column } from '@/types/general';
import Button from '@/shared/Form/Button';
import { capitalize } from '@mui/material';
import TransactionStatusBadge from '@/components/Dashboard/transaction-history/TransactionStatusBadge';
import { Transaction } from '@/types/transaction';

interface RowProps {
  column: Column<Transaction>;
  row: Transaction;
  onRowClick: (id: string) => void;
}
export default function Row(props: RowProps) {
  const { column, row, onRowClick } = props;
  if (column.id === 'transactionStatus') {
    return <TransactionStatusBadge status={row.transactionStatus} />;
  }

  if (column.id) {
    const value = row[column.id];
    if (column.format) {
      return column.format(value as string);
    }
    return capitalize((value as string) || '');
  }

  return (
    <Button
      className="h-7 rounded-lg px-1 py-4 text-xs font-bold capitalize"
      variant="light-primary"
      onClick={() => onRowClick(row.transactionId)}
      text="View Details"
    />
  );
}
