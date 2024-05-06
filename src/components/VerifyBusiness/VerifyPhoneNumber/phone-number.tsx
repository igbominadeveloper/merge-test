import { zodResolver } from '@hookform/resolvers/zod';
import CallIcon from '@mui/icons-material/Call';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  PhoneNumberSchema,
  PhoneNumberSchemaType,
} from '@/lib/validations/auth/phone-number.schema';
import TextInput from '@/shared/Form/TextInput';
import Button from '@/shared/Form/Button';
import { useUserProfile } from '@/services/queries/user';

interface Props {
  loading: boolean;
  cancelHandler: () => void;
  submitHandler: (data: PhoneNumberSchemaType) => void;
}

export default function PhoneNumber(props: Props) {
  const { cancelHandler, submitHandler, loading } = props;
  const { data: user } = useUserProfile();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneNumberSchemaType>({
    resolver: zodResolver(PhoneNumberSchema),
    defaultValues: {
      // the API returns the phone number with the country code but they don't allow sending it with it
      // so we will remove it temporarily here
      phone: `0${user?.phone.slice(3)}`,
    },
  });

  const onSubmit: SubmitHandler<PhoneNumberSchemaType> = async data => {
    submitHandler(data);
    return data;
  };

  return (
    <div className="flex flex-col items-center">
      <CallIcon className="my-6 text-grey-900" sx={{ width: 60, height: 60 }} />
      <h2 className="mb-4 text-2xl font-semibold">Phone Number</h2>
      <p className="text-grey-900">To verify, enter your 11-digit phone number</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 w-full">
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <TextInput
              {...field}
              fullWidth
              label="Phone Number"
              disabled={loading}
              isError={!!errors.phone}
              onBlur={field.onBlur}
              errorMessage={errors.phone?.message}
            />
          )}
        />

        <div className="mt-10 flex w-full flex-col gap-4 md:flex-row">
          <Button
            className="w-full"
            text="Cancel"
            disabled={loading}
            variant="secondary"
            onClick={cancelHandler}
            type="button"
          />
          <Button className="w-full" text="Verify" type="submit" isLoading={loading} />
        </div>
      </form>
    </div>
  );
}
