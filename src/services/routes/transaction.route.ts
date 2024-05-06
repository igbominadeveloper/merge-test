import { baseUrl } from '.';

const TransactionRoute = {
  createPin: `${baseUrl}/users/transactions/pin`,
  verifyTransactionPin: (token: string) => `${baseUrl}/transactions/pin/${token}/verify`,
  recentTransactions: `${baseUrl}/accounts/transactions/recent`,
  allWalletTransactions: `${baseUrl}/transactions`,
  singleTransaction: (transactionId: string) => `${baseUrl}/transactions/${transactionId}`,
  transactionMetrics: (dateFrom: string, dateTo: string) =>
    `${baseUrl}/accounts/transactions/metrics?from=${dateFrom}&to=${dateTo}`,
};

export default TransactionRoute;
