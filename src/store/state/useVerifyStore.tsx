import { create } from 'zustand';

export type VerificationID =
  | 'phone'
  | 'nin'
  | 'bvn'
  | 'id-document'
  | 'business-reg-document'
  | 'proof-of-business-address';

export type DataProps = {
  id: VerificationID;
  name: string;
  completed: boolean;
};

type OwnerProps = {
  verifyOwnerChecklist: DataProps[];
  updateVerifyOwnerChecklist: (data: DataProps[]) => void;
};

type BusinessProps = {
  verifyBusinessChecklist: DataProps[];
  updateVerifyBusinessChecklist: (data: DataProps[]) => void;
};

interface VerificationProps {
  isVerified: boolean;
  setVerified: (state: boolean) => void;
}

const initialVerifyOwnerChecklist: DataProps[] = [
  {
    id: 'phone',
    name: 'Phone Number',
    completed: false,
  },
  {
    id: 'nin',
    name: 'National Identification Number (NIN)',
    completed: false,
  },
  {
    id: 'bvn',
    name: 'Bank Verification Number (BVN)',
    completed: false,
  },
  {
    id: 'id-document',
    name: 'Identity Documents',
    completed: false,
  },
];

const initialVerifyBusinessChecklist: DataProps[] = [
  {
    id: 'business-reg-document',
    name: 'Business Registration Document',
    completed: false,
  },
  {
    id: 'proof-of-business-address',
    name: 'Proof of Business Address',
    completed: false,
  },
];

export const useVerifyOwnerChecklist = create<OwnerProps>(set => ({
  verifyOwnerChecklist: initialVerifyOwnerChecklist,
  updateVerifyOwnerChecklist: updatedData => set({ verifyOwnerChecklist: updatedData }),
}));

export const useVerifyBusinessChecklist = create<BusinessProps>(set => ({
  verifyBusinessChecklist: initialVerifyBusinessChecklist,
  updateVerifyBusinessChecklist: updatedData => set({ verifyBusinessChecklist: updatedData }),
}));

export const useVerificationStore = create<VerificationProps>(set => ({
  isVerified: false,
  setVerified: (verified: boolean) =>
    set({
      isVerified: verified,
    }),
}));
