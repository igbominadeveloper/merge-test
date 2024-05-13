import { Wallet } from '@/types/user';
import { Skeleton } from '@mui/material';

interface LineItemProps {
  title: string;
  value?: string | null;
  activated: boolean;
}
function LineItem(props: LineItemProps) {
  const { title, value = '', activated } = props;

  return (
    <div className="mt-2 flex justify-between">
      <p className="font-[300]">{title}:</p>
      {activated && value ? (
        <p className="font-[300]">{value}</p>
      ) : (
        <Skeleton animation="wave" className="w-[25ch]" variant="text" sx={{ fontSize: '14px' }} />
      )}
    </div>
  );
}

interface Props {
  wallet: Wallet;
  businessName: string;
}
export default function AccountDetails(props: Props) {
  const { businessName, wallet } = props;
  const walletActivated = !!wallet?.floatAccountNumber;

  return (
    <>
      <p className="mb-2 text-[18px] font-bold">Account Details</p>
      <LineItem activated={walletActivated} title="Account Name" value={businessName} />
      <LineItem
        activated={walletActivated}
        title="Account Number"
        value={wallet.floatAccountNumber}
      />
      <LineItem
        activated={walletActivated}
        title="Bank Name"
        value={wallet.virtualBankName ?? 'Wema Bank'}
      />
    </>
  );
}
