const formHelperTextProps = {
  sx: {
    '&.Mui-error': {
      color: '#FF5630',
    },
  },
};
const inputProps = {
  disableUnderline: true,
  sx: {
    height: '53px',
    background: 'rgba(145, 158, 171, 0.08)',
    borderRadius: '8px !important',
    fontSize: '14px',
    color: '#212B36 ',
    '&.Mui-disabled': {
      background: 'rgba(145, 158, 171, 0.16)',
    },
  },
};
const inputLabelProps = {
  sx: {
    color: '#637381',
    fontSize: '14px',
    fontWeight: '400',
    '&.Mui-focused': {
      color: '#637381',
    },
    '&.Mui-error': {
      color: '#FF5630',
    },
  },
};
export { inputLabelProps, inputProps, formHelperTextProps };
