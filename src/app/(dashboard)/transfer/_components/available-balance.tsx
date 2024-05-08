import { Stack, Typography } from '@mui/material';
import { formatAmount } from '@/utils/helpers';
import { AccountBalance } from '@/services/clients/wallet';

interface Props {
  accountBalance?: AccountBalance;
}
export default function AvailableBalance({ accountBalance }: Props) {
  return (
    <Stack direction="row" alignItems="center" gap="10px">
      <Typography className="font-primary text-base text-secondary-400" component="h1">
        Available balance:
      </Typography>
      <Typography
        component="p"
        className="rounded-md bg-success-100 px-[5px] py-1 font-primary font-bold text-gray-800"
      >
        {formatAmount(accountBalance?.availableBalance)}
      </Typography>
    </Stack>
  );
}
