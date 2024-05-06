'use client';

import { ChangeEvent, useState } from 'react';
import TextInput from '@/shared/Form/TextInput';
import Button from '@/shared/Form/Button';
import { formatAmount, formatDateString } from '@/utils/helpers';
import SelectOption from './select-option';

interface Props {
  loanAmount: number;
  dueDate: string;
  onChange: (value: string) => void;
}
export default function Amount(props: Props) {
  const { loanAmount, dueDate, onChange } = props;
  const [amount, setAmount] = useState<string | null>(null);
  const [payFullAmount, setPayFullAmount] = useState(false);

  const handleFullAmountClick = () => {
    setPayFullAmount(true);
    setAmount('');
  };

  const handleFullAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
    setPayFullAmount(false);
  };

  const handleSubmit = () => {
    const amountToPay = payFullAmount ? loanAmount : amount;
    onChange(amountToPay as string);
  };
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-6">
        <SelectOption
          onChange={handleFullAmountClick}
          checked={payFullAmount}
          name="pay-full-amount"
        >
          <div className="flex flex-1 items-center justify-between">
            <div className="flex flex-col">
              <h1 className={`text-lg font-bold ${payFullAmount && 'text-primary-main'}`}>
                Full loan amount
              </h1>
              <p className={`text-sm ${payFullAmount ? 'text-primary-main' : 'text-grey-700'}`}>
                Due {formatDateString(dueDate, 'DD MMMM YYYY')}
              </p>
            </div>

            <p className={`text-lg font-bold ${payFullAmount && 'text-primary-main'}`}>
              {formatAmount(loanAmount)}
            </p>
          </div>
        </SelectOption>

        <TextInput
          onChange={handleFullAmountChange}
          value={amount}
          hiddenLabel
          fullWidth
          type="number"
          placeholder="Enter a different amount"
        />
      </div>

      <Button disabled={!amount && !payFullAmount} text="Continue" onClick={handleSubmit} />
    </div>
  );
}
