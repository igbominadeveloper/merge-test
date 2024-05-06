'use client';

import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import BackText from '@/shared/BackText';
import Button from '@/shared/Form/Button';
import { useNotification } from '@/shared/Notification';
import { UssdData } from '@/app/(dashboard)/fund-account/_component/types';
import { formatAmount } from '@/utils/helpers';

function ListItem({
  title,
  value,
  className = '',
}: {
  title: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <p className="text-base font-semibold sm:text-lg">{title}</p>
      <p className="text-sm font-normal text-secondary-400 sm:text-base">{value} </p>
    </div>
  );
}

function USSDCode({ onBack, ussdData }: { ussdData: UssdData; onBack: () => void }) {
  const { copyToClipboard } = useCopyToClipboard();
  const { onMessage } = useNotification();

  const ussdString = ussdData?.ussdString;
  const amount = ussdData?.amount || 0;
  const bankName = ussdData?.bankName;

  const handleCopyClick = () => {
    copyToClipboard(ussdString);
    onMessage('Dial code copied!');
  };

  return (
    <>
      <BackText text="Back" className="mb-4" onClick={onBack} />

      <div>
        <h3 className="mb-1 text-xl font-semibold sm:text-2xl">USSD Code</h3>
        <p className="text-sm text-secondary-400">
          Dial the code below to complete funding your account
        </p>
      </div>

      <div className="mt-10">
        <ListItem title="Bank:" value={bankName} />
        <hr className="mb-6 mt-3 w-full bg-disabled" />
        <ListItem title="Amount:" value={formatAmount(Number(amount))} />
      </div>

      <div className="mt-12 rounded-lg border border-dashed border-primary-main bg-[#e2effd] px-4 py-2 sm:px-6 sm:py-4">
        <p className="text-xl font-semibold text-primary-main sm:text-2xl">{ussdString}</p>

        <div className="mt-3 rounded-lg bg-primary-main bg-opacity-[48%] px-4 py-2 text-xs text-white sm:text-sm">
          *{bankName} short code*000*RefCode#
        </div>
      </div>

      <div className="mt-6 flex w-full flex-col-reverse items-center  gap-x-4 gap-y-3 sm:flex-row">
        <Button onClick={handleCopyClick} text="Copy code" variant="secondary" className="w-full" />

        <a href={`tel:${ussdString}`} className="btn-primary">
          Dial code
        </a>
      </div>
    </>
  );
}
export default USSDCode;
