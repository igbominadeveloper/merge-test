import { Skeleton } from '@mui/material';
import { ROUTES } from '@/utils/routes';
import Link from 'next/link';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useRecentTransactions } from '@/services/queries/transaction';
import TransactionListItem from './transaction-list-item';

function RecentTransaction({ className = '' }: { className?: string }) {
  const { data: transactions, isLoading } = useRecentTransactions();

  return (
    <div
      className={`flex h-full w-full flex-col rounded-lg bg-white p-6  md:col-span-3 md:p-3 lg:p-6 ${className}`}
    >
      <div className="mb-8 flex items-center justify-between">
        <h6 className="text-lg font-bold">Recent Transactions</h6>
        <Link
          href={ROUTES.Transactions}
          className="group flex items-center font-medium text-primary-main/85 hover:text-primary-main/100"
        >
          See all
          <ArrowForwardIosRoundedIcon className="ml-0.5 size-5 transition-all duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* eslint-disable-next-line no-nested-ternary */}
      {isLoading ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full text-xs" />
          <Skeleton className="w-[80%] text-xs" />
          <Skeleton className="w-[50%] text-xs" />
        </div>
      ) : transactions?.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-center">
          No recent transactions.
        </div>
      ) : (
        transactions
          ?.slice(0, 4)
          .map(item => <TransactionListItem key={item.id} transaction={item} />)
      )}
    </div>
  );
}

export default RecentTransaction;
