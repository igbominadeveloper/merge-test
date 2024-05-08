'use client';

import Image from 'next/image';
import Error from '@/assets/icons/error.svg';
import { Autocomplete, AutocompleteProps } from '@mui/material';
import { FixedSizeList } from 'react-window';
import React, { ForwardedRef, forwardRef, ReactElement, isValidElement } from 'react';

import TextInput, { inputLabelOptions } from '../TextInput';

type ListboxComponentProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  role: string;
};

const ListboxComponent = React.forwardRef<HTMLDivElement, ListboxComponentProps>((props, ref) => {
  const { children, role, ...other } = props;
  const items = React.Children.toArray(children) as ReactElement[];
  const itemCount = items.length;
  const itemSize = 45;
  const listHeight = itemSize * itemCount;

  return (
    <div ref={ref}>
      <div {...other}>
        <FixedSizeList
          itemData={items}
          height={Math.min(listHeight, 250)}
          width="100%"
          itemSize={itemSize}
          overscanCount={5}
          itemCount={itemCount}
        >
          {({ index, style }) => {
            if (isValidElement(items[index])) {
              return React.cloneElement(items[index], {
                style,
                className: 'hover:bg-grey-100 cursor-pointer p-2 px-3 font-primary',
              });
            }
            return null;
          }}
        </FixedSizeList>
      </div>
    </div>
  );
});

interface CustomAutocompleteProps<T>
  extends Omit<AutocompleteProps<T | string, false, false, true>, 'renderInput'> {
  options: (string | T)[];
  label: string;
  isError?: boolean;
  errorMessage?: string;
}

function SearchSelect<T>(props: CustomAutocompleteProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { label, isError, errorMessage, options, ...rest } = props;

  return (
    <div className="w-full">
      <Autocomplete
        {...rest}
        ref={ref}
        options={options}
        ListboxComponent={
          ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>
        }
        renderInput={params => (
          <TextInput
            {...params}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password',
            }}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
            }}
            InputLabelProps={{
              ...params.InputLabelProps,
              ...inputLabelOptions,
            }}
            label={label}
            fullWidth
          />
        )}
      />
      {isError ? (
        <div className="mt-2 flex items-center gap-1 pl-3 text-[12px] text-error-600">
          <Image src={Error} alt="error sign" />
          {errorMessage}
        </div>
      ) : null}
    </div>
  );
}

const SearchSelectComponent = forwardRef(SearchSelect) as <T>(
  props: CustomAutocompleteProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) => React.JSX.Element;

export default SearchSelectComponent;
