import React from 'react';
import { toTitleCase } from '@/utils/helpers';
import CloseIcon from '@mui/icons-material/Close';
import { TransactionCategory, TransactionType, TransactionTypeEnum } from '@/types/transaction';

type Tab = {
  label: TransactionCategory | null | string;
  selected: boolean;
  onClick: () => void;
};
function LineItem({ label, selected, onClick }: Tab) {
  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-between gap-2 border-b-2 px-5 py-5  text-black transition-all duration-300 hover:border-b-black hover:opacity-100 ${selected ? 'border-b-black opacity-100' : 'border-b-transparent opacity-50'} `}
    >
      <p className="font-semibold capitalize">{label?.toLowerCase()}</p>
    </div>
  );
}

interface Props {
  transactionType: TransactionType | null;
  onClick: (transactionType: TransactionType | null) => void;
  clearAllFilters?: () => void;
  isFiltered?: boolean;
}

export default function TransactionTypeFilters({
  transactionType,
  isFiltered,
  onClick,
  clearAllFilters,
}: Props) {
  const transactionGroups = [
    {
      value: null,
      label: 'All',
    },
    {
      value: TransactionTypeEnum.CREDIT,
      label: toTitleCase(TransactionTypeEnum.CREDIT),
    },
    {
      value: TransactionTypeEnum.DEBIT,
      label: toTitleCase(TransactionTypeEnum.DEBIT),
    },
  ];

  return (
    <div className="relative flex items-center gap-6 border-b border-b-gray-200 pl-5">
      {transactionGroups.map(({ label, value }) => (
        <LineItem
          key={label}
          label={label}
          selected={value?.toLowerCase() === transactionType?.toLowerCase()}
          onClick={() => onClick(label === 'All' ? null : (label as TransactionTypeEnum))}
        />
      ))}

      {isFiltered ? (
        <div
          onClick={clearAllFilters}
          className="absolute right-0 top-0 m-4 flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium ring-gray-300 hover:ring-1"
        >
          <CloseIcon className="w-4 text-gray-400 hover:text-gray-700" />
          Clear Filters
        </div>
      ) : null}
    </div>
  );
}
