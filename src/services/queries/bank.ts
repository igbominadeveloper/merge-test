import { useQuery } from '@tanstack/react-query';
import { getQueryClient } from '@/providers/queryclient';
import { fetchBanks, fetchBanksUSSD } from '../clients/bank';

export const prefetchBanks = () => {
  const queryKey = ['banks'];
  const queryClient = getQueryClient();

  return queryClient.prefetchQuery({
    queryKey,
    queryFn: fetchBanks,
  });
};

export const useBanks = () => {
  const queryKey = ['banks'];

  return useQuery({
    queryKey,
    queryFn: fetchBanks,
  });
};
export const useBanksUSSD = () => {
  const queryKey = ['banksUSSD'];

  return useQuery({
    queryKey,
    queryFn: fetchBanksUSSD,
  });
};
