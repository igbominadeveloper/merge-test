'use client';

import EyeClose from '@/assets/icons/eyeClose.svg';
import EyeOpen from '@/assets/icons/eyeOpen.svg';
import { IconButton, InputAdornment, InputProps, TextFieldProps } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import TextInput from '@/shared/Form/TextInput';

const FilledInputProps = (
  isShow: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
): InputProps => ({
  disableUnderline: true,
  endAdornment: (
    <InputAdornment position="end" sx={{ marginRight: '16px' }}>
      <IconButton aria-label="toggle password" edge="end" onClick={() => setShow(!isShow)}>
        {isShow ? <Image src={EyeOpen} alt="eye open" /> : <Image src={EyeClose} alt="eye close" />}
      </IconButton>
    </InputAdornment>
  ),
});

type BasicPasswordInputType = {
  isError?: boolean;
  errorMessage?: string;
} & TextFieldProps;

function BasicPasswordInput(props: BasicPasswordInputType) {
  const { isError, label, value, ...rest } = props;
  const [isShow, setShow] = useState(false);
  return (
    <TextInput
      fullWidth
      variant="filled"
      type={isShow ? 'text' : 'password'}
      InputProps={FilledInputProps(isShow, setShow)}
      label={label}
      value={value}
      error={isError}
      {...rest}
    />
  );
}

export default BasicPasswordInput;
