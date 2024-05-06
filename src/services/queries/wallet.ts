import { useQuery } from '@tanstack/react-query';
import { getQueryClient } from '@/providers/queryclient';
import useKYCKYBVerification from '@/hooks/useKYCKYBVerification';
import { fetchBeneficiaries, fetchUserAccountBalance } from '../clients/wallet';
import { useUserProfile } from './user';

export const prefetchKatsuBeneficiaries = () => {
  const type = 'beneficiaryType=WALLET';
  const queryKey = ['beneficiaries', type];

  const queryClient = getQueryClient();

  return queryClient.prefetchQuery({
    queryKey,
    queryFn: () => fetchBeneficiaries(type),
  });
};

export const prefetchBankBeneficiaries = () => {
  const type = 'beneficiaryType=BANK';
  const queryKey = ['beneficiaries', type];

  const queryClient = getQueryClient();

  return queryClient.prefetchQuery({
    queryKey,
    queryFn: () => fetchBeneficiaries(type),
  });
};

export const useBeneficiaries = (query?: string) => {
  const { data: user } = useUserProfile();
  const businessName = user?.businesses?.at(0)?.name;

  return useQuery({
    queryKey: ['beneficiaries', query, businessName],
    queryFn: async () => {
      const data = await fetchBeneficiaries(query);
      return (
        data
          ?.filter(item => `${item?.firstName} ${item?.lastName}` !== businessName)
          ?.map(ben => ({ ...ben, bankName: ben?.bankName ? ben?.bankName : 'KATSU' })) || []
      );
    },
    enabled: true,
  });
};

export const useAccountBalance = () => {
  const { isVerified, walletCreated } = useKYCKYBVerification();
  const queryKey = ['userAccountBalance'];

  return useQuery({
    queryKey,
    queryFn: fetchUserAccountBalance,
    enabled: isVerified || walletCreated,
    refetchInterval: 50000,
  });
};
