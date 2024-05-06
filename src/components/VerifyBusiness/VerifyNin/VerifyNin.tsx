'use client';

import ModalComponent from '@/shared/Modal';
import icon from '@/assets/icons/user-card.svg';
import Image from 'next/image';
import React, { useState } from 'react';
import {
  VerifyNinSchema,
  VerifyNinType,
} from '@/lib/validations/verify-business/verify-business.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import TextInput from '@/shared/Form/TextInput';
import Button from '@/shared/Form/Button';
import { useUserProfile } from '@/services/queries/user';
import { verifyNIN } from '@/services/clients/kyc';
import { useNotification } from '@/shared/Notification';
import getErrorMessage from '@/utils/getErrorMessage';
import DatePickerInput from '@/shared/Form/DatepickerInput';
import dayjs from 'dayjs';

type Props = {
  open: boolean;
  handleClose: () => void;
};

function VerifyNin({ open, handleClose }: Props) {
  const { data: user, refetch } = useUserProfile();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<VerifyNinType>({
    resolver: zodResolver(VerifyNinSchema),
    defaultValues: {
      dob: dayjs(user?.dob).toDate(),
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { onMessage } = useNotification();

  const onSubmit: SubmitHandler<VerifyNinType> = async data => {
    if (!user) return;
    setIsLoading(true);

    try {
      const dob = dayjs(data.dob).format('YYYY-MM-DD');
      await verifyNIN(user._id, data.nin, dob);
      onMessage('NIN has been verified successfully!');
      await refetch();
      handleClose();
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
      <p className="mt-2 text-center text-[24px] font-semibold">NIN</p>
      <p className="text-center text-textColor-main">
        To verify, enter your National Identification Number
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-5">
        <Controller
          control={control}
          name="nin"
          render={({ field }) => (
            <TextInput
              {...field}
              fullWidth
              disabled={isLoading}
              label="National Identification Number (NIN)"
              isError={!!errors.nin}
              onBlur={field.onBlur}
              errorMessage={errors.nin?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="dob"
          render={({ field }) => {
            const value = getValues('dob') || null;
            return (
              <DatePickerInput
                isError={!!errors.dob}
                disabled={isLoading}
                errorMessage={errors.dob?.message}
                {...field}
                maxDate={dayjs()}
                value={dayjs(value)}
                onChange={date => {
                  const newDate = new Date(date as unknown as Date);
                  field.onChange(newDate);
                }}
                label="Date of Birth"
              />
            );
          }}
        />
        <div className="mt-10 flex w-full flex-col gap-4 md:flex-row">
          <Button
            className="w-full justify-center rounded-lg text-[15px]"
            text="Cancel"
            variant="secondary"
            disabled={isLoading}
            handleClick={handleClose}
          />
          <Button
            isLoading={isLoading}
            className="w-full justify-center rounded-lg text-[15px]"
            text="Verify"
            type="submit"
          />
        </div>
      </form>
    </ModalComponent>
  );
}

export default VerifyNin;
