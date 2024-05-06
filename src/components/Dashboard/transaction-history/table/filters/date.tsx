import React, { useState } from 'react';
import dayjs from 'dayjs';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import DatePickerInput from '@/shared/Form/DatepickerInput';
import Button from '@/shared/Form/Button';

type PeriodFilter =
  | 'custom'
  | 'current-week'
  | 'last-week'
  | 'current-month'
  | 'current-year'
  | 'last-year';

const periodFilters: { label: string; value: PeriodFilter }[] = [
  {
    label: 'Custom Period',
    value: 'custom',
  },
  {
    label: 'Current Week',
    value: 'current-week',
  },
  {
    label: 'Last Week',
    value: 'last-week',
  },
  {
    label: 'Current Month',
    value: 'current-month',
  },
  {
    label: 'Current Year',
    value: 'current-year',
  },
  {
    label: 'Last Year',
    value: 'last-year',
  },
];

const getCurrentMonthDateRange = {
  start: dayjs().startOf('month').format('YYYY-MM-DD'),
  end: dayjs().format('YYYY-MM-DD'),
};

const getCurrentWeekDateRange = {
  start: dayjs().startOf('week').format('YYYY-MM-DD'),
  end: dayjs().endOf('week').format('YYYY-MM-DD'),
};

const getCurrentYearDateRange = {
  start: dayjs().startOf('year').format('YYYY-MM-DD'),
  end: dayjs().format('YYYY-MM-DD'),
};

const getLastWeekDateRange = {
  start: dayjs().subtract(1, 'week').startOf('week').format('YYYY-MM-DD'),
  end: dayjs().subtract(1, 'week').endOf('week').format('YYYY-MM-DD'),
};

const getLastYearDateRange = {
  start: dayjs().subtract(1, 'year').startOf('year').format('YYYY-MM-DD'),
  end: dayjs().subtract(1, 'year').endOf('year').format('YYYY-MM-DD'),
};

interface Props {
  startDate: string | null;
  endDate: string | null;
  onSubmit: (startDate: string | null, endDate: string | null) => void;
  onClear: () => void;
}

export default function DateFilter(props: Props) {
  const { endDate, startDate, onSubmit, onClear } = props;
  const [period, setPeriod] = useState<PeriodFilter>('custom');
  const [showDatePicker, setShowDatePicker] = useState(period === 'custom');
  const [startDateFilter, setStartDateFilter] = useState<string | null>(startDate);
  const [endDateFilter, setEndDateFilter] = useState<string | null>(endDate);

  const extractDate = (date: dayjs.Dayjs | null) => {
    if (!date) return null;

    return date.format('YYYY-MM-DD');
  };

  const getDateRange = (periodFilter: PeriodFilter) => {
    switch (periodFilter) {
      case 'current-month':
        return getCurrentMonthDateRange;

      case 'current-week':
        return getCurrentWeekDateRange;

      case 'current-year':
        return getCurrentYearDateRange;

      case 'last-week':
        return getLastWeekDateRange;

      case 'last-year':
        return getLastYearDateRange;

      default:
        return {
          start: null,
          end: null,
        };
    }
  };

  const handlePeriodSelection = (newPeriod: PeriodFilter) => {
    const { start, end } = getDateRange(newPeriod);
    setPeriod(newPeriod);
    setEndDateFilter(end);
    setStartDateFilter(start);

    if (newPeriod === 'custom') {
      setShowDatePicker(true);
    } else setShowDatePicker(false);
  };

  const applyFilters = () => {
    onSubmit(startDateFilter, endDateFilter);
  };

  const clearAll = () => {
    setStartDateFilter(null);
    setEndDateFilter(null);
    onClear();
    setPeriod('custom');
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-semibold">Period</h1>
      <RadioGroup
        aria-labelledby="period-filter"
        name="period"
        value={period}
        onChange={(e, value: string) => handlePeriodSelection(value as PeriodFilter)}
      >
        {periodFilters.map(periodFilter => (
          <FormControlLabel
            key={periodFilter.label}
            value={periodFilter.value}
            control={<Radio size="small" />}
            label={periodFilter.label}
          />
        ))}
      </RadioGroup>

      <div className={`flex gap-4 ${showDatePicker ? 'visible' : 'invisible'}`}>
        <DatePickerInput
          isError={false}
          value={dayjs(startDateFilter)}
          label="Start Date"
          onChange={date => setStartDateFilter(extractDate(date))}
        />

        <DatePickerInput
          isError={false}
          value={dayjs(endDateFilter)}
          label="End Date"
          onChange={date => setEndDateFilter(extractDate(date))}
        />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Button
          className="w-full text-sm"
          text="Clear All"
          variant="secondary"
          onClick={clearAll}
        />
        <Button className="w-full text-sm" text="Apply Filter" onClick={applyFilters} />
      </div>
    </div>
  );
}
