import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { forwardRef } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { inputProps, inputLabelProps } from '@/shared/Form/utils';
import { Dayjs } from 'dayjs';
import Error from '@/assets/icons/error.svg';
import Image from 'next/image';

type DatePickerComponentType = {
  isError?: boolean;
  errorMessage?: string;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  clearable?: boolean;
} & DatePickerProps<Dayjs>;

function DatePickerComponent(props: DatePickerComponentType, ref: any) {
  const {
    isError,
    errorMessage,
    maxDate = undefined,
    minDate = undefined,
    clearable = false,
  } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="w-full">
        <DatePicker
          ref={ref}
          sx={{
            width: '100%',
            height: '53px',
            '& .Mui-error .MuiFilledInput-notchedOutline ': {
              borderColor: '#FF5630',
            },
          }}
          format="DD/MM/YYYY"
          maxDate={maxDate}
          minDate={minDate}
          slotProps={{
            field: { clearable },
            textField: {
              variant: 'filled',
              error: isError,

              InputLabelProps: inputLabelProps,
              InputProps: inputProps,
            },
          }}
          {...props}
        />

        {!!isError && (
          <div className="mt-2 flex items-center gap-1 pl-3 text-[12px] text-error-600">
            <Image src={Error} alt="error sign" />
            {errorMessage}
          </div>
        )}
      </div>
    </LocalizationProvider>
  );
}

const DatePickerInput = forwardRef(DatePickerComponent);

export default DatePickerInput;
