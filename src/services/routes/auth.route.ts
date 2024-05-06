import { baseUrl } from '.';

const AuthRoute = {
  refreshToken: `${baseUrl}/refresh-token`,
  signup: `${baseUrl}/sign-up/customer`,
  login: `${baseUrl}/login`,
  sendEmailVerification: `${baseUrl}/email-verification`,
  verifyEmailToken: (userId: string, token: string) =>
    `${baseUrl}/public/users/${userId}/verify/${token}/email`,
  logout: `${baseUrl}/logout`,
  sendForgotPasswordCode: (email: string) =>
    `${baseUrl}/public/users/${email}/forget-password/code`,
  resetPassword: `${baseUrl}/public/forget-password/change`,
};

export default AuthRoute;
