import {
  useBvnModal,
  useIdentifyDocumentsModal,
  useNinModal,
  usePhoneNumberModal,
  useRegistationDocumentModal,
} from '@/store/state/useVerifyModals';
import { VerificationID } from '@/store/state/useVerifyStore';

export type VerificationLineItem = {
  id: VerificationID;
  name: string;
  details: string;
  completed: boolean;
  onClick: () => void;
};

export default function VerifyBusinessStore() {
  const { setModal: setPhoneModal } = usePhoneNumberModal();
  const { setModal: setNinModal } = useNinModal();
  const { setModal: setBnvModal } = useBvnModal();
  const { setModal: setIdentityModal } = useIdentifyDocumentsModal();
  const { setModal: setRegistrationModal } = useRegistationDocumentModal();

  const VerifyOwnerMock: VerificationLineItem[] = [
    {
      id: 'phone',
      name: 'Phone Number',
      details: 'Verify your phone number',
      completed: false,
      onClick: () => setPhoneModal(),
    },
    {
      id: 'nin',
      name: 'National Identification Number (NIN)',
      details: 'Verify your government-issued identification number',
      completed: false,
      onClick: () => setNinModal(),
    },
    {
      id: 'bvn',
      name: 'Bank Verification Number (BVN)',
      details: 'Verify your unique 11-digit BVN',
      completed: false,
      onClick: () => setBnvModal(),
    },
    {
      id: 'id-document',
      name: 'Identity Documents',
      details: 'Upload and verify your ID documents',
      completed: false,
      onClick: () => setIdentityModal(),
    },
  ];

  const VerifyBusinessMock: VerificationLineItem[] = [
    {
      id: 'business-reg-document',
      name: 'Business Registration Document and Proof of Address',
      details:
        'Upload your business CAC cerficate and Upload a utility (Electricity or Waste) bill with your business address',
      completed: false,
      onClick: () => setRegistrationModal(),
    },
    // {
    //   id: 'proof-of-business-address',
    //   name: 'Proof of Business Address',
    //   details: 'Upload a utility (Electricity or Waste) bill with your business address ',
    //   completed: false,
    //   onClick: () => setAddressModal(),
    // },
  ];

  const documents = [
    {
      id: 1,
      name: "Driver's License",
    },
    {
      id: 2,
      name: "Permanent Voter's Card",
    },
    {
      id: 3,
      name: 'National Identity Card',
    },
    {
      id: 4,
      name: 'International Passport',
    },
  ];

  return { documents, VerifyOwnerMock, VerifyBusinessMock };
}
