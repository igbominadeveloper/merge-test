'use client';

import useParamSearch from '@/hooks/useParamSearch';
import { usePathname, useRouter } from 'next/navigation';

interface ButtonSwitchProps<T extends string> {
  options: { label: string; value: T; disabled?: boolean }[];
  activeType: T;
  handleChange: (value: T) => void;
  asQuery?: boolean;
  className?: string;
  asLink?: boolean;
  path?: string;
}

export function ButtonSwitch<T extends string>({
  options,
  activeType,
  handleChange,
  asQuery = false,
  className = '',
  asLink = false,
  path,
}: ButtonSwitchProps<T>) {
  const router = useRouter();
  const pathname = usePathname();
  const { generateQueryString } = useParamSearch();

  if (asLink && asQuery) {
    throw new Error("asLink and asQuery can't be true at the same time");
  }

  if (asLink && !path) {
    throw new Error('Path is required when asLink is true.');
  }

  return (
    <div
      className={`grid min-h-[52px] w-full gap-2 rounded-lg bg-white p-2 ${className}`}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      {options.map(option => (
        <button
          key={option.value}
          disabled={option?.disabled}
          onClick={() => {
            handleChange(option.value);

            if (asQuery) {
              router.push(`${pathname}?${generateQueryString('tab', option.value)}`, {
                scroll: false,
              });
            }

            if (asLink) {
              router.push(`${path}/${option.value}`, { scroll: false });
            }
          }}
          className={`rounded-lg text-xs font-semibold transition-all duration-300 min-[370px]:text-sm ${activeType === option.value ? 'bg-primary-main/[0.08] text-primary-800' : 'fill-disabled'} ${option.disabled ? 'cursor-not-allowed' : ''}`}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
