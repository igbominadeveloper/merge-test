'use client';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useUserProfile } from '@/services/queries/user';
import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { activateWallet } from '@/services/clients/wallet';
import getErrorMessage from '@/utils/getErrorMessage';
import { useNotification } from '@/shared/Notification';
import Button from '@/shared/Form/Button';
import Link from 'next/link';

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

let fetchUserDataInterval = 0;
let showWaitMessageTimeout = 0;

export default function AccountSetup() {
  const { onMessage } = useNotification();
  const [activating, setActivatingWallet] = useState(false);
  const [setupFailed, setSetupFailedState] = useState(false);
  const { data: user, refetch } = useUserProfile();
  const business = user?.businesses.find(userBusiness => userBusiness.type === 'BANKING');
  const [showWaitMessage, setShowWaitMessage] = useState(false);

  const wallet = business?.wallet ?? {
    userId: null,
    floatAccountId: null,
    floatAccountUuid: null,
    floatAccountNumber: null,
    commissionAccountId: null,
    commissionAccountUuid: null,
    commissionAccountNumber: null,
    virtualBankCode: null,
    virtualBankName: null,
  };

  const walletActivated = !!wallet.userId;
  const accountProvisioned = !!wallet.floatAccountNumber;

  const fetchUserDataAtInterval = () => {
    clearInterval(fetchUserDataInterval);

    fetchUserDataInterval = window.setInterval(() => {
      if (!accountProvisioned) {
        refetch();
      } else {
        clearInterval(fetchUserDataInterval);
        setShowWaitMessage(false);
      }
    }, 3000);
  };

  const activateBusinessWallet = async () => {
    if (!business) throw new Error('Cannot activate a wallet without the business');

    setActivatingWallet(true);
    setSetupFailedState(false);
    try {
      await activateWallet(business?._id);
      await refetch();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      onMessage(errorMessage);
      setSetupFailedState(true);
    } finally {
      setActivatingWallet(false);
    }
  };

  useEffect(() => {
    if (business && !walletActivated) {
      activateBusinessWallet();
      showWaitMessageTimeout = window.setTimeout(() => {
        setShowWaitMessage(true);
      }, 10000);
      return;
    }

    if (business && walletActivated && !accountProvisioned) {
      fetchUserDataAtInterval();
    }

    return () => {
      clearInterval(fetchUserDataInterval);
      clearTimeout(showWaitMessageTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [business, walletActivated, accountProvisioned]);

  return (
    <div className="grid place-items-center gap-3">
      <AccountBalanceWalletIcon className="size-24 text-primary-main" />

      <p className="text-center text-2xl font-bold sm:text-3xl">Hi, {business?.name}</p>

      {!accountProvisioned && (
        <>
          <p className="text-center text-sm text-secondary-400 sm:text-base">
            Give us a moment while we provision your bank account
          </p>
          <p className="text-center text-sm text-secondary-400 sm:text-base">
            Your account details will be showed below
          </p>
        </>
      )}

      {accountProvisioned && (
        <p className="text-center text-sm text-secondary-400 sm:text-base">
          Here is your Katsu Account Details
        </p>
      )}

      <div className="mt-5 w-full rounded-2xl border border-dotted border-primary-main/60 bg-primary-main/10 p-5">
        <p className="mb-2 text-[18px] font-bold">Account Details</p>
        <LineItem activated={accountProvisioned} title="Account Name" value={business?.name} />
        <LineItem
          activated={accountProvisioned}
          title="Account Number"
          value={wallet.floatAccountNumber}
        />
        <LineItem
          activated={accountProvisioned}
          title="Bank Name"
          value={wallet.virtualBankName ?? 'Wema Bank'}
        />
      </div>

      {!accountProvisioned && (
        <p
          className={`mt-4 animate-pulse text-base text-secondary-400 transition-all duration-300 ${showWaitMessage ? 'visible opacity-100' : 'invisible opacity-0'}`}
        >
          This is taking longer than expected, Please bear with us{' '}
          <span className="text-lg">🤗</span>
        </p>
      )}

      {setupFailed && (
        <Button
          text="Retry"
          isLoading={activating}
          onClick={activateBusinessWallet}
          className="w-full"
        />
      )}

      {accountProvisioned && (
        <>
          <p className="text-center text-sm text-secondary-400 sm:text-base">
            {`Now, let's set up your PIN`}
          </p>

          <Link className="btn-primary w-full" href="/wallet/create-pin">
            Set up PIN
          </Link>
        </>
      )}
    </div>
  );
}
