import { Transaction } from '@/types/transaction';

export default function getTransactionSenderOrReceiver(
  item: Transaction,
  userAccountNumber: string,
) {
  if (item.transactionType === 'DEBIT') {
    return item?.receiverDetail?.accountName || 'N/A';
  }

  if (item.transactionType === 'CREDIT') {
    const sender = item?.senderDetail;
    // for personal deposits, there won't be the sender object
    if (!sender && item?.receiverDetail?.accountNumber === userAccountNumber) {
      // then it is a user deposit, use the receiver name
      return item?.receiverDetail?.accountName;
    }

    return sender?.accountName || 'N/A';
  }
}
