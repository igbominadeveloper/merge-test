import { baseUrl } from '.';

const routes = {
  phoneVerificationToken: (userId: string) => `${baseUrl}/users/${userId}/phone/token`,
  verifyBVN: (userId: string) => `${baseUrl}/users/${userId}/bvn/verify`,
  verifyNIN: (userId: string) => `${baseUrl}/users/${userId}/nin/verify`,
  submitIdentityVerificationDoc: (userId: string) =>
    `${baseUrl}/users/${userId}/identity-doc/verify`,
  submitBusinessVerificationDetails: (businessId: string) =>
    `${baseUrl}/businesses/${businessId}/kyc`,
  validatePhoneVerificationToken: (userId: string) =>
    `${baseUrl}/users/${userId}/phone/token/verify`,
};

export default routes;
