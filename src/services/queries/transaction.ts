import { useQuery, useQueryClient } from '@tanstack/react-query';
import useKYCKYBVerification from '@/hooks/useKYCKYBVerification';
import { Transaction } from '@/types/transaction';
import {
  fetchRecentTransactions,
  fetchMetrics,
  fetchAllTransactions,
  fetchTransaction,
} from '../clients/transaction';

export const useRecentTransactions = () => {
  const { isVerified, walletCreated } = useKYCKYBVerification();
  const queryKey = ['recent-transactions'];

  return useQuery({
    queryKey,
    queryFn: fetchRecentTransactions,
    enabled: isVerified || walletCreated,
  });
};

export const useTransactionMetrics = (dateFrom: string, dateTo: string) => {
  const { isVerified, walletCreated } = useKYCKYBVerification();
  const queryKey = ['transactionMetrics'];

  return useQuery({
    queryKey,
    queryFn: () => fetchMetrics(dateFrom, dateTo),
    enabled: isVerified || walletCreated,
  });
};

const katsuMFB = 'Katsu MFB';

const mappedTransaction = (transaction: Transaction) => ({
  ...transaction,
  senderDetail: {
    ...transaction.senderDetail,
    bankName: transaction?.senderDetail?.bankName ?? katsuMFB,
  },
  receiverDetail: {
    ...transaction.receiverDetail,
    bankName: transaction?.receiverDetail?.bankName ?? katsuMFB,
  },
});

export const useAllTransactions = (query = '') => {
  const { isVerified, walletCreated } = useKYCKYBVerification();
  const queryKey = ['transactions', query];
  const queryClient = useQueryClient();

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await fetchAllTransactions(query);
      response.results.forEach(transaction => {
        queryClient.setQueryData(
          ['transaction', transaction.transactionId],
          mappedTransaction(transaction),
        );
      });

      return response;
    },
    enabled: isVerified || walletCreated,
  });
};

export const useTransaction = (transactionId: string) => {
  const queryKey = ['transaction', transactionId];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await fetchTransaction(transactionId);
      return mappedTransaction(response);
    },
    enabled: !!transactionId,
    retry: 5,
    refetchOnWindowFocus: false,
  });
};
