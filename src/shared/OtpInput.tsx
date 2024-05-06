import { alpha, styled } from '@mui/material';
import { MuiOtpInput, MuiOtpInputProps } from 'mui-one-time-password-input';

const OtpInput = styled((props: MuiOtpInputProps) => (
  <MuiOtpInput
    className="gap-3"
    onComplete={() => null}
    length={4}
    autoFocus
    validateChar={(value: string) => !Number.isNaN(Number(value))}
    TextFieldsProps={{
      variant: 'outlined',
      InputProps: {
        disableUnderline: true,
        type: 'password',
        sx: {
          height: '62px',
          width: '62px',
          fontSize: '48px',
          fontWeight: '700',
          padding: 0,
          border: '1px dashed #1977F2',
          borderRadius: '8px',

          '&:focus': {
            border: '1px dashed #1977F2',
          },
        },
      },
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiOutinedInput-root': {
    padding: 0,
    borderBottom: 0,
    fontSize: '48px',
    overflow: 'hidden',
    height: '62px',
    display: 'flex',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#F2F5FA',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    '&:hover': {},
    '&.Mui-focused': {
      backgroundColor: '#F2F5FA',
      boxShadow: `${alpha('#F2F5FA', 0.25)} 0 0 0 2px`,
    },
    input: {
      padding: 0,
      border: 0,
    },
  },
  '&.MuiOutlinedInput-input': {
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
  },
  '& .MuiOutlinedInput-root.Mui-error': {
    '&.Mui-focused': {
      boxShadow: `${alpha(theme.palette.error.main, 0.25)} 0 0 0 2px`,
      borderRadius: '20px',
    },
  },
  '*': {
    padding: 0,
  },
}));

export default OtpInput;
