import { TextField, TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';
import { inputProps, inputLabelProps, formHelperTextProps } from '@/shared/Form/utils';

function MuiTextField(props: TextFieldProps, ref: any) {
  return (
    <TextField
      {...props}
      ref={ref}
      sx={{
        marginRight: 2,
        marginBottom: { xs: 2, md: 0 },
      }}
      InputProps={inputProps}
      InputLabelProps={inputLabelProps}
      FormHelperTextProps={formHelperTextProps}
    />
  );
}

const ForwardedTextField = forwardRef(MuiTextField);

export default ForwardedTextField;
