import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile } from '../clients/user';

export const useUserProfile = () => {
  const queryKey = ['userProfile'];

  return useQuery({
    queryKey,
    queryFn: fetchUserProfile,
  });
};
