'use client';

import Button from '@/shared/Form/Button';
import UploadCard from '@/app/(dashboard)/loan/_components/upload-card';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UploadInvoiceDiscountingSchema,
  UploadInvoiceDiscountingSchemaType,
} from '@/app/(dashboard)/loan/apply/_validation';
import SuccessModal from '@/shared/SuccessModal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getUploadDefaultValue } from '@/utils/loans';
import { InvoiceDiscountingDTO, LoanProductCategoryEnum, UploadFileArrType } from '@/types/loan';
import { convertToNumber } from '@/utils/general';
import useLoanFns from '@/hooks/useLoanFns';
import fileToBase64 from '@/utils/convertFileToBase64';
import dayjs from 'dayjs';
import { InvoiceDiscountingType, UploadSchemaKey } from './types';

type Props = {
  onBack: () => void;
  setData: React.Dispatch<React.SetStateAction<InvoiceDiscountingType>>;
  defaultData: InvoiceDiscountingType;
};

function UploadDocument({ onBack, defaultData, setData }: Props) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const { loanApply, loading } = useLoanFns();
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<UploadInvoiceDiscountingSchemaType>({
    mode: 'all',
    resolver: zodResolver(UploadInvoiceDiscountingSchema),
    defaultValues: {
      auditedFinancialStatement: getUploadDefaultValue<UploadSchemaKey>(
        'auditedFinancialStatement',
        defaultData?.documents,
      ),
      managementProfile: getUploadDefaultValue<UploadSchemaKey>(
        'managementProfile',
        defaultData?.documents,
      ),
      statementOfAccount: getUploadDefaultValue<UploadSchemaKey>(
        'statementOfAccount',
        defaultData?.documents,
      ),
      boardResolution: getUploadDefaultValue<UploadSchemaKey>(
        'boardResolution',
        defaultData?.documents,
      ),
      deliveryNote: getUploadDefaultValue<UploadSchemaKey>('deliveryNote', defaultData?.documents),
      pastSupplies: getUploadDefaultValue<UploadSchemaKey>('pastSupplies', defaultData?.documents),
      invoiceStampedByPrincipal: getUploadDefaultValue<UploadSchemaKey>(
        'invoiceStampedByPrincipal',
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
      name: 'Upload Invoice Stamped by Principal',
      setValue: (value: File) =>
        setValue('invoiceStampedByPrincipal', value, { shouldValidate: true }),
      errorMessage: errors?.invoiceStampedByPrincipal?.message || '',
      value: values.invoiceStampedByPrincipal,
      key: 'invoiceStampedByPrincipal',
    },
    {
      name: 'Upload Audited Financial Statement',
      setValue: (value: File) =>
        setValue('auditedFinancialStatement', value, { shouldValidate: true }),
      errorMessage: errors?.auditedFinancialStatement?.message || '',
      value: values.auditedFinancialStatement,
      key: 'auditedFinancialStatement',
    },
    {
      name: 'Upload Statement Of Account',
      setValue: (value: File) => setValue('statementOfAccount', value, { shouldValidate: true }),
      errorMessage: errors?.statementOfAccount?.message || '',
      value: values.statementOfAccount,
      key: 'statementOfAccount',
    },
    {
      name: 'Upload Company or Management Profile',
      setValue: (value: File) => setValue('managementProfile', value, { shouldValidate: true }),
      errorMessage: errors?.managementProfile?.message || '',
      value: values.managementProfile,
      key: 'managementProfile',
    },
    {
      name: 'Upload Evience of Past Supplies',
      setValue: (value: File) => setValue('pastSupplies', value, { shouldValidate: true }),
      errorMessage: errors?.pastSupplies?.message || '',
      value: values.pastSupplies,
      key: 'pastSupplies',
    },
    {
      name: 'Upload Formal Application/Board Resolution',
      setValue: (value: File) => setValue('boardResolution', value, { shouldValidate: true }),
      errorMessage: errors?.boardResolution?.message || '',
      value: values.boardResolution,
      key: 'boardResolution',
    },
    {
      name: 'Upload Copy Of Delivery Note',
      setValue: (value: File) => setValue('deliveryNote', value, { shouldValidate: true }),
      errorMessage: errors?.deliveryNote?.message || '',
      value: values.deliveryNote,
      key: 'deliveryNote',
    },
    {
      name: 'Upload Profitability Analysis / Cashloop projection',
      setValue: (value: File) => setValue('profitabilityAnalysis', value, { shouldValidate: true }),
      errorMessage: errors?.profitabilityAnalysis?.message || '',
      value: values.profitabilityAnalysis,
      key: 'profitabilityAnalysis',
    },
    {
      name: 'Upload Additional Document (optional)',
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

  const onSubmit: SubmitHandler<UploadInvoiceDiscountingSchemaType> = async () => {
    const mergedData = { ...defaultData, documents } satisfies InvoiceDiscountingType;

    const transformedData = {
      loanAmount: convertToNumber(mergedData?.requestAmount ?? ''),
      docLinks: await Promise.all(
        filteredUploadFileClass.map(async item => ({
          name: item.name,
          link: await fileToBase64(item.value),
        })),
      ),
      loanOriginator: 'KATSU_FINANCE',
      paymentTenorInDays: convertToNumber(mergedData?.loanTenor ?? ''),
      productCategory: LoanProductCategoryEnum.InvoiceDiscounting,
      offTakerAddress: defaultData?.counterPartyAddress ?? '',
      offTakerEmail: defaultData?.counterPartyEmailAddress ?? '',
      offTakerName: defaultData?.counterPartyName ?? '',
      invoiceIssuedDate: dayjs(defaultData?.invoiceDate ?? '').format('YYYY-MM-DD'),
    } satisfies InvoiceDiscountingDTO;

    await loanApply<InvoiceDiscountingDTO>(transformedData, () => {
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
