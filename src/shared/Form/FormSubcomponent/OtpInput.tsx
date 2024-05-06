import { alpha, styled } from '@mui/material';
import { MuiOtpInput, MuiOtpInputProps } from 'mui-one-time-password-input';

interface Props extends MuiOtpInputProps {
  length?: number;
  borderDotted?: boolean;
  autoFocus?: boolean;
}

export const baseTextFieldProps = {
  variant: 'filled',
  InputProps: {
    disableUnderline: true,
    sx: {
      height: '62px',
      width: { xs: '50px', md: '62px' },
      fontSize: '48px',
      fontWeight: '700',
      padding: 0,
    },
  },
} satisfies MuiOtpInputProps['TextFieldsProps'];

const OtpInput = styled(
  ({
    length = 6,
    TextFieldsProps = baseTextFieldProps,
    autoFocus = true,
    ...otherProps
  }: Props) => (
    <MuiOtpInput
      className="gap-3"
      onComplete={() => null}
      length={length}
      autoFocus={autoFocus}
      validateChar={(value: string) => !Number.isNaN(Number(value))}
      TextFieldsProps={{
        ...TextFieldsProps,
      }}
      {...otherProps}
    />
  ),
)(({ theme, borderDotted }) => ({
  '& .MuiFilledInput-root': {
    padding: 0,
    borderBottom: 0,
    fontSize: '48px',
    overflow: 'hidden',
    height: '62px',
    display: 'flex',
    borderRadius: 8,
    backgroundColor: '#F2F5FA',
    borderColor: '#E0E3E7',
    border: borderDotted && '1px dotted #1890FF',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    '&:hover': {
      borderColor: '#F2F5FA',
    },
    '&.Mui-focused': {
      backgroundColor: '#F2F5FA',
      boxShadow: `${alpha('#F2F5FA', 0.25)} 0 0 0 2px`,
      borderColor: '#E0E3E7',
    },
    input: {
      padding: 0,
    },
  },
  '&.MuiFilledInput-input': {
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
  },
  '& .MuiFilledInput-root.Mui-error': {
    border: `2px solid ${alpha(theme.palette.error.main, 1)}`,
    '&.Mui-focused': {
      boxShadow: `${alpha(theme.palette.error.main, 0.25)} 0 0 0 2px`,
    },
  },
  '*': {
    padding: 0,
  },
}));

export default OtpInput;
