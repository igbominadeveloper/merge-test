import { useUserProfile } from '@/services/queries/user';
import Button from '@/shared/Form/Button';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import { useNotification } from '@/shared/Notification';
import AccountItem from './account-item';

function BankTransfer() {
  const { data: userInfo } = useUserProfile();

  const businessAccount = userInfo?.businesses?.at(0);

  const walletDetails = businessAccount?.wallet;
  const accountNumber = walletDetails?.floatAccountNumber || '';
  const accountName = businessAccount?.name || '';
  const bankName = walletDetails?.virtualBankName || '';

  const { copyToClipboard } = useCopyToClipboard();
  const { onMessage } = useNotification();

  const handleCopyClick = () => {
    const copyText = `
      ${accountName}
      ${accountNumber}
      ${bankName}
    `;
    copyToClipboard(copyText);
    onMessage('Bank details copied!');
  };

  return (
    <div className="flex w-full max-w-[480px] flex-col space-y-6">
      <div>
        <h3 className="mb-1 text-xl font-semibold sm:text-2xl">Bank Transfer</h3>
        <p className="text-sm text-secondary-400">
          Use the details below to send money to your Katsu account from any bank app or internet
          banking.
        </p>
      </div>

      <hr className="w-full  bg-[#919EAB33]" />

      <div className="flex flex-col space-y-6">
        <AccountItem key="name" title="Account Name" value={accountName} />
        <AccountItem key={accountNumber} title="Account number" value={accountNumber} />
        <AccountItem key={bankName} title="Bank name" value={bankName} />
      </div>
      <div className="pt-4">
        <Button
          className="w-full rounded-lg !bg-primary-100 text-center text-xs font-semibold !text-primary-main md:text-base"
          text="Copy details"
          onClick={handleCopyClick}
          type="button"
        />
      </div>
    </div>
  );
}
export default BankTransfer;
