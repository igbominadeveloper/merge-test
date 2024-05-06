import React, { MouseEvent, ReactNode } from 'react';
import { Spinner } from '@/components/icons';
import { ISpinner } from '@/types/general';
/* eslint-disable react/button-has-type */

interface IButton {
  type?: 'button' | 'submit' | 'reset';
  handleClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
  text?: string;
  items?: ReactNode;
  className: string;
  ariaLabel?: string;
  isLoading?: boolean;
  spinnerProps?: ISpinner;
  disabled?: boolean;
}
export default function Button({
  type = 'button',
  ariaLabel,
  text,
  items,
  className,
  isLoading = false,
  spinnerProps,
  handleClick,
  disabled,
}: IButton) {
  const { height, width, color } = spinnerProps || {};
  return (
    <button
      disabled={disabled}
      className={`${className} ${
        disabled ? 'cursor-not-allowed bg-[#919EAB33] font-bold text-[#919EAB] opacity-50' : ''
      } flex items-center gap-x-2`}
      aria-label={text || ariaLabel || ''}
      type={type}
      onClick={e => handleClick && handleClick(e)}
    >
      {isLoading && <Spinner color={color} height={height} width={width} />}
      {items || text}
    </button>
  );
}
