import { baseUrl } from '.';

const UserRoute = {
  userProfile: `${baseUrl}/me`,
  uploadPhoto: `${baseUrl}/users/profile-photo`,
  changePassword: `${baseUrl}/change-password`,
};

export default UserRoute;
