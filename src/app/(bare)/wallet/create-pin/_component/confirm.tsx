'use client';

import useTrxFns from '@/hooks/useTrxFns';
import Button from '@/shared/Form/Button';
import OtpInput, { baseTextFieldProps } from '@/shared/Form/FormSubcomponent/OtpInput';
import { useEffect, useState } from 'react';

type ConfirmTrxPinType = {
  pin: string;
  setPin: React.Dispatch<React.SetStateAction<string>>;
  onNext: () => void;
  initialPin: string;
};

function ConfirmTrxPin({ pin, setPin, onNext, initialPin }: ConfirmTrxPinType) {
  const [errorMessage, setErrorMessage] = useState('');
  const { createPin, loading } = useTrxFns();

  useEffect(() => {
    if (pin !== initialPin) {
      setErrorMessage('Confirm pin and create pin do not match');
    }
  }, [pin, initialPin]);

  const onSubmit = async (_pin: string) => {
    await createPin({ pin: _pin, type: 'OTP' }, onNext);
  };

  const handleChange = (input: string) => {
    setPin(input);
    setErrorMessage('');

    if (input.length === 6) {
      onSubmit(input);
    }
  };

  return (
    <>
      <div className="mt-5 flex flex-col justify-center rounded-lg py-5">
        <OtpInput
          value={pin}
          onChange={handleChange}
          length={6}
          borderDotted
          TextFieldsProps={{
            ...baseTextFieldProps,
            InputProps: { ...baseTextFieldProps?.InputProps, type: 'password' },
          }}
        />

        {pin.length === 6 && <p className="mt-2 text-sm text-error-600">{errorMessage}</p>}
      </div>

      <Button
        text="Confirm Pin"
        className="w-full"
        type="button"
        disabled={pin.length !== 6 || pin !== initialPin || loading.CREATE_PIN}
        onClick={() => onSubmit(pin)}
        isLoading={loading.CREATE_PIN}
      />
    </>
  );
}

export default ConfirmTrxPin;
