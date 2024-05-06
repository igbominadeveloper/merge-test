import { APIResponse } from '@/types/general';
import { Beneficiary } from '@/types/transaction';
import apiHandler from '../api-handler';
import walletRoute from '../routes/wallet.route';

export const activateWallet = async (businessId: string) => {
  const { data } = await apiHandler.get<APIResponse<{ message: string }[]>>(
    walletRoute.activateWallet(businessId),
  );

  return data.data;
};

interface AccountBalance {
  availableBalance: number;
  balance: number;
}

interface AccountBalanceResponse {
  data: AccountBalance;
}

export const fetchUserAccountBalance = async () => {
  const { data } = await apiHandler.get<APIResponse<AccountBalanceResponse>>(
    walletRoute.accountBalance,
  );

  const balance = data.data.data;

  return balance;
};

export const fetchBeneficiaries = async (query?: string) => {
  const { data } = await apiHandler.get<APIResponse<Beneficiary[]>>(
    `${walletRoute.beneficiary}${query ? `?${query}` : ''}`,
  );

  return data.data;
};
