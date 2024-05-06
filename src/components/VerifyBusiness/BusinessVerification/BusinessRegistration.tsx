'use client';

import icon from '@/assets/icons/folder-icon.svg';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  BusinessRegistrationSchema,
  BusinessRegistrationType,
} from '@/lib/validations/verify-business/business-registration.schema';
import TextInput from '@/shared/Form/TextInput';
import Button from '@/shared/Form/Button';
import DatePickerInput from '@/shared/Form/DatepickerInput';
import dayjs from 'dayjs';
import UploadCard from '@/app/(dashboard)/loan/_components/upload-card';
import {
  useBusinessVerificationState,
  type BusinessVerificationType,
} from './BusinessVerificationContext';

type Props = {
  handleClose: () => void;
  handleNextStep: () => void;
};

function BusinessRegistration({ handleClose, handleNextStep }: Props) {
  const [state, setState] = useBusinessVerificationState();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm<BusinessRegistrationType>({
    resolver: zodResolver(BusinessRegistrationSchema),
    defaultValues: { ...state },
  });

  const onSubmit: SubmitHandler<BusinessRegistrationType> = async data => {
    const currentState = { ...state, ...data } as BusinessVerificationType;
    setState(currentState);
    handleNextStep();
  };

  return (
    <>
      <Image src={icon} alt="" className="m-auto my-5 block" />
      <p className="mt-2 text-center text-[24px] font-semibold">Business Registration Document</p>
      <p className="text-center text-textColor-main">Upload and verify your business documents</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">
        <Controller
          control={control}
          name="registrationNumber"
          render={({ field }) => (
            <TextInput
              {...field}
              fullWidth
              label="Registration Number"
              isError={!!errors.registrationNumber}
              onBlur={field.onBlur}
              errorMessage={errors.registrationNumber?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="registrationDate"
          render={({ field }) => {
            const value = getValues('registrationDate') || null;
            return (
              <DatePickerInput
                isError={!!errors.registrationDate}
                errorMessage={errors.registrationDate?.message}
                {...field}
                maxDate={dayjs()}
                value={dayjs(value)}
                onChange={date => {
                  const newDate = new Date(date as unknown as Date);
                  field.onChange(newDate);
                }}
                label="Registration Date"
              />
            );
          }}
        />

        <Controller
          control={control}
          name="tin"
          render={({ field }) => (
            <TextInput
              {...field}
              fullWidth
              label="TIN"
              isError={!!errors.tin}
              onBlur={field.onBlur}
              errorMessage={errors.tin?.message}
            />
          )}
        />
        <UploadCard<File>
          title="Upload CAC Certificate"
          setValue={selectedFile => setValue('cacDocument', selectedFile, { shouldValidate: true })}
          validationErrorMessage={errors.cacDocument?.message as string}
          clearable
          valueAsString={false}
          value={watch('cacDocument')}
        />

        <div className="mt-10 flex w-full flex-col gap-4 md:flex-row">
          <Button
            className="w-full justify-center rounded-lg bg-[#f4f6f8] text-[15px]"
            text="Cancel"
            variant="secondary"
            type="button"
            handleClick={handleClose}
          />
          <Button
            className="w-full justify-center rounded-lg text-[15px]"
            text="Continue"
            type="submit"
          />
        </div>
      </form>
    </>
  );
}

export default BusinessRegistration;
