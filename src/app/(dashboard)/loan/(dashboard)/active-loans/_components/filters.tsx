import { useState } from 'react';
import { MenuItem } from '@mui/material';
import dayjs from 'dayjs';
import SelectInput from '@/shared/Form/FormSubcomponent/Select';
import DatePickerInput from '@/shared/Form/DatepickerInput';
import { extractDateFromDayjs } from '@/utils/helpers';
import {
  LoanStatusEnum,
  LoanProductCategoryEnum,
  LoanTransactionFilter,
  LoanStatus,
  FormattedLoanStatusEnum,
} from '@/types/loan';

const loanTypes = Object.values(LoanProductCategoryEnum);
const loanStatuses = Object.entries(LoanStatusEnum).map(([key, value]) => ({
  key: FormattedLoanStatusEnum[key as LoanStatus],
  value,
}));

export default function Filters(props: LoanTransactionFilter) {
  const { loanStatus, setLoanStatus } = props;
  const [loanType, setLoanType] = useState<LoanProductCategoryEnum | null>(null);
  const [transactionDate, setTransactionDate] = useState<string | null>(null);

  return (
    <form className="grid grid-cols-3 gap-4 bg-white">
      <SelectInput
        label="Loan Request Type"
        variant="filled"
        fullWidth
        value={loanType ?? ''}
        onChange={e => setLoanType(e.target.value)}
      >
        {loanTypes.map(type => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </SelectInput>

      <SelectInput
        label="Status"
        variant="filled"
        fullWidth
        value={loanStatus ?? ''}
        onChange={e => setLoanStatus(e.target.value)}
      >
        {loanStatuses.map(({ key, value }) => (
          <MenuItem key={key} value={key}>
            {value}
          </MenuItem>
        ))}
      </SelectInput>

      <DatePickerInput
        isError={false}
        value={dayjs(transactionDate)}
        label="Date"
        onChange={date => setTransactionDate(extractDateFromDayjs(date))}
      />
    </form>
  );
}
