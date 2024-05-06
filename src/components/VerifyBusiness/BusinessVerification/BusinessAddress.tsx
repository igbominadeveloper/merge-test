'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import icon from '@/assets/icons/folder-icon.svg';
import fileToBase64 from '@/utils/convertFileToBase64';
import TextInput from '@/shared/Form/TextInput';
import Button from '@/shared/Form/Button';
import {
  BusinessAddressSchema,
  BusinessAddressType,
} from '@/lib/validations/verify-business/business-address.schema';
import UploadCard from '@/app/(dashboard)/loan/_components/upload-card';
import {
  BusinessVerificationDto,
  IncorporationTypeEnum,
  submitBusinessVerificationDetails,
} from '@/services/clients/kyc';
import { useUserProfile } from '@/services/queries/user';
import { useNotification } from '@/shared/Notification';
import getErrorMessage from '@/utils/getErrorMessage';
import { BusinessTypeEnum } from '@/types/user';
import {
  BusinessVerificationType,
  useBusinessVerificationState,
} from './BusinessVerificationContext';

type Props = {
  goBack: () => void;
  handleClose: () => void;
};

function BusinessAddress({ goBack, handleClose }: Props) {
  const [state] = useBusinessVerificationState();
  const { data: user, refetch } = useUserProfile();
  const bankingBusiness = user?.businesses.find(business => business.type === 'BANKING');

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BusinessAddressType>({
    resolver: zodResolver(BusinessAddressSchema),
    defaultValues: { ...state, address: bankingBusiness?.address.name ?? '' },
  });
  const [loading, setLoading] = useState(false);
  const { onMessage } = useNotification();
  const router = useRouter();

  const onSubmit: SubmitHandler<BusinessAddressType> = async data => {
    if (!user) return; // we might want to throw an error here

    const formDetails = { ...state, ...data } as BusinessVerificationType;
    setLoading(true);

    try {
      const { _id: id, businesses } = user;
      const {
        _id: businessId,
        type,
        industry,
      } = businesses[0] ?? { _id: '', type: '', industry: '' };

      const incorporationType: BusinessVerificationDto['incorporationType'] =
        industry === BusinessTypeEnum.Enum['Sole Proprietor']
          ? IncorporationTypeEnum.Enum.BN
          : IncorporationTypeEnum.Enum.RC;

      const payload: BusinessVerificationDto = {
        certificateOfIncorporation: await fileToBase64(formDetails.cacDocument),
        proofOfBusinessAddress: await fileToBase64(formDetails.addressDocument),
        operatingAddress: formDetails.address,
        registeredDate: dayjs(formDetails.registrationDate).format('YYYY-MM-DD'),
        natureOfBusiness: type, // TODO I don't know where this comes from yet
        registeredBusinessAddress: formDetails.address,
        incorporationNumber: formDetails.registrationNumber,
        taxIdentificationNumber: formDetails.tin,
        incorporationType,
      };

      const response = await submitBusinessVerificationDetails(id, businessId, payload);
      onMessage(response.data.supportDescriptiveMessage);
      await refetch();
      handleClose();
      router.push('/wallet/created');
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      onMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Image src={icon} alt="" className="m-auto mt-10 block" />
      <p className="mt-2 text-center text-[24px] font-semibold">Proof of Business Address</p>
      <p className="text-center text-textColor-main">
        Upload a utility bill with your business address
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-5">
        <Controller
          control={control}
          disabled={loading}
          name="address"
          render={({ field }) => (
            <TextInput
              {...field}
              fullWidth
              label="Business Address"
              isError={!!errors.address}
              onBlur={field.onBlur}
              errorMessage={errors.address?.message}
            />
          )}
        />
        <UploadCard<File>
          title="Upload Proof of Address"
          valueAsString={false}
          setValue={selectedFile =>
            setValue('addressDocument', selectedFile, { shouldValidate: true })
          }
          validationErrorMessage={errors.addressDocument?.message as string}
          clearable={!loading}
        />
        <div className="mt-10 flex w-full flex-col gap-4 md:flex-row">
          <Button
            className="w-full justify-center rounded-lg bg-[#f4f6f8] text-[15px]"
            text="Back"
            variant="secondary"
            type="button"
            disabled={loading}
            handleClick={goBack}
          />
          <Button
            className="w-full justify-center rounded-lg bg-primary-main text-[15px] text-white"
            text="Verify"
            isLoading={loading}
            type="submit"
          />
        </div>
      </form>
    </>
  );
}

export default BusinessAddress;
