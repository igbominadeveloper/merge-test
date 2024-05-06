import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getQueryClient } from '@/providers/queryclient';
import { fetchLoanDetails, fetchLoanHistory, fetchProductTypes } from '../clients/loan';

export const prefetchProductTypes = () => {
  const queryKey = ['loan-product-types'];
  const queryClient = getQueryClient();

  return queryClient.prefetchQuery({
    queryKey,
    queryFn: fetchProductTypes,
  });
};

export const useFetchProductTypes = () => {
  const queryKey = ['loan-product-types'];

  return useQuery({
    queryKey,
    queryFn: fetchProductTypes,
  });
};

export const useLoanTransactions = (query?: string) => {
  const queryKey = ['loan-transactions', query];
  const queryClient = useQueryClient();

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await fetchLoanHistory(query);
      response.results.forEach(loan => {
        queryClient.setQueryData(['loan-transaction', loan._id], loan);
      });

      return response;
    },
  });
};

export const useLoanTransaction = (id: string) => {
  const queryKey = ['loan-transaction', id];

  return useQuery({
    queryKey,
    queryFn: () => fetchLoanDetails(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};
