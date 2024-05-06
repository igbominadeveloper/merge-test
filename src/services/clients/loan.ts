import { APIResponse } from '@/types/general';
import { LoanHistoryType, LoanTransaction, ProductType } from '@/types/loan';
import apiHandler from '../api-handler';
import LoanRoutes from '../routes/loan.route';

const emptyTransactionResponse: LoanHistoryType = {
  currentPage: 1,
  perPageLimit: 10,
  results: [],
  totalPages: 0,
  nextPage: null,
  previousPage: null,
  totalRecords: 0,
};

export const fetchProductTypes = async () => {
  const { data } = await apiHandler.get<APIResponse<ProductType[]>>(LoanRoutes.productTypes);

  return data?.data;
};

export const fetchLoanHistory = async (query?: string) => {
  try {
    const { data } = await apiHandler.get<APIResponse<LoanHistoryType>>(
      `${LoanRoutes.loanHistory}${query ? `?${query}` : ''}`,
    );

    return data?.data;
  } catch (error) {
    return emptyTransactionResponse;
  }
};

export const fetchLoanDetails = async (id: string) => {
  const { data } = await apiHandler.get<APIResponse<LoanTransaction>>(
    `${LoanRoutes.loanDetails(id)}`,
  );

  return data?.data;
};
