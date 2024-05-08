'use client';

import { InputLabelProps, TextField, TextFieldProps, styled } from '@mui/material';
import Error from '@/assets/icons/error.svg';
import Image from 'next/image';
import { forwardRef } from 'react';

export const inputLabelOptions: InputLabelProps = {
  sx: {
    fontSize: '14px',
    lineHeight: '25px',
    color: '#5C6F7F',
    fontFamily: 'var(--primary)',
  },
};

type TextInputType = {
  isError?: boolean;
  errorMessage?: string;
} & TextFieldProps;

const TextInput = styled(
  forwardRef<HTMLDivElement, TextInputType>((props, ref) => {
    const { isError, errorMessage, ...rest } = props;
    return (
      <div className="w-full">
        <TextField
          ref={ref}
          InputProps={{ ...props.InputProps, disableUnderline: true }}
          InputLabelProps={{
            ...props.InputLabelProps,
            ...inputLabelOptions,
          }}
          error={props.isError}
          variant="filled"
          autoComplete="off"
          {...rest}
        />

        {isError ? (
          <div className="mt-2 flex items-center gap-1 pl-3 text-[12px] text-error-600">
            <Image src={Error} alt="error sign" />
            {errorMessage}
          </div>
        ) : null}
      </div>
    );
  }),
)(({ theme }) => ({
  '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input': {
    borderBottom: '0 !important', // Remove underline
  },
  '& .MuiFilledInput-root': {
    fontSize: '16px',
    borderRadius: 8,
    borderColor: '#E0E3E7',
    backgroundColor: 'rgba(145, 158, 171, 0.08)',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    fontFamily: 'var(--primary)',
  },

  '& .Mui-error ': {
    backgroundColor: '#FF563014',
    '& .MuiInputLabel-root': {
      color: '#FF5630',
    },
  },
  '& .Mui-error .MuiInputLabel-root ': {
    backgroundColor: 'transparent',
    color: '#FF5630',
  },

  '& input:disabled': {
    backgroundColor: '#f6f7f8',
    borderRadius: 8,
    webkitTextFillColor: '#333 !important',
    opacity: '0.8 !important',
  },
  '& .Mui-disabled': {
    opacity: '1 !important',
    color: '#5C6F7F !important',
  },
}));

export default TextInput;
