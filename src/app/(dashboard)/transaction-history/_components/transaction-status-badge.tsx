import StatusBadge, { Status } from '@/components/Dashboard/status-badge';
import { TransactionStatus, TransactionStatusEnum } from '@/types/transaction';

interface Props {
  status: TransactionStatus;
}

const statuses: Record<TransactionStatus, Status> = {
  [TransactionStatusEnum.SUCCESS]: 'success',
  [TransactionStatusEnum.APPROVED]: 'success',
  [TransactionStatusEnum.REJECTED]: 'danger',
  [TransactionStatusEnum.PENDING]: 'warning',
  [TransactionStatusEnum.FAILED]: 'danger',
};

export default function TransactionStatusBadge({ status }: Props) {
  return <StatusBadge theme={statuses[status]} status={status} />;
}
