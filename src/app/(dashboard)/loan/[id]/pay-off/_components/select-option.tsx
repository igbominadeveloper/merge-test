import React, { ChangeEvent } from 'react';
import { Radio } from '@mui/material';

interface Props {
  checked: boolean;
  name: string;
  children?: React.ReactNode;
  onChange: (checked: boolean) => void;
}
export default function SelectOption(props: Props) {
  const { checked, name, children, onChange } = props;

  return (
    <div
      className={`flex cursor-pointer items-center justify-between rounded-xl ${checked ? 'bg-primary-main/5 ring-1 ring-primary-main' : 'bg-grey-400'} p-5`}
      onClick={() => onChange(!checked)}
    >
      {children}

      <Radio
        name={name}
        checked={checked}
        className="ml-auto"
        onChange={(_event: ChangeEvent<HTMLInputElement>, isChecked: boolean) =>
          onChange(isChecked)
        }
      />
    </div>
  );
}
