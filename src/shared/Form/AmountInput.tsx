'use client';

import { forwardRef } from 'react';
import Image from 'next/image';
import Error from '@/assets/icons/error.svg';
import { NumericFormat } from 'react-number-format';
import { TextFieldProps } from '@mui/material';
import TextInput from './TextInput';

type TextInputType = {
  isError?: boolean;
  errorMessage?: string;
  value: string;
} & TextFieldProps;

const AmountInput = forwardRef<HTMLDivElement, TextInputType>((props, ref) => {
  const { isError, errorMessage, ...rest } = props;

  return (
    <div className="w-full">
      <NumericFormat
        thousandSeparator
        prefix="₦"
        getInputRef={ref}
        {...rest}
        type="text"
        error={props.isError}
        customInput={TextInput}
        autoComplete="off"
        defaultValue=""
      />

      {isError ? (
        <div className="mt-2 flex items-center gap-1 pl-3 text-[12px] text-error-600">
          <Image src={Error} alt="error sign" />
          {errorMessage}
        </div>
      ) : null}
    </div>
  );
});

export default AmountInput;
