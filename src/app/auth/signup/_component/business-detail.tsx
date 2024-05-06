'use client';

import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/shared/Form/Button';
import { Checkbox, MenuItem } from '@mui/material';
import TextInput from '@/shared/Form/TextInput';
import MuiSelectComponent from '@/shared/Form/FormSubcomponent/SelectComponent';
import { zodResolver } from '@hookform/resolvers/zod';
import FooterText from '@/shared/Form/FormSubcomponent/FooterText';
import { ROUTES } from '@/utils/routes';
import { useBusinessDetailsStore } from '@/store/state/useBusinessDetails';
import { SignUpDataType } from './types';
import { BusinessDetailSchema, BusinessDetailsType } from '../_validation';
import AgreementLinks from './agreement-links';

interface StepType {
  onNext: () => void;
  setData: React.Dispatch<React.SetStateAction<SignUpDataType>>;
  defaultData: SignUpDataType;
}

export default function BusinessDetails({ onNext, setData, defaultData }: StepType) {
  const {
    formState: { errors, isDirty, isValid },
    control,
    handleSubmit,
    watch,
  } = useForm<BusinessDetailsType>({
    mode: 'all',
    resolver: zodResolver(BusinessDetailSchema),
    defaultValues: {
      businessAdress: defaultData?.businessAdress || '',
      businessName: defaultData?.businessName || '',
      businessType: defaultData?.businessType,
    },
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { updateBusinessDetails } = useBusinessDetailsStore();
  const { businessAdress, businessName, businessType } = watch();

  const onSubmit: SubmitHandler<BusinessDetailsType> = data => {
    setData({ ...defaultData, ...data });
    // we can clear the store now since the form is ready for submission
    updateBusinessDetails({ businessAdress: '', businessName: '', businessType: undefined });
    onNext();
  };

  useEffect(() => {
    // we are persisting this so it can be repopulated when the route changes
    const persistBusinessDetails = (values: BusinessDetailsType) => {
      updateBusinessDetails(values);
    };

    persistBusinessDetails({ businessAdress, businessName, businessType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessAdress, businessName, businessType]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-6">
          <Controller
            control={control}
            name="businessName"
            render={({ field }) => (
              <TextInput
                {...field}
                type="text"
                fullWidth
                isError={!!errors.businessName}
                label="Business Name"
                variant="filled"
                errorMessage={errors?.businessName?.message}
                defaultValue={defaultData?.businessName || ''}
              />
            )}
          />

          <Controller
            control={control}
            name="businessType"
            render={({ field }) => {
              return (
                <MuiSelectComponent
                  {...field}
                  isError={!!errors.businessType}
                  errorMessage={errors.businessType?.message}
                  value={field.value}
                  variant="filled"
                  label="Business Type"
                  defaultValue={defaultData?.businessType || ''}
                >
                  <MenuItem value="Sole Proprietor">Sole Proprietor</MenuItem>
                  <MenuItem value="Limited Liability">Limited Liability</MenuItem>
                </MuiSelectComponent>
              );
            }}
          />

          <Controller
            control={control}
            name="businessAdress"
            render={({ field }) => (
              <TextInput
                {...field}
                type="text"
                fullWidth
                isError={!!errors.businessAdress}
                label="Business Address"
                variant="filled"
                errorMessage={errors?.businessAdress?.message || ''}
                defaultValue={defaultData?.businessAdress || ''}
              />
            )}
          />
        </div>

        <Button
          text="Continue"
          ariaLabel="Continue"
          type="submit"
          className="mt-8 w-full"
          // add !isDirty checks if the getValues() === defaultValue. since there is a default data, we only add it if the dfault data is empty
          disabled={
            !isValid || !acceptedTerms || (Object.values(defaultData! || {}).length < 0 && !isDirty)
          }
        />
      </form>

      <div className="mb-2 mt-8">
        <FooterText text="Already have an account?" linkText="Login" link={ROUTES.login} />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          checked={acceptedTerms}
          sx={{
            '&.MuiButtonBase-root.MuiCheckbox-root.Mui-checked': {
              background: 'rgba(24, 144, 255, 0.12)',
              color: '#1890FF',
            },
          }}
          onChange={event => setAcceptedTerms(event.target.checked)}
        />
        <AgreementLinks />
      </div>
    </div>
  );
}
