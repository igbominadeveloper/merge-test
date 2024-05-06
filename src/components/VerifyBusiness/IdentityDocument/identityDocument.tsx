'use client';

import ModalComponent from '@/shared/Modal';
import React, { useState } from 'react';
import icon from '@/assets/icons/folder-icon.svg';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  IdentifyDocumentSchema,
  IdentifyDocumentType,
} from '@/lib/validations/verify-business/identify-document.schema';
import Button from '@/shared/Form/Button';
import { MenuItem } from '@mui/material';
import SelectInput from '@/shared/Form/FormSubcomponent/Select';
import VerifyBusinessStore from '@/utils/verify';

import fileToBase64 from '@/utils/convertFileToBase64';
import { submitIdentifyVerification } from '@/services/clients/kyc';
import { useUserProfile } from '@/services/queries/user';
import getErrorMessage from '@/utils/getErrorMessage';
import { useNotification } from '@/shared/Notification';
import UploadCard from '@/app/(dashboard)/loan/_components/upload-card';

type Props = {
  open: boolean;
  handleClose: () => void;
};

export default function IdentityDocument({ open, handleClose }: Props) {
  const { data: user, refetch } = useUserProfile();
  const { documents } = VerifyBusinessStore();
  const [loading, setLoading] = useState(false);
  const { onMessage } = useNotification();

  const documentOptions = documents.map(({ name, id }) => {
    return (
      <MenuItem key={id} value={name}>
        {name}
      </MenuItem>
    );
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<IdentifyDocumentType>({ resolver: zodResolver(IdentifyDocumentSchema) });

  const onSubmit: SubmitHandler<IdentifyDocumentType> = async data => {
    if (!user) return;
    setLoading(true);
    try {
      const identityDoc = await fileToBase64(data.file);
      await submitIdentifyVerification(user._id, data.governmentId, identityDoc);
      await refetch();
      onMessage('Identity verification has been completed!');
      handleClose();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      onMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalComponent
      open={open}
      onClose={handleClose}
      evenPadding
      disableBackropClick
      disableEscapeKeyDown
      style={{ maxWidth: '450px', width: '100%', padding: '20px 20px 30px' }}
    >
      <Image src={icon} alt="" className="m-auto mt-10 block" />
      <p className="mt-2 text-center text-[24px] font-semibold">Identity Document</p>
      <p className="text-center text-textColor-main">Provide and verify your identity document</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-5">
        <Controller
          control={control}
          disabled={loading}
          name="governmentId"
          render={({ field }) => (
            <SelectInput
              {...field}
              fullWidth
              testId={{ 'data-testid': 'select-input' }}
              error={!!errors.governmentId}
              label="Government-issued ID"
              variant="filled"
              helperText={errors?.governmentId?.message || ''}
            >
              {documentOptions}
            </SelectInput>
          )}
        />

        <UploadCard<File>
          title={`Upload ${watch('governmentId') ?? 'Identity Document'}`}
          valueAsString={false}
          setValue={selectedFile => setValue('file', selectedFile, { shouldValidate: true })}
          validationErrorMessage={errors.file?.message as string}
          clearable={!loading}
        />
        <p>{errors.governmentId?.message}</p>
        <div className="mt-5 flex w-full flex-col gap-4 md:flex-row">
          <Button
            className="w-full justify-center rounded-lg bg-[#f4f6f8] text-[15px]"
            text="Cancel"
            variant="secondary"
            disabled={loading}
            type="button"
            handleClick={handleClose}
          />
          <Button
            className="w-full justify-center rounded-lg text-[15px]"
            text="Verify"
            isLoading={loading}
            type="submit"
          />
        </div>
      </form>
    </ModalComponent>
  );
}
