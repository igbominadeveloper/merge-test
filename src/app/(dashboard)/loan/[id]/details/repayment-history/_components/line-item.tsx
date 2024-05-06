import dayjs from 'dayjs';
import StatusBadge from '@/components/Dashboard/status-badge';
import { formatAmount, formatDateString } from '@/utils/helpers';

interface Props {
  date: string;
  amount: number;
  status: 'paid' | 'pending';
}

export default function LineItem(props: Props) {
  const { amount, date, status } = props;

  return (
    <div className="group grid h-[70px] grid-cols-3 items-center gap-20">
      <p>{dayjs(date).format('MMMM')}</p>

      <div className="flex h-full items-center gap-6 pt-3">
        <div className="flex h-full flex-col items-center justify-between gap-2 pt-1">
          <div
            className={`size-3 rounded-full border-2 border-primary-main ${status === 'paid' && 'bg-primary-main'}`}
          />
          <div className="w-0.5 flex-1 bg-gray-200 group-last:hidden" />
        </div>

        <div className="flex h-full flex-col">
          <p>{formatAmount(amount)}</p>
          <p className="h-full text-sm text-gray-400">
            {formatDateString(new Date().toISOString())}
          </p>
        </div>
      </div>

      <div>
        <StatusBadge status={status} theme={status === 'paid' ? 'success' : 'warning'} />
      </div>
    </div>
  );
}
