import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';
import { BusinessAddressType } from '@/lib/validations/verify-business/business-address.schema';
import { BusinessRegistrationType } from '@/lib/validations/verify-business/business-registration.schema';

type BusinessVerificationContextType = [
  BusinessVerificationType | null,
  Dispatch<SetStateAction<BusinessVerificationType | null>>,
];

export type BusinessVerificationType = BusinessRegistrationType & BusinessAddressType;

const BusinessVerificationContext = createContext<BusinessVerificationContextType>([
  null,
  () => {},
]);

export function BusinessVerificationProvider({ children }: { children: React.ReactNode }) {
  const value = useState<BusinessVerificationType | null>(null);

  return (
    <BusinessVerificationContext.Provider value={value}>
      {children}
    </BusinessVerificationContext.Provider>
  );
}

export function useBusinessVerificationState() {
  const context = useContext<BusinessVerificationContextType>(BusinessVerificationContext);
  if (!context) {
    throw new Error(
      'useBusinessVerificationState must be used within the BusinessVerificationProvider',
    );
  }
  return context;
}
