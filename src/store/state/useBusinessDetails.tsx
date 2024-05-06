import { create } from 'zustand';
import { BusinessDetailsType } from '@/app/auth/signup/_validation';
import { BusinessType } from '@/types/user';

type BusinessDetails = Omit<BusinessDetailsType, 'businessType'> & {
  businessType: undefined | BusinessType;
};

type Props = {
  businessDetails: BusinessDetails;
  updateBusinessDetails: (data: BusinessDetails) => void;
};

export const useBusinessDetailsStore = create<Props>(set => ({
  businessDetails: {
    businessAdress: '',
    businessName: '',
    businessType: undefined,
  },
  updateBusinessDetails: data =>
    set({
      businessDetails: data,
    }),
}));
