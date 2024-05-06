import { UploadKeyFileType } from '@/types/loan';

export const productUnit = [
  'Barrels',
  'Cubic Feet',
  'Gallons',
  'Grams',
  'Kilograms',
  'Litres',
  'Pounds',
  'Metric Tonnes',
];

export const loanType = ['Domestic', 'Export']; // also known as transaction type on the ui

export function getUploadDefaultValue<T>(
  key: T,
  docLinks: Array<UploadKeyFileType<T>> | undefined,
) {
  return docLinks?.find(item => item?.key === key)?.file ?? undefined;
}
