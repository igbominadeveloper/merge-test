/* eslint-disable import/no-extraneous-dependencies */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TRANSACTION_ICONS, quickActionsItems } from '@/utils/dashboardItems';
import DashboardAd from '@/assets/dashboard-ad.png';
import ModalComponent from '@/shared/Modal';
import Button from '@/shared/Form/FormSubcomponent/Button';
import { PillTextIcon } from '@/components/Dashboard/PillTextIcon';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import { useUserProfile } from '@/services/queries/user';
import useKYCKYBVerification from '@/hooks/useKYCKYBVerification';
import TransactionOverview from './TxnSectionViews';
import AccountVerification from './AccountVerification';
import PageTitle from './PageTitle';
import Balance from './balance';

export default function Dashboard() {
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const { data: user } = useUserProfile();
  const { isVerified } = useKYCKYBVerification();
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const business = user?.businesses.find(userBusiness => userBusiness.type === 'BANKING');
  const wallet = business?.wallet;
  const walletAccountCreated = !!wallet?.floatAccountNumber;

  const accountDetails = {
    accountNumber: wallet?.floatAccountNumber,
    accountName: business?.name,
    bank: wallet?.virtualBankName ?? 'Wema Bank',
  };

  const handleCopy = () => {
    const account = `
    Account Number: ${accountDetails.accountNumber}
    Account Name: ${accountDetails.accountName}
    Bank: ${accountDetails.bank}`;
    copyToClipboard(account);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <PageTitle title={`Welcome, ${business?.name} 👋🏽`} />
      </div>
      {(!isVerified || !walletAccountCreated) && (
        <AccountVerification path={isVerified ? '/wallet/setup' : '/verify'} />
      )}
      {wallet?.floatAccountNumber && (
        <div onClick={() => setShowAccountDetails(true)} className="w-fit cursor-pointer">
          <p className="text-xs font-semibold leading-6 text-primary-main underline underline-offset-2 opacity-85 hover:opacity-100 md:text-base">
            View account details
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-7 md:gap-6">
        <Balance />
        <div className="col-span-4 flex w-full flex-col justify-between rounded-2xl bg-white p-6 md:h-[140px]">
          <h6 className="mb-3 text-lg font-bold md:mb-0">Quick Actions</h6>
          <div className="grid grid-cols-1 justify-between gap-6 md:grid-cols-3">
            {quickActionsItems.map(({ name, type, href, opensInNewTab }) => (
              <PillTextIcon
                href={href}
                key={name}
                text={name}
                icon={TRANSACTION_ICONS[type]}
                opensInNewTab={opensInNewTab}
              />
            ))}
          </div>
        </div>
      </div>
      <TransactionOverview />
      <div className="flex h-[133px] w-full overflow-hidden rounded-lg md:h-[158px]">
        <Image className="h-full w-full" src={DashboardAd} alt="ad image" />
      </div>
      {showAccountDetails && (
        <ModalComponent
          evenPadding
          open={showAccountDetails}
          onClose={() => setShowAccountDetails(false)}
        >
          <p className="text-h4 mb-6 text-center text-xl font-semibold text-[#01828]">
            Account Details
          </p>
          <div className="grid gap-4 p-[8.5px]">
            <div className="border-[rgba(145, 158, 171, 0.20)] flex h-11 items-center justify-between border-b">
              <h6 className="text-sm font-bold md:text-lg">Account Number:</h6>
              <p className="text-sm text-grey-900 md:text-lg">{accountDetails.accountNumber}</p>
            </div>
            <div className="border-[rgba(145, 158, 171, 0.20)] flex h-11 items-center justify-between border-b">
              <h6 className="text-sm font-bold md:text-lg">Account Name:</h6>
              <p className="text-sm text-grey-900 md:text-lg">{accountDetails.accountName}</p>
            </div>
            <div className="border-[rgba(145, 158, 171, 0.20)] flex h-11 items-center justify-between border-b">
              <h6 className="text-sm font-bold md:text-lg">Bank:</h6>
              <p className="text-sm text-grey-900 md:text-lg">{accountDetails.bank}</p>
            </div>
          </div>
          <div className="mt-9 grid w-[300px] grid-cols-2 gap-3 md:w-[432px]">
            <Button
              className="h-[48px] basis-[150px] justify-center rounded-lg bg-[#919EAB]/[0.08] px-6 text-xs font-bold text-grey-800 md:text-base"
              text="Close"
              type="button"
              handleClick={() => setShowAccountDetails(false)}
            />
            <Button
              className="h-[48px] grow basis-[150px] justify-center rounded-lg border border-primary-main bg-primary-main px-6 text-xs font-bold text-white md:text-base"
              text={isCopied ? 'Copied' : 'Copy details'}
              type="button"
              handleClick={handleCopy}
            />
          </div>
        </ModalComponent>
      )}
    </div>
  );
}
