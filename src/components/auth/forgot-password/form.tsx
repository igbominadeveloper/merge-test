import TextInput from '@/shared/Form/TextInput';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { ForgotPasswordSchemaType } from '@/lib/validations/auth/forgotPassword.schema';
import { FormEventHandler } from 'react';
import Button from '@/shared/Form/Button';
import SuccessModal from '@/shared/SuccessModal';

interface Props {
  isValid: boolean;
  requestSent: boolean;
  control: Control<ForgotPasswordSchemaType>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  errors: FieldErrors<ForgotPasswordSchemaType>;
  goToOtpPage: () => void;
  isLoadingRequest: boolean;
}

export default function ForgotPasswordForm(props: Props) {
  const { isValid, handleSubmit, control, errors, requestSent, goToOtpPage, isLoadingRequest } =
    props;

  return (
    <div className="grid w-full place-items-center">
      <form onSubmit={handleSubmit}>
        <p className="mb-6 text-sm text-secondary-400">
          {`Please enter the email address associated with your account. We'll send you an OTP to
          reset your password.`}
        </p>

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextInput
              {...field}
              fullWidth
              label="Email Address"
              value={field.value ?? ''}
              isError={!!errors.email}
              onBlur={field.onBlur}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Button
          className="mt-6 h-[54px] w-full justify-center rounded-lg bg-primary-main px-4 text-white hover:bg-grey-800"
          disabled={!isValid || isLoadingRequest}
          text="Send Request"
          type="submit"
          isLoading={isLoadingRequest}
        />
      </form>

      {requestSent && (
        <SuccessModal
          buttonLabel="Continue"
          onButtonClick={goToOtpPage}
          heading="Request Sent Successfully"
          subHeading="We’ve sent an OTP to your registered email address"
          open={requestSent}
        />
      )}
    </div>
  );
}
