import Error from '@/assets/icons/error.svg';
import { FormControl, InputLabel, Select, SelectProps } from '@mui/material';
import Image from 'next/image';
import { ReactNode, forwardRef } from 'react';

type MuiSelectProps = {
  children: ReactNode;
  label: string;
  isError?: boolean;
  errorMessage?: string;
} & SelectProps;

const MuiSelectComponent = forwardRef<HTMLDivElement, MuiSelectProps>((props, ref) => {
  const { children, label, isError, errorMessage, ...rest } = props;
  return (
    <div className="w-full">
      <FormControl
        sx={{
          width: '100%',
          '& .Mui-error .MuiOutlinedInput-notchedOutline ': {},
        }}
      >
        <InputLabel
          className="text-subTextColor font-dmSans"
          variant="filled"
          sx={{ fontSize: '14px', lineHeight: '25px', padding: '0 6px' }}
          id="test-select-label"
        >
          {label}
        </InputLabel>
        <Select
          ref={ref}
          disableUnderline
          labelId="test-select-label"
          sx={{
            backgroundColor: 'rgba(145, 158, 171, 0.08)',
            borderRadius: '8px',
            paddingLeft: '3px',
            '&:focus': {
              background: 'transparent',
            },
            '&:checked': {
              backgroundColor: 'red',
            },
            '&:active': {
              backgroundColor: 'transparent',
            },
            ':indeterminate': {
              backgroundColor: 'transparent',
            },
            '&  .MuiFormControl-root': {
              backgroundColor: 'transparent',
            },
            '&  .Mui-focused': {
              backgroundColor: 'transparent',
            },

            height: '53px',
            marginBottom: { md: 0 },

            '& .MuiSelect-select:focus': {
              backgroundColor: 'transparent',
            },

            '&.MuiInputBase-input.MuiSelect-filled': {
              fontSize: '14px',
              paddingLeft: '14px',
              color: '#212B36 ',
            },
          }}
          fullWidth
          error={isError}
          slotProps={{
            input: {
              sx: {},
            },
          }}
          {...rest}
        >
          {children}
        </Select>
      </FormControl>
      {isError ? (
        <div className="mt-2 flex items-center gap-1 pl-3 text-[12px] text-error-600">
          <Image src={Error} alt="error sign" />
          {errorMessage}
        </div>
      ) : null}
    </div>
  );
});

export default MuiSelectComponent;
