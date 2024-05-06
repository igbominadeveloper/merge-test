'use client';

import dayjs from 'dayjs';
import DatePickerInput from '@/shared/Form/DatepickerInput';
import TextInput from '@/shared/Form/TextInput';
import { Controller, useForm } from 'react-hook-form';
import { useUserProfile } from '@/services/queries/user';
import { BusinessDetailSchemaType } from '../../_validations/schema';

function BusinessDetails() {
  const { data } = useUserProfile();
  const business = data?.businesses?.at(0);

  const {
    control,
    formState: { errors },
    getValues,
  } = useForm<BusinessDetailSchemaType>({
    defaultValues: {
      businessAddress: business?.address?.name || '',
      businessName: business?.name || '',
      businessType:
        business?.kycDetails.businessDetails.incorporationType === 'BN'
          ? 'Registered Business'
          : 'Registered Company' || '',
      regDate:
        new Date(business?.kycDetails?.businessDetails?.registeredDate as string) || undefined,
      regNumber: business?.kycDetails?.businessDetails?.incorporationNumber || '',
    },
    mode: 'all',
  });

  return (
    <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
      <h3 className="flex-shrink-0 text-[20px] font-medium  sm:text-xl">Business Information</h3>

      <form className="flex w-full flex-col space-y-6">
        <Controller
          control={control}
          name="businessName"
          render={({ field }) => (
            <TextInput
              {...field}
              fullWidth
              value={field.value ? field.value : ''}
              label="Business Name"
              isError={!!errors.businessName}
              errorMessage={errors.businessName?.message}
              disabled
            />
          )}
        />

        <Controller
          control={control}
          name="businessType"
          render={({ field }) => (
            <TextInput
              {...field}
              fullWidth
              label="Business Type"
              value={field.value ? field.value : ''}
              isError={!!errors.businessType}
              errorMessage={errors.businessType?.message}
              disabled
            />
          )}
        />

        <Controller
          control={control}
          name="businessAddress"
          render={({ field }) => (
            <TextInput
              {...field}
              fullWidth
              value={field.value ? field.value : ''}
              label="Business Address"
              isError={!!errors.businessAddress}
              errorMessage={errors.businessAddress?.message}
              disabled
            />
          )}
        />

        <Controller
          control={control}
          name="regDate"
          render={({ field }) => {
            const value = getValues('regDate') || null;
            return (
              <DatePickerInput
                isError={!!errors.regDate}
                errorMessage={errors.regDate?.message}
                {...field}
                value={dayjs(value)}
                onChange={date => {
                  const newDate = new Date(date as unknown as Date);
                  field.onChange(newDate);
                }}
                label="Registration Date"
                className=""
                disabled
              />
            );
          }}
        />

        <Controller
          control={control}
          name="regNumber"
          render={({ field }) => (
            <TextInput
              {...field}
              fullWidth
              value={field.value ? field.value : ''}
              label="Registration Number"
              isError={!!errors.regNumber}
              errorMessage={errors.regNumber?.message}
              disabled
            />
          )}
        />
      </form>
    </div>
  );
}
export default BusinessDetails;
