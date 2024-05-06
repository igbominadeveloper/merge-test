import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import Image from 'next/image';
import ModalComponent from '@/shared/Modal';
import CloseButton from '@mui/icons-material/Close';
import DatePickerInput from '@/shared/Form/DatepickerInput';
import Button from '@/shared/Form/Button';
import pdfIcon from '@/assets/icons/pdf-icon.svg';
import uploadIcon from '@/assets/icons/upload-icon.svg';
import successIcon from '@/assets/icons/email-sent.svg';

type Step = 'provide-details' | 'download' | 'downloaded';
interface StatementProps extends Props {
  step: Step;
  handleClick: () => void;
}
function Statement({ step, onClose, handleClick }: StatementProps) {
  const file = {
    name: 'Account-statement-Katsu-Jan_Mar2024',
    size: '32MB',
  };

  return (
    <div>
      {step === 'provide-details' && (
        <div className="mt-4 flex flex-col gap-6">
          <DatePickerInput value={null} label="Start Date" />
          <DatePickerInput value={null} label="End Date" />
        </div>
      )}
      {step === 'download' && (
        <div className="my-6 flex gap-3 rounded-lg border border-gray-200 bg-gray-100 p-5">
          <Image src={pdfIcon} width={32} alt="pdf-icon" />
          <div className="flex flex-1 flex-col text-sm">
            <p>{file.name}</p>
            <p>{file.size}</p>
          </div>
          <Image src={uploadIcon} width={32} alt="upload-icon" />
        </div>
      )}

      {step === 'downloaded' && (
        <div className="flex flex-col items-center gap-2 p-5">
          <Image src={successIcon} width={60} alt="success-icon" />
          <div className="flex flex-1 flex-col items-center">
            <p className="text-xl font-semibold">Successful!</p>
            <p className="text-lg font-normal text-gray-900/60">
              Your account statement has been downloaded
            </p>
          </div>
        </div>
      )}

      <section className="mt-10 flex flex-col gap-3 lg:flex-row lg:gap-6">
        <Button
          text={step === 'downloaded' ? 'Done' : 'Cancel'}
          type="button"
          variant={step === 'downloaded' ? 'primary' : 'secondary'}
          handleClick={onClose}
          className={`w-full text-xs ${step === 'downloaded' ? 'bg-primary-main text-white' : 'bg-gray-700/10 text-black'} rounded-lg p-4 py-3 font-bold`}
        />
        {step !== 'downloaded' && (
          <Button
            text={step === 'provide-details' ? 'Generate' : 'Download'}
            type="button"
            handleClick={handleClick}
            className="w-full rounded-lg bg-primary-main p-4 py-3 text-xs font-bold text-white hover:bg-primary-main/90"
          />
        )}
      </section>
    </div>
  );
}

interface Props {
  onClose: () => void;
}
export default function GenerateStatement({ onClose }: Props) {
  const [step, setStep] = useState<Step>('provide-details');

  const handleClick = () => {
    if (step === 'provide-details') {
      setStep('download');
      return;
    }

    if (step === 'download') {
      setStep('downloaded');
      return;
    }

    onClose();
  };

  return (
    <ModalComponent open style={{ width: isMobile ? '90%' : 450, padding: isMobile ? 15 : 24 }}>
      <header
        className={`items-center justify-between ${step === 'downloaded' ? 'hidden' : 'flex'}`}
      >
        <h1 className="text-lg font-bold">Generate Account Statement</h1>
        <CloseButton className="hidden size-6 cursor-pointer lg:block" onClick={onClose} />
      </header>

      <Statement step={step} onClose={onClose} handleClick={handleClick} />
    </ModalComponent>
  );
}
