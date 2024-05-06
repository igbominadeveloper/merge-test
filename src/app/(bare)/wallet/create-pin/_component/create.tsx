'use client';

import useTrxFns from '@/hooks/useTrxFns';
import Button from '@/shared/Form/Button';
import OtpInput, { baseTextFieldProps } from '@/shared/Form/FormSubcomponent/OtpInput';
import { useEffect, useState } from 'react';

interface Props {
  onNext: (pin: string) => void;
}

function CreateTransactionPin({ onNext }: Props) {
  const [errorMessage, setErrorMessage] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const { createPin, loading } = useTrxFns();

  useEffect(() => {
    if (pin.length === 6 && confirmPin.length === 6 && pin !== confirmPin) {
      setErrorMessage('The PINs do not match');
    }
  }, [confirmPin, pin]);

  const onSubmit = async (_pin: string) => {
    await createPin({ pin: _pin, type: 'OTP' }, () => onNext(pin));
  };

  const handleChange = (input: string) => {
    setConfirmPin(input);
    setErrorMessage('');
  };

  return (
    <>
      <div className="mt-5 flex flex-col justify-center gap-5 rounded-lg">
        <OtpInput
          value={pin}
          onChange={setPin}
          length={6}
          borderDotted
          TextFieldsProps={{
            ...baseTextFieldProps,
            InputProps: { ...baseTextFieldProps?.InputProps, type: 'password' },
          }}
        />
        <p className="text-textColor-main">Confirm Transaction PIN</p>
        <OtpInput
          value={confirmPin}
          autoFocus={false}
          onChange={handleChange}
          length={6}
          borderDotted
          TextFieldsProps={{
            ...baseTextFieldProps,
            InputProps: { ...baseTextFieldProps?.InputProps, type: 'password' },
          }}
        />
        <p
          className={`mt-2 h-2 text-sm text-error-600 ${errorMessage.length > 0 ? 'opacity-100' : 'opacity-0'}`}
        >
          {errorMessage}
        </p>
      </div>

      <Button
        text="Create PIN"
        className="mt-10 w-full"
        type="button"
        disabled={pin.length !== 6 || pin !== confirmPin || loading.CREATE_PIN}
        onClick={() => onSubmit(pin)}
        isLoading={loading.CREATE_PIN}
      />
    </>
  );
}

export default CreateTransactionPin;
