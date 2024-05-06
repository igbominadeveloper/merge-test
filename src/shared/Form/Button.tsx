import React, { ReactNode } from 'react';
import { ISpinner } from '@/types/general';
import Spinner from '@/shared/Spinner';
import classNames from 'classnames';
import Link, { LinkProps } from 'next/link';
/* eslint-disable react/button-has-type */

export const variants = {
  primary: 'bg-primary-main text-white hover:bg-primary-main/80',
  secondary: 'bg-[#919EAB14] text-primary-dark hover:bg-gray-200',
  orange: 'text-[#FF5630] bg-[#FF5630] bg-opacity-[8%]',
  'light-primary': 'bg-primary-100/15 text-primary-main hover:bg-primary-main/25',
};

type ButtonTypes = HTMLButtonElement | HTMLAnchorElement;

// @ts-expect-error Ignoring the error
interface IButton<T extends ButtonTypes>
  extends React.AnchorHTMLAttributes<T>,
    React.ButtonHTMLAttributes<T> {
  text?: string;
  handleClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  items?: ReactNode;
  className?: string;
  ariaLabel?: string;
  isLoading?: boolean;
  spinnerProps?: ISpinner;
  disabled?: boolean;
  variant?: keyof typeof variants;
  as?: 'button' | 'link';
}
export default function Button({
  text,
  items,
  className,
  isLoading = false,
  spinnerProps,
  disabled,
  ariaLabel,
  variant,
  as = 'button',
  handleClick,
  ...rest
}: IButton<ButtonTypes> & Partial<LinkProps>) {
  const { height, width, color } = spinnerProps || {};

  const classes = classNames(
    'font-semibold h-12 flex items-center gap-x-2 rounded-lg w-auto justify-center duration-300 active:scale-95 transition-all px-3',
    variants[variant ?? 'primary'],
    (disabled || isLoading) &&
      'disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled disabled:text-opacity-80 disabled:bg-opacity-20 cursor-not-allowed',
    className,
  );

  const props = {
    className: classes,
    ...rest,
  };

  return as === 'button' ? (
    <button
      disabled={isLoading || disabled}
      aria-label={text || ariaLabel || ''}
      onClick={handleClick ?? undefined}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {isLoading && <Spinner color={color} height={height} width={width} />}
      {items || text}
    </button>
  ) : (
    <Link {...(props as LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
      {items || text}
    </Link>
  );
}
