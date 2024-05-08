import { Column, TypeOrNull } from '@/types/general';
import Button from '@/shared/Form/Button';
import { capitalize } from '@mui/material';
import TransactionStatusBadge from '@/components/Dashboard/transaction-history/TransactionStatusBadge';
import { Transaction, TransactionType, TransactionTypeEnum } from '@/types/transaction';

interface RowProps {
  column: Column<Transaction>;
  row: Transaction;
  transactionTypeFilter: TypeOrNull<TransactionType>;
  onRowClick: (id: string) => void;
}
export default function Row(props: RowProps) {
  const { column, row, transactionTypeFilter, onRowClick } = props;
  if (column.id === 'transactionStatus') {
    return <TransactionStatusBadge status={row.transactionStatus} />;
  }

  if (column.id) {
    let value = row[column.id];

    // when the transaction filter is on 'All', the transactiontype filter === null
    // we defaulted the value to 'receiverDetail' but to render the right value, we need to check the transactionstatus to know if it's a credit/debit and then we can check the right value

    if (column.id === 'receiverDetail' && transactionTypeFilter === null) {
      const isCredit = row.transactionType === TransactionTypeEnum.CREDIT;

      if (isCredit) {
        // the value to display is the sender
        value = row.senderDetail;
      } else {
        // the value to display is the receiver
        value = row.receiverDetail;
      }
    }

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
