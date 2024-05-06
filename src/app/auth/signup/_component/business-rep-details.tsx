'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/shared/Form/Button';
import { MenuItem } from '@mui/material';
import DatePickerInput from '@/shared/Form/DatepickerInput';
import dayjs from 'dayjs';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '@/shared/Form/TextInput';
import MuiSelectComponent from '@/shared/Form/FormSubcomponent/SelectComponent';
import { PasswordWithChecks } from '@/shared/Form/password-input';
import useAuthFns from '@/hooks/useAuthFns';
import { useFetchCities, useFetchStates } from '@/services/queries/location';
import { SignupDto } from '@/types/auth';
import { BusinessCategoryEnum, BusinessTypeEnum } from '@/types/user';
import { SignUpDataType } from './types';
import { BusinessRepSchema, BusinessRepType } from '../_validation';

interface IStep {
  detailsData: SignUpDataType;
  onBack: () => void;
  setDetailsData: React.Dispatch<React.SetStateAction<SignUpDataType>>;
}

export default function BusinessRepDetails({ detailsData, onBack, setDetailsData }: IStep) {
  const { signup, loading } = useAuthFns();

  const {
    handleSubmit,
    getValues,
    control,
    formState: { errors, isValid, isDirty },
    watch,
    setValue,
  } = useForm<BusinessRepType>({
    resolver: zodResolver(BusinessRepSchema),
    mode: 'all',
    defaultValues: {
      address: detailsData?.address || '',
      dob: detailsData?.dob ? new Date(detailsData?.dob) : undefined,
      username: detailsData?.username || '',
      firstname: detailsData?.firstname || '',
      gender: detailsData?.gender || '',
      lastname: detailsData?.lastname || '',
      lga: detailsData?.lga || '',
      password: '',
      phone: detailsData?.phone || '',
      state: detailsData?.state || '',
    },
  });

  const watchedForm = watch();
  const watchedState = watchedForm.state;
  const { data: states, isFetching } = useFetchStates('NG');
  const { data: cities, isFetching: isFetchingCities } = useFetchCities('NG', watchedState);

  const onSubmit: SubmitHandler<BusinessRepType> = async data => {
    const mergedData = { ...detailsData, ...data } satisfies SignUpDataType;
    setDetailsData(mergedData);

    const userPayload = {
      firstName: mergedData.firstname,
      lastName: mergedData.lastname,
      address: mergedData.address,
      gender: mergedData.gender.toUpperCase(),
      password: mergedData.password,
      phone: mergedData.phone,
      dob: dayjs(mergedData.dob).format('YYYY-MM-DD'),
      state: {
        name: states?.find(state => state.isoCode === watchedState)?.name ?? '',
        code: mergedData?.state,
      },
      country: {
        code: 'NG',
        name: 'Nigeria',
        currency: 'NGN',
      },
      username: mergedData.username,
      city: {
        name: mergedData.lga,
        code: mergedData.lga?.slice(0, 2)?.toUpperCase(),
      },
      businessRequestDto: {
        name: mergedData?.businessName ?? '',
        email: mergedData?.username,
        phone: mergedData?.phone,
        industry: mergedData?.businessType ?? BusinessTypeEnum.Enum['Sole Proprietor'],
        businessAddress: mergedData?.businessAdress ?? '',
        category:
          mergedData.businessType === BusinessTypeEnum.Enum['Sole Proprietor']
            ? BusinessCategoryEnum.Enum.REGISTERED_BUSINESS
            : BusinessCategoryEnum.Enum.REGISTERED_COMPANY,
      },
    } satisfies SignupDto;

    await signup(userPayload);
  };

  const twoGrid = 'flex gap-y-6 gap-x-[14px]';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6" autoComplete="off">
      <div className={twoGrid}>
        <Controller
          control={control}
          name="firstname"
          render={({ field }) => (
            <TextInput
              {...field}
              type="text"
              fullWidth
              isError={!!errors.firstname}
              label="First Name"
              variant="filled"
              errorMessage={errors?.firstname?.message || ''}
            />
          )}
        />

        <Controller
          control={control}
          name="lastname"
          render={({ field }) => (
            <TextInput
              {...field}
              type="text"
              fullWidth
              isError={!!errors.lastname}
              label="Last Name"
              variant="filled"
              errorMessage={errors?.lastname?.message || ''}
            />
          )}
        />
      </div>

      <div className={twoGrid}>
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
                label="Date of Birth"
                className=""
              />
            );
          }}
        />

        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <MuiSelectComponent
              {...field}
              fullWidth
              isError={!!errors.gender}
              label="Gender"
              variant="filled"
              errorMessage={errors?.gender?.message || ''}
              className="w-full"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </MuiSelectComponent>
          )}
        />
      </div>

      <Controller
        control={control}
        name="phone"
        render={({ field }) => (
          <TextInput
            {...field}
            fullWidth
            isError={!!errors.phone}
            label="Phone Number"
            variant="filled"
            errorMessage={errors?.phone?.message || ''}
            type="number"
          />
        )}
      />

      <Controller
        control={control}
        name="username"
        render={({ field }) => (
          <TextInput
            {...field}
            type="email"
            fullWidth
            isError={!!errors.username}
            label="Email Address"
            variant="filled"
            errorMessage={errors?.username?.message || ''}
          />
        )}
      />

      <div className={twoGrid}>
        <Controller
          control={control}
          name="state"
          render={({ field }) => (
            <MuiSelectComponent
              {...field}
              fullWidth
              isError={!!errors.state}
              label="State"
              variant="filled"
              onChange={e => {
                setValue('lga', '');
                field.onChange(e);
              }}
              errorMessage={errors?.state?.message || ''}
              className="w-full"
            >
              {isFetching ? (
                <MenuItem value="">Loading...</MenuItem>
              ) : (
                Array.isArray(states) &&
                states.map((state, id) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <MenuItem key={`${state.name}--${id}`} value={state.isoCode}>
                    {state.name}
                  </MenuItem>
                ))
              )}
            </MuiSelectComponent>
          )}
        />

        <Controller
          control={control}
          name="lga"
          render={({ field }) => (
            <MuiSelectComponent
              {...field}
              fullWidth
              isError={!!errors.lga}
              label="LGA"
              variant="filled"
              errorMessage={errors?.lga?.message || ''}
              className="w-full"
            >
              {isFetchingCities ? (
                <MenuItem value="">Loading...</MenuItem>
              ) : (
                Array.isArray(cities) &&
                cities.map((city, id) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <MenuItem key={`${city.name}--${id}`} value={city.name}>
                    {city.name}
                  </MenuItem>
                ))
              )}
            </MuiSelectComponent>
          )}
        />
      </div>

      <Controller
        control={control}
        name="address"
        render={({ field }) => (
          <TextInput
            {...field}
            type="text"
            fullWidth
            isError={!!errors.address}
            label="Address"
            variant="filled"
            errorMessage={errors?.address?.message || ''}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <PasswordWithChecks
            {...field}
            fullWidth
            label="Password"
            onBlur={field.onBlur}
            isError={!!errors.password}
            errorMessage={errors.password?.message}
          />
        )}
      />

      <div className="flex w-full gap-6">
        <Button
          text="Go back"
          type="button"
          variant="secondary"
          ariaLabel="Go back"
          onClick={() => {
            onBack();
            setDetailsData({ ...detailsData, ...watchedForm });
          }}
          className="w-full"
        />

        <Button
          text="Create Account"
          ariaLabel="Create Account"
          type="submit"
          className="w-full"
          isLoading={loading.REGISTER}
          disabled={!isDirty || !isValid || loading.REGISTER}
        />
      </div>
    </form>
  );
}
