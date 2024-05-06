import { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Divider, Drawer } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FilterProps, TransactionTypeEnum } from '@/types/transaction';
import SearchFilter from './search';
import DateFilter from './date';

export default function MobileFilters(props: FilterProps) {
  const {
    transactionType,
    search,
    startDate,
    endDate,
    setSearch,
    setEndDate,
    setStartDate,
    setTransactionType,
  } = props;
  const [showFullFilters, setShowFullFilters] = useState(false);

  const handleTransactionType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionType((event.target as HTMLInputElement).value as TransactionTypeEnum);
  };

  const handleDateChange = (start: string | null, end: string | null) => {
    setStartDate(start);
    setEndDate(end);
    setShowFullFilters(false);
  };

  const onClear = () => {
    setStartDate(null);
    setEndDate(null);
    setTransactionType(null);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <SearchFilter
          value={search}
          onChange={setSearch}
          placeholder="Search amount"
          className="flex-1 bg-gray-200/50"
        />
        <FilterListIcon
          className="size-8 cursor-pointer text-primary-main"
          onClick={() => setShowFullFilters(true)}
        />
      </div>

      <Drawer
        anchor="right"
        open={showFullFilters}
        keepMounted
        onClose={() => setShowFullFilters(false)}
        PaperProps={{ sx: { width: '100%' } }}
      >
        <section className="p-3 px-4">
          <div className="flex items-center justify-between">
            <h1 className="my-6 text-xl font-semibold">Filter</h1>
            <CloseIcon
              className="size-7 cursor-pointer text-gray-700"
              onClick={() => setShowFullFilters(false)}
            />
          </div>

          <FormControl className="flex flex-col gap-2">
            <FormLabel className="text-base font-bold text-black" id="transaction-flow-filter">
              Transaction Type
            </FormLabel>

            <RadioGroup
              aria-labelledby="transaction-flow-filter"
              name="transaction-flow"
              value={transactionType}
              onChange={handleTransactionType}
            >
              <FormControlLabel
                className="capitalize"
                value={TransactionTypeEnum.CREDIT}
                control={<Radio size="small" />}
                label={TransactionTypeEnum.CREDIT}
              />
              <FormControlLabel
                className="capitalize"
                value={TransactionTypeEnum.DEBIT}
                control={<Radio size="small" />}
                label={TransactionTypeEnum.DEBIT}
              />
            </RadioGroup>
          </FormControl>

          <Divider className="my-6" />

          <DateFilter
            startDate={startDate}
            endDate={endDate}
            onSubmit={handleDateChange}
            onClear={onClear}
          />
        </section>
      </Drawer>
    </>
  );
}
