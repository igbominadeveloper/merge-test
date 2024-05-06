import apiHandler from '@/services/api-handler';
import { useNotification } from '@/shared/Notification';
import { useState } from 'react';
import TransactionRoute from '@/services/routes/transaction.route';
import { AddBeneficiaryDTO, TransferToKatsu, TransferToOtherBank } from '@/types/dashboard';
import { useQueryClient } from '@tanstack/react-query';
import getErrorMessage from '@/utils/getErrorMessage';
import { FundWithUssd, TransferResponse } from '@/types/transaction';
import walletRoute from '@/services/routes/wallet.route';
import { APIResponse } from '@/types/general';

/* eslint-disable prefer-destructuring */

const useTrxFns = () => {
  const queryClient = useQueryClient();
  const { onMessage } = useNotification();
  const [loading, setLoading] = useState({
    CREATE_PIN: false,
    VALIDATE_ACCOUNT: false,
    ADD_BENEFICIARY: false,
    DELETE_BENEFICIARY: false,
    VERIFY_TRANSACTION_PIN: false,
    TRANSFER_TO_KATSU: false,
    TRANSFER_TO_OTHER_BANK: false,
    FUND_WITH_USSD: false,
    GET_ACCOUNT_DETAILS: false,
  });

  const loadingFn = (state: keyof typeof loading, value: boolean) => {
    setLoading({ ...loading, [state]: value });
  };

  const fns = {
    createPin: async (
      body: { pin: string; password?: string; type: 'PASSWORD' | 'OTP' },
      callback?: () => void,
    ) => {
      loadingFn('CREATE_PIN', true);

      try {
        const res = await apiHandler.put(TransactionRoute.createPin, {
          ...body,
        });
        onMessage(res.data.message);
        queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        if (callback) callback();
      } catch (error: any) {
        onMessage(getErrorMessage(error));
      } finally {
        loadingFn('CREATE_PIN', false);
      }
    },

    validateAccountNumber: async (
      body: { bankCode: string; accountNumber: string },
      callback: (value: string) => void,
    ) => {
      loadingFn('VALIDATE_ACCOUNT', true);

      try {
        const res = await apiHandler.post(walletRoute.validateAccount, { ...body });

        callback(res.data.data.data);
      } catch (error: any) {
        onMessage(getErrorMessage(error));
      } finally {
        loadingFn('VALIDATE_ACCOUNT', false);
      }
    },
    getKatsuAccountDetails: async (accountNumber: string) => {
      loadingFn('GET_ACCOUNT_DETAILS', true);

      try {
        const res = await apiHandler.get(
          `${walletRoute.getAccountDetails}?search=${accountNumber}`,
        );
        if (res.data.data.length === 0) onMessage('Please use Katsu account');
        return res.data.data[0];
      } catch (error) {
        onMessage(getErrorMessage(error));
      } finally {
        loadingFn('GET_ACCOUNT_DETAILS', false);
      }
    },

    addBeneficiary: async (body: AddBeneficiaryDTO, callback: () => void) => {
      loadingFn('ADD_BENEFICIARY', true);

      try {
        await apiHandler.post(walletRoute.beneficiary, { ...body });
        queryClient.invalidateQueries({ queryKey: ['beneficiaries'] });
        callback();
      } catch (error: any) {
        onMessage(getErrorMessage(error));
      } finally {
        loadingFn('ADD_BENEFICIARY', false);
      }
    },
    transferToKatsu: async (body: TransferToKatsu) => {
      loadingFn('TRANSFER_TO_KATSU', true);

      try {
        const response = await apiHandler.post<APIResponse<TransferResponse>>(
          walletRoute.transferToKatsu,
          {
            ...body,
          },
        );

        return response?.data?.data;
      } catch (error) {
        onMessage(getErrorMessage(error));
      } finally {
        loadingFn('TRANSFER_TO_KATSU', false);
      }
    },
    transferToOtherBank: async (body: TransferToOtherBank) => {
      loadingFn('TRANSFER_TO_OTHER_BANK', true);

      try {
        const response = await apiHandler.post<APIResponse<TransferResponse>>(
          walletRoute.transferToOtherBank,
          {
            ...body,
          },
        );

        return response?.data?.data;
      } catch (error) {
        onMessage(getErrorMessage(error));
      } finally {
        loadingFn('TRANSFER_TO_OTHER_BANK', false);
      }
    },

    verifyTransactionPin: async (token: string, callback: () => void) => {
      loadingFn('VERIFY_TRANSACTION_PIN', true);

      try {
        await apiHandler.put(TransactionRoute.verifyTransactionPin(token), {});

        callback();
      } catch (error: any) {
        onMessage(getErrorMessage(error));
      } finally {
        loadingFn('VERIFY_TRANSACTION_PIN', false);
      }
    },

    deleteBeneficiary: async (body: AddBeneficiaryDTO) => {
      loadingFn('DELETE_BENEFICIARY', true);

      try {
        const res = await apiHandler.put(`${walletRoute.beneficiary}`, { ...body });
        onMessage(res.data.message);
        queryClient.invalidateQueries({ queryKey: ['beneficiaries'] });
      } catch (error: any) {
        onMessage(getErrorMessage(error));
      } finally {
        loadingFn('DELETE_BENEFICIARY', false);
      }
    },
    fundWithUssd: async (fundAccount: FundWithUssd) => {
      loadingFn('FUND_WITH_USSD', true);

      try {
        const res = await apiHandler.post(walletRoute.fundWithUssd, fundAccount);
        return res.data.data;
      } catch (error: any) {
        onMessage(getErrorMessage(error));
      } finally {
        loadingFn('FUND_WITH_USSD', false);
      }
    },
  };

  return {
    ...fns,
    loading,
  };
};

export default useTrxFns;
