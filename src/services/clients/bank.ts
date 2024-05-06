import { APIResponse } from '@/types/general';
import { Bank, USSD } from '@/types/transaction';
import apiHandler from '../api-handler';
import walletRoute from '../routes/wallet.route';

export const fetchBanks = async () => {
  const { data } = await apiHandler.get<APIResponse<Bank[]>>(walletRoute.banks());

  return data.data;
};

export const fetchBanksUSSD = async () => {
  const { data } = await apiHandler.get<APIResponse<USSD[]>>(walletRoute.banks('USSD'));

  return data.data;
};
