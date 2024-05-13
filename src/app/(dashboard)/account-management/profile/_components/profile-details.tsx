'use client';

import dayjs from 'dayjs';
import DatePickerInput from '@/shared/Form/DatepickerInput';
import TextInput from '@/shared/Form/TextInput';
import { Controller, useForm } from 'react-hook-form';
import BasicPasswordInput from '@/shared/Form/BasicPasswordInput';
import { useUserProfile } from '@/services/queries/user';
import { ProfileDetailSchemaType } from '../../_validations/schema';

function ProfileDetails() {
  const { data } = useUserProfile();

  const {
    control,
    formState: { errors },
    getValues,
  } = useForm<ProfileDetailSchemaType>({
    defaultValues: {
      bvn: data?.bvn || 'N/A',
      dob: new Date(data?.dob as string),
      firstName: data?.firstName,
      gender: data?.gender === 'MALE' ? 'Male' : 'Female',
      lastName: data?.lastName,
    },
    mode: 'all',
  });

  return (
    <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
      <h3 className="flex-shrink-0 text-[20px] font-medium sm:text-xl">
        Primary Contact Information
      </h3>

      <form className="flex w-full flex-col space-y-6">
        <div className="flex flex-col items-center gap-x-3 gap-y-6 md:flex-row">
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <TextInput
                {...field}
                fullWidth
                value={field.value ? field.value : ''}
                label="First Name"
                isError={!!errors.firstName}
                errorMessage={errors.firstName?.message}
                disabled
              />
            )}
          />

          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <TextInput
                {...field}
                fullWidth
                label="Last Name"
                value={field.value ? field.value : ''}
                isError={!!errors.lastName}
                errorMessage={errors.lastName?.message}
                disabled
              />
            )}
          />
        </div>

        <Controller
          control={control}
          disabled
          name="bvn"
          render={({ field }) => <BasicPasswordInput {...field} fullWidth label="BVN" />}
        />

        <Controller
          control={control}
          name="dob"
          render={({ field }) => {
            const value = getValues('dob') || null;
            return (
              <DatePickerInput
                isError={!!errors.dob}
                errorMessage={errors.dob?.message}
                {...field}
                value={dayjs(value)}
                onChange={date => {
                  const newDate = new Date(date as unknown as Date);
                  field.onChange(newDate);
                }}
                label="Date of Birth (DD/MM/YYYY)"
                className=""
                disabled
              />
            );
          }}
        />

        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <TextInput
              {...field}
              fullWidth
              value={field.value ? field.value : ''}
              label="Gender"
              isError={!!errors.gender}
              errorMessage={errors.gender?.message}
              disabled
            />
          )}
        />
      </form>
    </div>
  );
}
export default ProfileDetails;
