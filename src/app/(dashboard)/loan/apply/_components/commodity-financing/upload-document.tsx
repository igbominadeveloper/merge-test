'use client';

import Button from '@/shared/Form/Button';
import UploadCard from '@/app/(dashboard)/loan/_components/upload-card';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UploadCommodityFinancingSchema,
  UploadCommodityFinancingSchemaType,
} from '@/app/(dashboard)/loan/apply/_validation';
import SuccessModal from '@/shared/SuccessModal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  LoanApplicationDTO,
  LoanType,
  LoanProductCategoryEnum,
  UploadFileArrType,
} from '@/types/loan';
import fileToBase64 from '@/utils/convertFileToBase64';
import { getUploadDefaultValue } from '@/utils/loans';
import useLoanFns from '@/hooks/useLoanFns';
import { convertToNumber } from '@/utils/general';
import { CommodityFinancingType, UploadSchemaKey } from './types';

type Props = {
  onBack: () => void;
  setData: React.Dispatch<React.SetStateAction<CommodityFinancingType>>;
  defaultData: CommodityFinancingType;
};

function UploadDocument({ onBack, setData, defaultData }: Props) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const { loanApply, loading } = useLoanFns();

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<UploadCommodityFinancingSchemaType>({
    mode: 'all',
    resolver: zodResolver(UploadCommodityFinancingSchema),
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
      purchaseOrder: getUploadDefaultValue<UploadSchemaKey>(
        'purchaseOrder',
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
      name: 'Upload Purchase Order',
      setValue: (value: File) => setValue('purchaseOrder', value, { shouldValidate: true }),
      errorMessage: errors?.purchaseOrder?.message || '',
      value: values.purchaseOrder,
      key: 'purchaseOrder',
    },
    {
      name: 'Upload Trade Contract Agreement',
      setValue: (value: File) =>
        setValue('tradeContractAgreement', value, { shouldValidate: true }),
      errorMessage: errors?.tradeContractAgreement?.message || '',
      value: values.tradeContractAgreement,
      key: 'tradeContractAgreement',
    },
    {
      name: 'Upload Invoice',
      setValue: (value: File) => setValue('invoice', value, { shouldValidate: true }),
      errorMessage: errors?.invoice?.message || '',
      value: values.invoice,
      key: 'invoice',
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
      name: 'Upload a 12 – month Statement of Account',
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
      name: 'Upload Previously Executed Contracts',
      setValue: (value: File) => setValue('executedContracts', value, { shouldValidate: true }),
      errorMessage: errors?.executedContracts?.message || '',
      value: values.executedContracts,
      key: 'executedContracts',
    },
    {
      name: 'Upload Profitability Analysis / Cashflow projection',
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

  const onSubmit: SubmitHandler<UploadCommodityFinancingSchemaType> = async () => {
    const mergedData = { ...defaultData, documents } satisfies CommodityFinancingType;

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
      productCategory: LoanProductCategoryEnum.CommodityFinancing,
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
