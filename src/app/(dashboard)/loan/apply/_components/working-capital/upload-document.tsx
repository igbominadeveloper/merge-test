'use client';

import { useState } from 'react';
import Button from '@/shared/Form/Button';
import UploadCard from '@/app/(dashboard)/loan/_components/upload-card';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UploadWorkingCapitalSchema,
  UploadWorkingCapitalSchemaType,
} from '@/app/(dashboard)/loan/apply/_validation';
import SuccessModal from '@/shared/SuccessModal';
import { useRouter } from 'next/navigation';
import { getUploadDefaultValue } from '@/utils/loans';
import { LoanProductCategoryEnum, UploadFileArrType, WorkingCapitalDTO } from '@/types/loan';
import { convertToNumber } from '@/utils/general';
import useLoanFns from '@/hooks/useLoanFns';
import fileToBase64 from '@/utils/convertFileToBase64';
import { UploadSchemaKey, WorkingCapitalType } from './types';

type Props = {
  onBack: () => void;
  setData: React.Dispatch<React.SetStateAction<WorkingCapitalType>>;
  defaultData: WorkingCapitalType;
};

function UploadDocument({ onBack, defaultData, setData }: Props) {
  const router = useRouter();
  const { loanApply, loading } = useLoanFns();
  const [openModal, setOpenModal] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<UploadWorkingCapitalSchemaType>({
    mode: 'all',
    resolver: zodResolver(UploadWorkingCapitalSchema),
    defaultValues: {
      auditedFinancialStatement: getUploadDefaultValue<UploadSchemaKey>(
        'auditedFinancialStatement',
        defaultData?.documents,
      ),
      executedContracts: getUploadDefaultValue<UploadSchemaKey>(
        'executedContracts',
        defaultData?.documents,
      ),
      managementProfile: getUploadDefaultValue<UploadSchemaKey>(
        'managementProfile',
        defaultData?.documents,
      ),
      bankStatement: getUploadDefaultValue<UploadSchemaKey>(
        'bankStatement',
        defaultData?.documents,
      ),
      boardResolution: getUploadDefaultValue<UploadSchemaKey>(
        'boardResolution',
        defaultData?.documents,
      ),
      cashlowProjection: getUploadDefaultValue<UploadSchemaKey>(
        'cashlowProjection',
        defaultData?.documents,
      ),
      proFomaInvoice: getUploadDefaultValue<UploadSchemaKey>(
        'proFomaInvoice',
        defaultData?.documents,
      ),
      profitabilityAnalysis: getUploadDefaultValue<UploadSchemaKey>(
        'profitabilityAnalysis',
        defaultData?.documents,
      ),
      additionalDocument: getUploadDefaultValue<UploadSchemaKey>(
        'additionalDocument',
        defaultData?.documents,
      ),
    },
  });

  const values = watch();

  const uploadFileClass: UploadFileArrType<UploadSchemaKey>[] = [
    {
      name: 'Upload Pro-forma invoice',
      setValue: (value: File) => setValue('proFomaInvoice', value),
      errorMessage: errors?.proFomaInvoice?.message || '',
      key: 'proFomaInvoice',
      value: values.proFomaInvoice,
    },
    {
      name: 'Upload Audited Financial Statement',
      setValue: (value: File) => setValue('auditedFinancialStatement', value),
      errorMessage: errors?.auditedFinancialStatement?.message || '',
      key: 'auditedFinancialStatement',
      value: values.auditedFinancialStatement,
    },
    {
      name: 'Upload 6-12 Months Bank Statement',
      setValue: (value: File) => setValue('bankStatement', value),
      errorMessage: errors?.bankStatement?.message || '',
      key: 'bankStatement',
      value: values.bankStatement,
    },
    {
      name: 'Upload Company or Management Profile',
      setValue: (value: File) => setValue('managementProfile', value),
      errorMessage: errors?.managementProfile?.message || '',
      key: 'managementProfile',
      value: values.managementProfile,
    },
    {
      name: 'Upload Previously Executed Contracts',
      setValue: (value: File) => setValue('executedContracts', value),
      errorMessage: errors?.executedContracts?.message || '',
      key: 'executedContracts',
      value: values.executedContracts,
    },
    {
      name: 'Upload Formal Application/Board Resolution',
      setValue: (value: File) => setValue('boardResolution', value),
      errorMessage: errors?.boardResolution?.message || '',
      key: 'boardResolution',
      value: values.boardResolution,
    },
    {
      name: 'Upload Cashflow Projection',
      setValue: (value: File) => setValue('cashlowProjection', value),
      errorMessage: errors?.cashlowProjection?.message || '',
      key: 'cashlowProjection',
      value: values.cashlowProjection,
    },
    {
      name: 'Upload Additional Document (Optional)',
      setValue: (value: File) => setValue('additionalDocument', value, { shouldValidate: true }),
      errorMessage: errors?.additionalDocument?.message || '',
      value: values.additionalDocument,
      key: 'additionalDocument',
    },
  ];

  const filteredUploadFileClass = uploadFileClass.filter(item => item.value);

  const documents = uploadFileClass.map(file => ({
    file: file.value,
    key: file.key,
  }));

  const onSubmit: SubmitHandler<UploadWorkingCapitalSchemaType> = async () => {
    const mergedData = { ...defaultData, documents } satisfies WorkingCapitalType;

    const transformedData = {
      loanAmount: convertToNumber(mergedData?.requestAmount ?? ''),
      docLinks: await Promise.all(
        filteredUploadFileClass.map(async item => ({
          name: item.name,
          link: await fileToBase64(item.value),
        })),
      ),
      loanPurpose: mergedData?.loanPurpose ?? '',
      paymentTenorInDays: convertToNumber(mergedData?.loanTenor ?? ''),
      productCategory: LoanProductCategoryEnum.WorkingCapital,
    } satisfies WorkingCapitalDTO;

    await loanApply<WorkingCapitalDTO>(transformedData, () => {
      setOpenModal(true);
      setData(null);
    });
  };

  return (
    <>
      <div>
        <h4 className="mb-4 text-2xl font-semibold">Upload document</h4>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-6 grid grid-cols-2 gap-6">
            {uploadFileClass.map(item => (
              <UploadCard
                title={item.name}
                key={item.name}
                setValue={item.setValue}
                validationErrorMessage={item.errorMessage}
                accepts=".pdf"
                clearable
                valueAsString={false}
                value={item.value}
              />
            ))}
          </div>

          <div className="mt-8 flex w-full  gap-6">
            <Button
              text="Go back"
              type="button"
              variant="secondary"
              ariaLabel="Go back"
              className="w-full"
              onClick={() => {
                onBack();
                setData({ ...defaultData, documents });
              }}
              disabled={loading.APPLY}
            />

            <Button
              text="Submit application"
              ariaLabel="Submit application"
              type="submit"
              className="w-full"
              disabled={filteredUploadFileClass.length < uploadFileClass.length - 1}
              isLoading={loading.APPLY}
            />
          </div>
        </form>
      </div>

      {openModal && (
        <SuccessModal
          open={openModal}
          heading="Submitted"
          subHeading="Your loan application is currently being reviewed"
          buttonLabel="Done"
          onButtonClick={() => {
            setOpenModal(false);
            router.push('/loan');
          }}
        />
      )}
    </>
  );
}

export default UploadDocument;
