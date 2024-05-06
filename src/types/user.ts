import { z } from 'zod';

export const BusinessTypeEnum = z.enum(['Sole Proprietor', 'Limited Liability']);
export type BusinessType = z.infer<typeof BusinessTypeEnum>;
export const BusinessCategoryEnum = z.enum(['REGISTERED_BUSINESS', 'REGISTERED_COMPANY']);
export type BusinessCategory = z.infer<typeof BusinessCategoryEnum>;

interface Wallet {
  userId: string;
  floatAccountId: string;
  floatAccountUuid: string;
  floatAccountNumber: string;
  commissionAccountId?: string;
  commissionAccountUuid?: string;
  commissionAccountNumber?: string;
  virtualBankCode?: string;
  virtualBankName?: string;
}

interface Tenant {
  _id: string;
  code: string;
  name: string;
  email: string;
  photo: string;
  kycDetails: {
    businessDetails: {
      directorsProofOfAddress: any[]; // You can specify the actual type if known
      shareHoldersProofOfAddress: any[]; // You can specify the actual type if known
    };
    status: string;
  };
  domains: any[]; // You can specify the actual type if known
  services: {
    keyManager: string;
    service: string;
    config: {
      callbackUrl: string;
      apiKey: string;
      authKey: string;
      allowEmailNotification: string;
      azureConnectionString: string;
    };
    _id: string;
  }[];
  user: string;
  country: {
    name: string;
    code: string;
    currency: string;
  };
  bannerLinks: string[];
  wallet: Wallet;
  tenantHandle: string;
}

interface Business {
  _id: string;
  name: string;
  phone: string;
  businessHandle: string;
  email: string;
  source: string;
  active: boolean;
  acceptingOrder: boolean;
  isDistributor: boolean;
  isManufacturer: boolean;
  extraLocationPrice: number;
  category: BusinessCategory;
  industry: BusinessType;
  tenant: string;
  wallet?: Wallet;
  kycDetails: {
    businessDetails: {
      registeredDate?: string | null;
      registeredBusinessAddress?: string | null;
      operatingAddress?: string | null;
      proofOfBusinessAddress?: string | null;
      natureOfBusiness?: string | null;
      taxIdentificationNumber?: string | null;
      incorporationType?: string | null;
      incorporationNumber?: string | null;
      certificateOfIncorporation?: string | null;
      directorsProofOfAddress: string | null; // You can specify the actual type if known
      shareHoldersProofOfAddress: string | null; // You can specify the actual type if known
      directorsProofOfIdentification: string | null; // You can specify the actual type if known
    };
    status: string;
    additionalShareholdersDetails: any[]; // You can specify the actual type if known
    guarantorDetails: any[]; // You can specify the actual type if known
  };
  location: {
    type: string;
    coordinates: number[];
  };
  user: string;
  profileOwners: any[]; // You can specify the actual type if known
  shippingFee: number;
  type: string;
  isHead: boolean;
  deleted: boolean;
  otherAddresses: any[]; // You can specify the actual type if known
  pickUpAddresses: any[]; // You can specify the actual type if known
  createdAt: string;
  updatedAt: string;
  __v: number;
  address: {
    country: string;
    state: string;
    lga: string;
    latitude: number;
    longitude: number;
    name: string;
  };
}

export interface UserProfile {
  city: {
    name: string;
    code: string;
  };
  state: {
    code: string;
    name: string;
  };
  country: {
    code: string;
    name: string;
    currency: string;
    _id: string;
  };
  lastName: string;
  gender: string;
  address: string;
  //   verification details
  emailVerification: boolean;
  phoneVerified: boolean;
  ninVerified: boolean;
  bvnVerified: boolean;
  phone: string;

  dob: string;
  firstName: string;
  username: string;
  status: string;
  roles: string[];
  type: string;
  createdAt: string;
  permissions: string[]; // We have to know the permissions here so we store them in an enum

  businesses: Business[];
  updatedAt: string;
  tenants: Tenant[];
  profileTenant: Tenant;
  identityDoc: string;
  identityType: string; // we should type this so we can restrict it
  wallet: {
    virtualBankCode: string;
    virtualBankName: string;
  };

  distributor: boolean;
  manufacturer: boolean;
  __v: string;
  _id: string;
  bvn?: string;
  photo?: string;
}
