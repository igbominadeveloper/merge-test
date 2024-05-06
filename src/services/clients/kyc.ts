import { z } from 'zod';
import { APIResponse } from '@/types/general';
import KYCRoute from '../routes/kyc.route';
import apiHandler from '../api-handler';

interface MessageResponse {
  message: string;
  supportDescriptiveMessage: string;
}

export const IncorporationTypeEnum = z.enum(['RC', 'BN']);
type IncorporationType = z.infer<typeof IncorporationTypeEnum>;

export const getPhoneVerificationToken = (userId: string, phoneNumber: string) =>
  apiHandler.put<APIResponse<MessageResponse>>(KYCRoute.phoneVerificationToken(userId), {
    phone: phoneNumber,
    diallingCode: '234', // hardcode for now
  });

export const validatePhoneVerificationToken = (userId: string, token: string) =>
  apiHandler.put<APIResponse<MessageResponse>>(KYCRoute.validatePhoneVerificationToken(userId), {
    token,
  });

export const verifyBVN = (userId: string, bvn: string, dob: string) =>
  apiHandler.put<APIResponse<MessageResponse>>(KYCRoute.verifyBVN(userId), {
    bvn,
    dob,
  });

export const verifyNIN = (userId: string, nin: string, dob: string) =>
  apiHandler.put<APIResponse<MessageResponse>>(KYCRoute.verifyNIN(userId), {
    nin,
    dob,
  });

export const submitIdentifyVerification = (
  userId: string,
  identityType: string,
  identityDoc: string,
) =>
  apiHandler.put<APIResponse<MessageResponse>>(KYCRoute.submitIdentityVerificationDoc(userId), {
    identityDoc,
    identityType,
  });

export interface BusinessVerificationDto {
  registeredBusinessAddress: string;
  registeredDate: string;
  operatingAddress: string;
  proofOfBusinessAddress: string;
  natureOfBusiness: string;
  taxIdentificationNumber: string;
  certificateOfIncorporation: string;
  incorporationNumber: string;
  incorporationType: IncorporationType;
}
export const submitBusinessVerificationDetails = (
  userId: string,
  businessId: string,
  businessDetails: BusinessVerificationDto,
) =>
  apiHandler.put<APIResponse<MessageResponse>>(
    KYCRoute.submitBusinessVerificationDetails(businessId),
    {
      userId,
      kycDetails: {
        businessDetails,
      },
    },
  );
