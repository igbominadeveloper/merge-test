'use client';

import ModalComponent from '@/shared/Modal';
import icon from '@/assets/icons/bank-icon.svg';
import Image from 'next/image';
import React, { useState } from 'react';
import {
  VerifyBvnSchema,
  VerifyBvnType,
} from '@/lib/validations/verify-business/verify-business.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import TextInput from '@/shared/Form/TextInput';
import Button from '@/shared/Form/Button';
import { verifyBVN } from '@/services/clients/kyc';
import { useUserProfile } from '@/services/queries/user';
import getErrorMessage from '@/utils/getErrorMessage';
import { useNotification } from '@/shared/Notification';

type Props = {
  open: boolean;
  handleClose: () => void;
};

function VerifyBvn({ open, handleClose }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyBvnType>({ resolver: zodResolver(VerifyBvnSchema) });
  const { data: user, refetch } = useUserProfile();
  const [isLoading, setIsLoading] = useState(false);
  const { onMessage } = useNotification();

  const onSubmit: SubmitHandler<VerifyBvnType> = async data => {
    if (!user) return;
    setIsLoading(true);

    try {
      await verifyBVN(user._id, data.bvn, user.dob);
      onMessage('BVN has been verified successfully!');
      await refetch();
      handleClose();
      return data;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      onMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalComponent
      open={open}
      onClose={handleClose}
      evenPadding
      disableBackropClick
      disableEscapeKeyDown
      style={{ maxWidth: '400px', width: '100%', padding: '20px 20px 30px' }}
    >
      <Image src={icon} alt="" className="m-auto mt-5 block" />
      <p className="mt-2 text-center text-[24px] font-semibold">BVN</p>
      <p className="text-center text-textColor-main">
        To verify, enter your bank verification number
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <Controller
          control={control}
          name="bvn"
          render={({ field }) => (
            <TextInput
              {...field}
              fullWidth
              disabled={isLoading}
              label="Bank Verification Number (BVN)"
              isError={!!errors.bvn}
              onBlur={field.onBlur}
              errorMessage={errors.bvn?.message}
            />
          )}
        />
        <div className="mt-10 flex w-full flex-col gap-4 md:flex-row">
          <Button
            className="w-full justify-center rounded-lg bg-[#f4f6f8] text-[15px]"
            text="Cancel"
            variant="secondary"
            disabled={isLoading}
            handleClick={handleClose}
          />
          <Button
            className="w-full justify-center rounded-lg text-[15px]"
            text="Verify"
            isLoading={isLoading}
            type="submit"
          />
        </div>
      </form>
    </ModalComponent>
  );
}

export default VerifyBvn;
