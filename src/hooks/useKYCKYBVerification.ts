import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  VerificationID,
  useVerificationStore,
  useVerifyBusinessChecklist,
  useVerifyOwnerChecklist,
} from '@/store/state/useVerifyStore';
import { DASHBOARD_ROUTES, ROUTES } from '@/utils/routes';
import { useUserProfile } from '@/services/queries/user';

const dashboardPathMap = new Map<string, string>([
  [ROUTES.AccountManagement, 'Account Management'],
  [ROUTES.FundAccount, 'Fund Account'],
  [ROUTES.Transactions, 'Transaction History'],
  [ROUTES.Transfer, 'Transfer'],
  [ROUTES.Loan, 'Loan'],
]);

export default function useKYCKYBVerification() {
  const [showKYCModal, setShowKYCModal] = useState(false);
  const { isVerified, setVerified } = useVerificationStore();
  const { data: userProfile, isFetching } = useUserProfile();
  const pathname = usePathname();

  const { verifyOwnerChecklist, updateVerifyOwnerChecklist } = useVerifyOwnerChecklist();
  const { verifyBusinessChecklist, updateVerifyBusinessChecklist } = useVerifyBusinessChecklist();
  const totalSteps = verifyOwnerChecklist.length + verifyBusinessChecklist.length;
  const kycStepsCompleted = verifyOwnerChecklist.filter(step => step.completed).length;
  const kybStepsCompleted = verifyBusinessChecklist.filter(step => step.completed).length;
  const percentageCompleted = ((kycStepsCompleted + kybStepsCompleted) * 100) / totalSteps;

  const currentRootPath = pathname.split('/').at(1);
  const currentRootPathName = `/${currentRootPath}` ?? '/';
  const currentRouteTitle = dashboardPathMap.get(currentRootPathName);

  const { phoneVerified, bvnVerified, ninVerified, identityDoc, businesses } = userProfile ?? {};
  const bankingBusiness = businesses?.find(business => business.type === 'BANKING');
  const kycDetails = bankingBusiness?.kycDetails;
  const wallet = bankingBusiness?.wallet;

  useEffect(() => {
    if (isFetching || !userProfile) return;
    const getKYCProperties = () => {
      return {
        phone: !!phoneVerified,
        bvn: !!bvnVerified,
        nin: !!ninVerified,
        'id-document': !!identityDoc,
        'business-reg-document': !!kycDetails?.businessDetails.certificateOfIncorporation,
        'proof-of-business-address': !!kycDetails?.businessDetails.proofOfBusinessAddress,
      } satisfies Record<VerificationID, boolean>;
    };

    const updates = getKYCProperties();
    const ownerChecklist = verifyOwnerChecklist.map(item => {
      if (updates[item.id]) {
        return { ...item, completed: true };
      }
      return { ...item, completed: false };
    });
    const businessChecklist = verifyBusinessChecklist.map(item => {
      if (updates[item.id]) {
        return { ...item, completed: true };
      }
      return { ...item, completed: false };
    });

    updateVerifyOwnerChecklist(ownerChecklist);
    updateVerifyBusinessChecklist(businessChecklist);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile, isFetching]);

  useEffect(() => {
    if (percentageCompleted === 100) {
      setVerified(true);
    }
  }, [percentageCompleted, setVerified]);

  useEffect(() => {
    if (!DASHBOARD_ROUTES.includes(currentRootPathName)) {
      setShowKYCModal(false);
      return;
    }

    if ((userProfile && !isVerified) || !(wallet && wallet.floatAccountNumber)) {
      setShowKYCModal(true);
    }

    return () => {
      setShowKYCModal(false);
    };
  }, [isVerified, currentRootPathName, userProfile, wallet]);

  return {
    progress: percentageCompleted,
    showKYCModal,
    isVerified,
    currentRouteTitle,
    walletCreated: !!wallet?.floatAccountNumber,
  };
}
