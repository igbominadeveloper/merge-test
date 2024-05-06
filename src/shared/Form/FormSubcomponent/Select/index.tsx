import { FormControl, FormHelperText, InputLabel, Select } from '@mui/material';
import { forwardRef, ReactNode } from 'react';
import { inputLabelProps, formHelperTextProps } from '@/shared/Form/utils';

interface MuiSelectProps {
  value: string | string[] | undefined;
  children: ReactNode[];
  multiple?: boolean;
  label: string;
  error?: boolean;
  testId?: { 'data-testid': string };
  helperText?: string;
  variant?: 'filled' | 'outlined' | 'standard';
  fullWidth?: boolean;
  onChange?: (e: any) => any;
}

const style = {
  '&.MuiInputBase-root.MuiFilledInput-root': {
    background: 'rgba(145, 158, 171, 0.08)',
    borderRadius: '8px',
    color: '#4B5B5B',
    fontSize: '14px',
    border: 'none',
    '&:hover:before': {
      borderColor: 'transparent',
    },
  },

  '&.MuiInputBase-root.MuiFilledInput-root.Mui-error .MuiFilledInput-notchedOutline': {
    borderColor: ' #FF5630',
  },
  '&.MuiInputBase-root.MuiFilledInput-root:after': {
    borderBottomColor: 'transparent',
  },
  '&.MuiInputBase-root.MuiFilledInput-root:before': {
    borderBottomColor: 'transparent',
  },
  '&.MuiInputBase-root.MuiFilledInput-root:after:hover': {
    borderBottomColor: 'transparent',
  },
  '&.MuiInputBase-root.MuiFilledInput-root:before:hover': {
    borderBottomColor: 'transparent',
  },
};

function MuiSelect(props: MuiSelectProps, ref: any) {
  const {
    children,
    multiple,
    testId,
    label,
    variant,
    fullWidth,
    value,
    helperText,
    error,
    ...rest
  } = props;
  const renderValue = multiple
    ? (select: string | string[]) => (Array.isArray(select) ? select.join(' , ') : select)
    : undefined;

  return (
    <FormControl error={error} variant={variant || 'outlined'} fullWidth={fullWidth}>
      <InputLabel
        id={`select-filled-${label}`}
        sx={{ background: 'transparent', padding: '0 4px', ...inputLabelProps?.sx }}
      >
        {label}
      </InputLabel>
      <Select
        {...rest}
        ref={ref}
        inputProps={testId}
        renderValue={renderValue}
        labelId={`select-filled-${label}`}
        defaultValue=""
        sx={{
          height: '53px',
          marginBottom: { md: 0 },
          ...style,

          '&.MuiInputBase-input.MuiSelect-filled': {
            fontSize: '14px',
            paddingLeft: '14px',
            color: '#212B36 ',
            '&:focus': {
              background: 'rgba(145, 158, 171, 0.08)',
              borderRadius: '8px',
            },
          },
        }}
        multiple={multiple}
        value={value}
      >
        {children}
      </Select>
      {!!helperText && <FormHelperText sx={formHelperTextProps?.sx}>{helperText}</FormHelperText>}
    </FormControl>
  );
}

const SelectInput = forwardRef(MuiSelect);

export default SelectInput;
