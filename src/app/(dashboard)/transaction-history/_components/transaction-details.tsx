import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Drawer, Skeleton } from '@mui/material';
import PageTitle from '@/components/Dashboard/PageTitle';
import Button from '@/shared/Form/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { formatAmount, formatDateString } from '@/utils/helpers';
import { useTransaction } from '@/services/queries/transaction';
import { Transaction } from '@/types/transaction';
import { ROUTES } from '@/utils/routes';
import { generateReceipt } from '@/services/clients/transaction';
import TransactionStatusBadge from './transaction-status-badge';

interface LineItemProps {
  title: string;
  value: string;
  isLoading: boolean;
  children?: React.ReactNode;
}

function LineItem(props: LineItemProps) {
  const { title, value, children, isLoading } = props;

  return (
    <article className="flex items-center justify-between border-b border-b-primary-900 py-2 last-of-type:border-0">
      <h1 className="font-bold">{title}:</h1>
      <div className="max-w-[240px] text-right">
        {isLoading ? (
          <Skeleton
            animation="wave"
            className="w-[15ch]"
            variant="text"
            sx={{ fontSize: '12px' }}
          />
        ) : (
          children || <p className="capitalize">{value || '-'}</p>
        )}
      </div>
    </article>
  );
}

const supportEmail = 'info@katsu.com';
const supportPhoneNumber = '+234-02257681';

interface Props {
  transaction: Transaction;
  isLoading: boolean;
  isGeneratingReceipt: boolean;
  downloadReceipt: () => void;
  onClose: () => void;
}

function TransactionContent(props: Omit<Props, 'open'>) {
  const { isLoading, transaction, isGeneratingReceipt, downloadReceipt, onClose } = props;

  return (
    <div className="flex flex-col gap-10 p-5 lg:p-10">
      <section className="sticky top-0 flex w-full flex-col gap-2 bg-white py-3 md:static">
        <PageTitle title="Transaction Details" />
        <div className="my-2 flex items-center gap-2 text-primary-main lg:hidden" onClick={onClose}>
          <ArrowBackIcon className=" size-6" />
          Back
        </div>
        <p className="text-gray-900">Your transaction receipt</p>
      </section>

      <section className="flex flex-col gap-4">
        <LineItem
          isLoading={isLoading}
          title="Receiver Name"
          value={transaction?.receiverDetail?.accountName as string}
        />
        <LineItem isLoading={isLoading} title="Amount" value={formatAmount(transaction?.amount)} />
        <LineItem
          isLoading={isLoading}
          title="Transaction Date"
          value={formatDateString(transaction?.createdDate)}
        />
        <LineItem
          isLoading={isLoading}
          title="Receiver Number"
          value={transaction?.receiverDetail?.accountNumber}
        />
        <LineItem
          isLoading={isLoading}
          title="Receiver Bank"
          value={transaction?.receiverDetail?.bankName as string}
        />
        <LineItem
          isLoading={isLoading}
          title="Transaction Type"
          value={transaction?.transactionType}
        />
        <LineItem
          isLoading={isLoading}
          title="Sender Name"
          value={transaction?.senderDetail?.accountName as string}
        />

        <LineItem
          isLoading={isLoading}
          title="Sender Bank"
          value={transaction?.senderDetail?.bankName as string}
        />
        <LineItem isLoading={isLoading} title="Narration" value={transaction?.narration ?? ''} />
        {/* TODO: request for the values from the backend */}
        {/* <LineItem 
        isLoading={isLoading}
        title="Transaction charge" value={transaction?.transactionType} /> */}
        {/* <LineItem 
        isLoading={isLoading}
        title="VAT" value={formatAmount(transaction?.amount)} /> */}
        <LineItem isLoading={isLoading} title="Status" value={transaction?.transactionStatus}>
          <TransactionStatusBadge status={transaction?.transactionStatus} />
        </LineItem>
        <LineItem isLoading={isLoading} title="Transaction ID" value={transaction?.transactionId} />
        <LineItem isLoading={isLoading} title="Session ID" value={transaction?.referenceId} />
      </section>

      <section className="border-t border-t-primary-900 pt-4">
        <h1 className="text-lg font-bold">Got a complaint?</h1>
        <p className="mt-2 max-w-[35ch]">
          Contact Katsu support at{' '}
          <a className="text-primary-main underline" href={`mailto:${supportEmail}`}>
            {supportEmail}
          </a>{' '}
          or{' '}
          <a className="text-primary-main underline" href={`tel:${supportPhoneNumber}`}>
            {supportPhoneNumber}
          </a>
        </p>
      </section>

      {transaction && (
        <section className="mt-10 flex flex-col gap-3 lg:flex-row-reverse lg:gap-6">
          <Button
            text="Download Receipt"
            type="button"
            isLoading={isGeneratingReceipt}
            handleClick={downloadReceipt}
            className="w-full rounded-lg text-[15px] font-bold"
          />
          <Button
            text="Close"
            type="button"
            variant="secondary"
            disabled={isGeneratingReceipt}
            handleClick={onClose}
            className="w-full rounded-lg bg-gray-700/10 text-[15px] font-bold text-black"
          />
        </section>
      )}
    </div>
  );
}

export default function TransactionDetails() {
  const searchParams = useSearchParams();
  const [isGeneratingReceipt, setIsGeneratingReceipt] = useState(false);
  const transactionID = searchParams.get('transactionID');
  const { data: transaction, isFetching, isLoading } = useTransaction(transactionID ?? '');
  const router = useRouter();

  const onClose = () => {
    if (isGeneratingReceipt) return;

    router.push(`${ROUTES.Transactions}`);
  };

  const downloadReceipt = async () => {
    if (!transaction) return;
    setIsGeneratingReceipt(true);

    try {
      const receiptBuffer = await generateReceipt(transaction);
      if (!receiptBuffer) return;

      const pngBlob = new Blob([new Uint8Array(receiptBuffer!)], { type: 'image/png' });
      const url = URL.createObjectURL(pngBlob);

      // Trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `katsu-receipt-${Date.now()}`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error, 'generate receipt error');
    } finally {
      setIsGeneratingReceipt(false);
    }
  };

  const refresh = () => {
    window.location.reload();
  };

  return (
    <Drawer
      anchor="right"
      keepMounted
      open={!!transactionID}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: '100%', md: 500 } } }}
    >
      {!isFetching && !isLoading && !transaction ? (
        <div className="mt-10 flex flex-col gap-2 px-5">
          <PageTitle title="An error occured" />
          <p className="text-gray-600">Please try again </p>

          <div className="mt-10 flex items-center gap-3">
            <Button
              text="Close"
              type="button"
              variant="secondary"
              handleClick={onClose}
              className="w-full"
            />
            <Button text="Refresh" className="w-full" onClick={refresh} />
          </div>
        </div>
      ) : (
        <TransactionContent
          isLoading={isLoading || isFetching}
          transaction={transaction!}
          onClose={onClose}
          downloadReceipt={downloadReceipt}
          isGeneratingReceipt={isGeneratingReceipt}
        />
      )}
    </Drawer>
  );
}
