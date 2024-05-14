'use client';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useUserProfile } from '@/services/queries/user';
import { activateWallet } from '@/services/clients/wallet';
import getErrorMessage from '@/utils/getErrorMessage';
import { useNotification } from '@/shared/Notification';
import { Wallet } from '@/types/user';
import Button from '@/shared/Form/Button';
import { Spinner } from '@/components/icons';
import ErrorIcon from '@/assets/icons/error.svg';
import WalletActivated from './wallet-activated';
import AccountDetails from './account-details';

let fetchUserDataInterval = 0;
let showWaitMessageTimeout = 0;

function Message({ message }: { message: string }) {
  return <p className="text-center text-sm text-secondary-400 sm:text-base">{message}</p>;
}

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

  const walletActivated = !!wallet.floatAccountNumber;

  const fetchUserDataAtInterval = () => {
    clearInterval(fetchUserDataInterval);

    fetchUserDataInterval = window.setInterval(() => {
      if (!walletActivated) {
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
      clearTimeout(showWaitMessageTimeout);
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

    if (business && walletActivated) {
      fetchUserDataAtInterval();
    }

    return () => {
      clearInterval(fetchUserDataInterval);
      clearTimeout(showWaitMessageTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [business, walletActivated]);

  return (
    <div className="grid place-items-center gap-3">
      {setupFailed ? (
        <Image alt="warning-icon" src={ErrorIcon} className="h-20 w-20" />
      ) : (
        <AccountBalanceWalletIcon className="size-24 text-primary-main" />
      )}

      <p className="text-center text-2xl font-bold sm:text-3xl">Hi, {business?.name}</p>

      {!walletActivated && !setupFailed && (
        <>
          <Message message="Give us a moment while we provision your bank account" />
          <Message message="Your account details will be shown below" />
        </>
      )}

      {walletActivated && <Message message="Here is your Katsu Account Details" />}

      {setupFailed && <Message message="We could not complete this process, please try again" />}

      <div
        className={`mt-5 w-full rounded-2xl border border-dotted border-primary-main/60 bg-primary-main/10 p-5 ${setupFailed && 'hidden'}`}
      >
        {walletActivated ? (
          <AccountDetails wallet={wallet as Wallet} businessName={business?.name ?? ''} />
        ) : (
          <div className="flex h-20 w-full items-center justify-center">
            <Spinner color="text-primary-main" className="h-7 w-7" />
          </div>
        )}
      </div>

      {!walletActivated && (
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
          className="-mt-10 w-full max-w-56"
        />
      )}

      {walletActivated && <WalletActivated />}
    </div>
  );
}
