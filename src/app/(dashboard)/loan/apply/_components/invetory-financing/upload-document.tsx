'use client';

import { useState } from 'react';
import Button from '@/shared/Form/Button';
import UploadCard from '@/app/(dashboard)/loan/_components/upload-card';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UploadInventoryFinancingSchema,
  UploadInventoryFinancingSchemaType,
} from '@/app/(dashboard)/loan/apply/_validation';
import SuccessModal from '@/shared/SuccessModal';
import { useRouter } from 'next/navigation';
import { getUploadDefaultValue } from '@/utils/loans';
import {
  LoanApplicationDTO,
  LoanType,
  LoanProductCategoryEnum,
  UploadFileArrType,
} from '@/types/loan';
import { convertToNumber } from '@/utils/general';
import fileToBase64 from '@/utils/convertFileToBase64';
import useLoanFns from '@/hooks/useLoanFns';
import { InventoryFinancingType, UploadSchemaKey } from './types';

type Props = {
  onBack: () => void;
  setData: React.Dispatch<React.SetStateAction<InventoryFinancingType>>;
  defaultData: InventoryFinancingType;
};

function UploadDocument({ onBack, setData, defaultData }: Props) {
  const router = useRouter();
  const { loanApply, loading } = useLoanFns();
  const [openModal, setOpenModal] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<UploadInventoryFinancingSchemaType>({
    mode: 'all',
    resolver: zodResolver(UploadInventoryFinancingSchema),
    defaultValues: {
      auditedFinancialStatement: getUploadDefaultValue<UploadSchemaKey>(
        'auditedFinancialStatement',
        defaultData?.documents,
      ),
      executedContracts: getUploadDefaultValue<UploadSchemaKey>(
        'executedContracts',
        defaultData?.documents,
      ),
      invoice: getUploadDefaultValue<UploadSchemaKey>('invoice', defaultData?.documents),
      managementProfile: getUploadDefaultValue<UploadSchemaKey>(
        'managementProfile',
        defaultData?.documents,
      ),
      statementOfAccount: getUploadDefaultValue<UploadSchemaKey>(
        'statementOfAccount',
        defaultData?.documents,
      ),
      tradeContractAgreement: getUploadDefaultValue<UploadSchemaKey>(
        'tradeContractAgreement',
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
      name: 'Upload Trade Contract Agreement',
      setValue: (value: File) => setValue('tradeContractAgreement', value),
      errorMessage: errors?.tradeContractAgreement?.message || '',
      key: 'tradeContractAgreement',
      value: values.tradeContractAgreement,
    },
    {
      name: 'Upload Invoice',
      setValue: (value: File) => setValue('invoice', value),
      errorMessage: errors?.invoice?.message || '',
      key: 'invoice',
      value: values.invoice,
    },
    {
      name: 'Upload Audited Financial Statement',
      setValue: (value: File) => setValue('auditedFinancialStatement', value),
      errorMessage: errors?.auditedFinancialStatement?.message || '',
      key: 'auditedFinancialStatement',
      value: values.auditedFinancialStatement,
    },
    {
      name: 'Upload a 12 – month Statement of Account',
      setValue: (value: File) => setValue('statementOfAccount', value),
      errorMessage: errors?.statementOfAccount?.message || '',
      key: 'statementOfAccount',
      value: values.statementOfAccount,
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
      name: 'Upload Profitability Analysis / Cashloop projection',
      setValue: (value: File) => setValue('profitabilityAnalysis', value, { shouldValidate: true }),
      errorMessage: errors?.profitabilityAnalysis?.message || '',
      value: values.profitabilityAnalysis,
      key: 'profitabilityAnalysis',
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

  const onSubmit: SubmitHandler<UploadInventoryFinancingSchemaType> = async () => {
    const mergedData = { ...defaultData, documents } satisfies InventoryFinancingType;

    const transformedData = {
      loanAmount: convertToNumber(mergedData?.requestAmount ?? ''),
      productType: mergedData?.productType ?? '',
      loanType: mergedData?.transactionType as LoanType,
      ...(mergedData?.productType?.toLowerCase() === 'other'
        ? { customProductType: mergedData?.product }
        : {
            productList:
              mergedData?.product?.toLowerCase() === 'other'
                ? mergedData?.otherProduct
                : mergedData?.product,
          }),
      loanOriginator: 'KATSU_FINANCE',
      paymentTenorInDays: convertToNumber(mergedData?.loanTenor ?? ''),
      productCategory: LoanProductCategoryEnum.InventoryFinancing,
      logisticsCostPerTruck: convertToNumber(mergedData?.logisticCostPerTruck ?? ''),
      logisticsNumberOfTrucks: convertToNumber(mergedData?.logisticsNumberOfTrucks ?? ''),
      productQuantity: convertToNumber(mergedData?.productQuantity ?? ''),
      productUnit: mergedData?.productUnit ?? '',
      productUnitPurchasePrice: convertToNumber(mergedData?.productUnitPurchasePrice ?? ''),
      productUnitSellingPrice: convertToNumber(mergedData?.productUnitSellingPrice ?? ''),
      docLinks: await Promise.all(
        filteredUploadFileClass.map(async item => ({
          name: item.name,
          link: await fileToBase64(item.value),
        })),
      ),
      offTakerAddress: mergedData?.offTakerAddress ?? '',
      offTakerName: mergedData?.offTakerName ?? '',
      offTakerEmail: mergedData?.offTakerEmailAddress ?? '',
      ...(mergedData?.otherCostAmount
        ? { otherCostAmount: convertToNumber(mergedData?.otherCostAmount ?? '') }
        : {}),
      ...(mergedData?.otherCostDescription
        ? { otherCostDescription: mergedData?.otherCostDescription ?? '' }
        : {}),
    } satisfies LoanApplicationDTO;

    await loanApply<LoanApplicationDTO>(transformedData, () => {
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
              <UploadCard<File>
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
