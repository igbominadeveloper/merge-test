import dayjs from 'dayjs';
import { ToWords } from 'to-words';

export const formatAmount = (amount: number = 0): string => {
  let input = (amount as unknown as string) || '0';
  if (
    (typeof amount !== 'number' && typeof amount !== 'string') ||
    String(amount) === 'null' ||
    String(amount) === 'undefined'
  ) {
    input = '0';
  }
  const floatingValue = parseFloat(input);
  const decimalCount = (floatingValue?.toString().split('.')[1] || '').length;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: decimalCount || 2,
    maximumFractionDigits: decimalCount || 2,
  }).format(floatingValue);
};

export const amountToWords = (amount: number) => {
  return new ToWords({
    localeCode: 'en-NG',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {
        // can be used to override defaults for the selected locale
        name: 'Naira',
        plural: 'Naira',
        symbol: '₦',
        fractionalUnit: {
          name: 'Kobo',
          plural: 'Kobo',
          symbol: '',
        },
      },
    },
  }).convert(amount);
};

export const formatDateString = (date: string, format = 'D MMM YYYY h:mm A'): string => {
  return dayjs(date).format(format);
};

export const extractDateFromDayjs = (date: dayjs.Dayjs | null) =>
  !date ? null : date.format('YYYY-MM-DD');

export function toUrlQuery(
  obj: Record<string, null | undefined | string | number | string[]>,
): string {
  const parts: string[] = [];
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(item => {
          parts.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(item)}`);
        });
      } else {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }
  });
  return parts.join('&');
}

export const trimText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength - 3)}...`;
};

export const formatDateInYears = (date: string, format = 'YYYY-MM-DD'): string => {
  return dayjs(date).format(format);
};

export const formatDateInDays = (date: string, format = 'dddd'): string => {
  return dayjs(date).format(format);
};

export const toTitleCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
