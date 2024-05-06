import { UserProfile } from '@/types/user';
import { APIResponse } from '@/types/general';
import apiHandler from '../api-handler';
import UserRoute from '../routes/user.route';

export const fetchUserProfile = async () => {
  const { data } = await apiHandler.get<APIResponse<UserProfile>>(UserRoute.userProfile);

  return data.data;
};
