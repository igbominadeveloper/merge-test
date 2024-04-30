import { APIResponse } from '@/types/general';
import { AccountStatementPayload, Beneficiary } from '@/types/transaction';
import { ROUTES } from '@/utils/routes';
import getErrorMessage from '@/utils/getErrorMessage';
import apiHandler from '../api-handler';
import walletRoute from '../routes/wallet.route';

export const activateWallet = async (businessId: string) => {
  const { data } = await apiHandler.get<APIResponse<{ message: string }[]>>(
    walletRoute.activateWallet(businessId),
  );

  return data.data;
};

export interface AccountBalance {
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

export const generateAccountStatement = async (
  accountStatementPayload: AccountStatementPayload,
) => {
  try {
    const response = await fetch(`${ROUTES.Transactions}/account-statement/api`, {
      method: 'POST',
      body: JSON.stringify(accountStatementPayload),
    });

    if (response.ok) {
      const { data } = (await response.json()) as { data: Uint8Array; type: 'Buffer' };
      return data;
    }
    return [];
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.log(errorMessage);
  }
};
