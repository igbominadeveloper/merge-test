import apiHandler from '@/services/api-handler';
import { useNotification } from '@/shared/Notification';
import { useState } from 'react';
import getErrorMessage from '@/utils/getErrorMessage';
import LoanRoutes from '@/services/routes/loan.route';

/* eslint-disable prefer-destructuring */

const useLoanFns = () => {
  const { onMessage } = useNotification();
  const [loading, setLoading] = useState({
    APPLY: false,
  });

  const loadingFn = (state: keyof typeof loading, value: boolean) => {
    setLoading({ ...loading, [state]: value });
  };

  const fns = {
    loanApply: async <T>(body: T, callback: () => void) => {
      loadingFn('APPLY', true);

      try {
        await apiHandler.post(LoanRoutes.apply, { ...body });
        callback();
      } catch (error: any) {
        onMessage(getErrorMessage(error));
      } finally {
        loadingFn('APPLY', false);
      }
    },
  };

  return {
    ...fns,
    loading,
  };
};

export default useLoanFns;
