import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserProfile } from '@/types/user';

import apiHandler from '../api-handler';
import UserRoute from '../routes/user.route';

export default function useUserMutations() {
  const queryClient = useQueryClient();

  const uploadImageMutation = useMutation({
    mutationFn: (photo: string) => {
      return apiHandler.put(UserRoute.uploadPhoto, { photo });
    },

    onSuccess: result => {
      queryClient.setQueryData(['userProfile'], (old: UserProfile) => ({
        ...old,
        photo: result.data.data.photo,
      }));

      queryClient.refetchQueries({ queryKey: ['userProfile'] });
    },
  });

  return {
    uploadImageMutation,
  };
}
