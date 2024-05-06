/* eslint-disable no-nested-ternary */
import { useUserProfile } from '@/services/queries/user';
import { Transaction } from '@/types/transaction';
import { TRANSACTION_ICONS } from '@/utils/dashboardItems';
import getTransactionSenderOrReceiver from '@/utils/getTransactionSenderOrReceiver';
import { formatAmount, formatDateString } from '@/utils/helpers';
import Image from 'next/image';

interface Props {
  transaction: Transaction;
}

export default function TransactionListItem({ transaction }: Props) {
  const { data: user } = useUserProfile();
  const userAccountNumber = user?.businesses[0].wallet?.floatAccountNumber;

  return (
    <div className="mb-4 flex justify-between border-b border-dashed pb-4 last:mb-0 last:border-none">
      <div className="flex gap-[14px]">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-[#1977F21F]">
          <Image
            className="h-4 w-4"
            src={TRANSACTION_ICONS[transaction?.transactionType]}
            alt="Transaction icon type"
          />
        </div>
        <div>
          <p className="font-medium text-grey-800">
            {getTransactionSenderOrReceiver(transaction, userAccountNumber ?? '')}
          </p>
          <p className="mt-1 text-[12px] text-grey-900">
            {formatDateString(transaction?.createdDate)}
          </p>
        </div>
      </div>
      <p className="text-grey-800">
        {transaction?.transactionType === 'DEBIT' ? '-' : '+'}
        {formatAmount(transaction?.amount)}
      </p>
    </div>
  );
}
