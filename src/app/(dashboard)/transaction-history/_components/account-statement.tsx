import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import CloseButton from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import ModalComponent from '@/shared/Modal';
import { generateAccountStatement } from '@/services/clients/wallet';
import { useUserProfile } from '@/services/queries/user';
import { formatDateString } from '@/utils/helpers';
import AccountStatementForm from '../account-statement/_components/form';
import { AccountStatementType } from '../account-statement/_validation/schema';
import Preview from '../account-statement/_components/preview';
import Success from '../account-statement/_components/success';

interface Props {
  onClose: () => void;
}
type Step = 'form' | 'preview' | 'success';

export default function AccountStatement({ onClose }: Props) {
  const [step, setStep] = useState<Step>('form');
  const { data: userProfile } = useUserProfile();
  const [file, setFile] = useState<null | File>(null);
  const [isLoading, setIsLoading] = useState(false);
  const business = userProfile?.businesses[0];
  const accountId = business?.wallet?.floatAccountNumber;

  const processAccountStatement = async (data: AccountStatementType) => {
    if (!accountId) return;

    setIsLoading(true);
    const { endDate, startDate } = data;
    endDate.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    const transformedStartDate = dayjs(startDate).format('YYYY-MM-DD');
    const transformedEndDate = dayjs(endDate).format('YYYY-MM-DD');

    try {
      const statementBuffer = await generateAccountStatement({
        accountNumber: accountId,
        businessAddress: business?.kycDetails?.businessDetails?.registeredBusinessAddress ?? '',
        businessName: business?.name,
        startDate: transformedStartDate,
        endDate: transformedEndDate,
      });

      if (statementBuffer) {
        const startMonthAndYear = formatDateString(transformedStartDate, 'MMM-YYYY');
        const endMonthAndYear = formatDateString(transformedEndDate, 'MMM-YYYY');
        const fileName = `Katsu-statement-${startMonthAndYear}_${endMonthAndYear}.pdf`;
        const pdfFile = new File([new Uint8Array(statementBuffer)], fileName, {
          type: 'application/pdf',
        });

        // Set the File in the state
        setFile(pdfFile);
        setStep('preview');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const render: Record<Step, React.ReactNode> = {
    form: (
      <AccountStatementForm
        loading={isLoading}
        onClose={onClose}
        onSubmit={processAccountStatement}
      />
    ),
    preview: file ? (
      <Preview file={file} onClose={onClose} onNext={() => setStep('success')} />
    ) : null,
    success: <Success onClose={onClose} />,
  };

  const handleClose = () => {
    if (!isLoading) onClose();
  };

  return (
    <ModalComponent
      open
      style={{ width: isMobile ? '90%' : 480, padding: isMobile ? 15 : 24 }}
      onClose={handleClose}
      disableBackropClick
      disableEscapeKeyDown
    >
      <header className={`items-center justify-between ${step === 'success' ? 'hidden' : 'flex'}`}>
        <h1 className="mb-2 text-lg font-bold">Generate Account Statement</h1>
        <CloseButton className="hidden size-6 cursor-pointer lg:block" onClick={handleClose} />
      </header>
      {render[step]}
    </ModalComponent>
  );
}
