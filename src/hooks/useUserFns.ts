import { useState } from 'react';
import UserRoute from '@/services/routes/user.route';
import apiHandler from '@/services/api-handler';
import { useNotification } from '@/shared/Notification';
import { ChangePasswordSchemaType } from '@/app/(dashboard)/account-management/_validations/schema';
import useUserMutations from '@/services/mutations/user';
import getErrorMessage from '@/utils/getErrorMessage';

/* eslint-disable prefer-destructuring */

const useUserFns = () => {
  const { onMessage } = useNotification();
  const { uploadImageMutation } = useUserMutations();

  const [isLoading, setLoading] = useState({
    CHANGE_PASSWORD: false,
  });

  const loadingFn = (state: keyof typeof isLoading, value: boolean) => {
    setLoading({ ...isLoading, [state]: value });
  };

  const fns = {
    uploadPhoto: async (photo: string) => {
      try {
        const res = await uploadImageMutation.mutateAsync(photo);
        onMessage(res.data.message);
      } catch (error: any) {
        onMessage(getErrorMessage(error));
      }
    },

    changePassword: async (body: ChangePasswordSchemaType, callback: () => void) => {
      loadingFn('CHANGE_PASSWORD', true);

      try {
        const res = await apiHandler.put(UserRoute.changePassword, { ...body });
        onMessage(res.data.message);
        callback();
      } catch (error: any) {
        onMessage(getErrorMessage(error));
      } finally {
        loadingFn('CHANGE_PASSWORD', false);
      }
    },
  };

  return {
    ...fns,
    loading: { UPLOAD_PHOTO: uploadImageMutation.status === 'pending', ...isLoading },
  };
};

export default useUserFns;
