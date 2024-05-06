import { baseUrl } from '.';

const walletRoute = {
  activateWallet: (businessId: string) => `${baseUrl}/accounts/${businessId}/activate`,
  banks: (type = 'BANKS') => `${baseUrl}/wallet/banks/${type}`,
  validateAccount: `${baseUrl}/wallet/validate-account`,
  beneficiary: `${baseUrl}/wallet/beneficiary`,
  transferToKatsu: `${baseUrl}/intra/wallet/transfer`,
  transferToOtherBank: `${baseUrl}/inter/bank/transfer`,
  fundWithUssd: `${baseUrl}/wallet/fund/ussd/invoke`,
  accountBalance: `${baseUrl}/accounts/balance`,
  getAccountDetails: `${baseUrl}/accounts/search`,
};

export default walletRoute;
