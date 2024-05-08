import { APIResponse } from '@/types/general';
import {
  MetricsResponse,
  AllTransactions,
  RecentTransactions,
  SingleTransactions,
  Transaction,
} from '@/types/transaction';
import { ROUTES } from '@/utils/routes';
import getTransactionReceiptTemplate from '@/utils/getTransactionReceiptTemplate';
import apiHandler from '../api-handler';
import TransactionRoute from '../routes/transaction.route';

const emptyTransactionResponse: AllTransactions = {
  currentPage: 1,
  nextPage: 0,
  perPageLimit: 10,
  previousPage: 1,
  results: [],
  total: 0,
  totalPages: 0,
};

const filterByStatuses = 'filterByStatuses=PENDING,APPROVED,REVERSED';

export const fetchRecentTransactions = async () => {
  try {
    const { data } = await apiHandler.get<APIResponse<RecentTransactions>>(
      `${TransactionRoute.recentTransactions}?${filterByStatuses}`,
    );
    return data.data?.results ?? [];
  } catch (error) {
    return [];
  }
};

export const fetchAllTransactions = async (query?: string) => {
  try {
    const queryString = query ? `${query}&${filterByStatuses}` : filterByStatuses;
    const { data } = await apiHandler.get<APIResponse<AllTransactions>>(
      `${TransactionRoute.allWalletTransactions}?${queryString}`,
    );
    return data.data;
  } catch (error) {
    return emptyTransactionResponse;
  }
};

export const fetchTransaction = async (transactionId: string) => {
  const { data } = await apiHandler.get<APIResponse<SingleTransactions>>(
    `${TransactionRoute.singleTransaction(transactionId)}`,
  );

  return data.data.data[0];
};

export const fetchMetrics = async (dateFrom: string, dateTo: string) => {
  try {
    const { data } = await apiHandler.get<APIResponse<MetricsResponse>>(
      `${TransactionRoute.transactionMetrics(dateFrom, dateTo)}&${filterByStatuses}`,
    );

    return data.data.data;
  } catch (error) {
    return [];
  }
};

export const generateReceipt = async (transaction: Transaction) => {
  try {
    const template = getTransactionReceiptTemplate(transaction);

    const response = await fetch(`${ROUTES.Transactions}/api`, {
      method: 'POST',
      body: JSON.stringify({ template }),
    });

    if (response.ok) {
      const { data } = (await response.json()) as { data: Uint8Array; type: 'Buffer' };
      return data;
    }
    return null;
  } catch (error) {
    return null;
  }
};
