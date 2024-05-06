import { ChangeEvent, useState } from 'react';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CloseIcon from '@mui/icons-material/Close';
import { Drawer, MenuItem } from '@mui/material';
import SelectInput from '@/shared/Form/FormSubcomponent/Select';
import { formatDateString, toTitleCase } from '@/utils/helpers';
import { FilterProps, TransactionCategory, TransactionCategoryEnum } from '@/types/transaction';
import DateFilter from './date';
import SearchFilter from './search';
import TransactionTypeFilters from './transaction-flow';

const transactionCategories = Object.values(TransactionCategoryEnum).map(item =>
  item.toLowerCase(),
);

export default function DesktopFilters(props: FilterProps) {
  const {
    transactionType,
    transactionCategory,
    search,
    startDate,
    endDate,
    setEndDate,
    setSearch,
    setStartDate,
    setTransactionType,
    setTransactionCategory,
  } = props;
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateFilter = (start: string | null, end: string | null) => {
    setStartDate(start);
    setEndDate(end);
    setShowDatePicker(false);
  };

  const handleTransactionFlowChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value) {
      setTransactionCategory(value.toLowerCase() as TransactionCategory);
    } else {
      setTransactionCategory(null);
    }
  };

  const onClear = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const onClearAllFilters = () => {
    setEndDate(null);
    setSearch(null);
    setStartDate(null);
    setTransactionType(null);
    setTransactionCategory(null);
  };

  const isFilterPicked = Object.values({
    transactionType,
    transactionCategory,
    search,
    startDate,
    endDate,
  }).some(value => Boolean(value) === true);

  return (
    <>
      <div className="rounded-t-xl bg-white">
        <TransactionTypeFilters
          clearAllFilters={onClearAllFilters}
          transactionType={transactionType}
          onClick={setTransactionType}
          isFiltered={isFilterPicked}
        />
      </div>
      <form
        className="grid grid-cols-[10rem_5fr_2fr] items-center gap-4 bg-white p-5 pl-2"
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <SelectInput
          label="By Category"
          variant="filled"
          fullWidth
          value={transactionCategory ?? ''}
          onChange={handleTransactionFlowChange}
        >
          {transactionCategories.map(type => (
            <MenuItem key={type} value={type}>
              {toTitleCase(type)}
            </MenuItem>
          ))}
        </SelectInput>

        <SearchFilter
          value={search}
          onChange={setSearch}
          placeholder="Search by Transaction ID, Amount or Name"
        />

        <div
          className="flex h-full cursor-pointer items-center justify-between rounded-lg bg-gray-100 px-4 text-gray-500"
          onClick={() => setShowDatePicker(true)}
        >
          {startDate && endDate
            ? `${formatDateString(startDate, 'YYYY/MM/DD')} to ${formatDateString(endDate, 'YYYY/MM/DD')}`
            : 'Filter by date'}
          <EventNoteIcon />
        </div>

        <Drawer
          anchor="right"
          keepMounted
          onClose={() => setShowDatePicker(false)}
          open={showDatePicker}
          PaperProps={{ sx: { width: { xs: '100%', md: 401 } } }}
        >
          <div className="flex flex-col gap-6">
            <div className="flex justify-between border-b border-b-gray-200 p-6 font-semibold">
              Filter by Date
              <CloseIcon
                className="cursor-pointer text-gray-400 hover:text-gray-700"
                onClick={() => setShowDatePicker(false)}
              />
            </div>
            <div className="px-6">
              <DateFilter
                startDate={startDate}
                endDate={endDate}
                onSubmit={handleDateFilter}
                onClear={onClear}
              />
            </div>
          </div>
        </Drawer>
      </form>
    </>
  );
}
