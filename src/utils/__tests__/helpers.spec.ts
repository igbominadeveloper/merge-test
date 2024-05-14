import dayjs from 'dayjs';
import { formatAmount, formatDateString } from '../helpers';

describe('formatAmount', () => {
  test('formats amount correctly', () => {
    const amount = 123456.78;
    const formattedAmount = formatAmount(amount);
    expect(formattedAmount).toBe('₦123,456.78');
  });

  test('handles negative numbers correctly', () => {
    const amount = -123456.78;
    const formattedAmount = formatAmount(amount);
    expect(formattedAmount).toBe('-₦123,456.78');
  });

  test('handles zero correctly', () => {
    const amount = 0;
    const formattedAmount = formatAmount(amount);
    expect(formattedAmount).toBe('₦0.00');
  });

  test('formats number with at least 5 decimal places', () => {
    const amount = 123456.781234;
    const formattedAmount = formatAmount(amount);
    expect(formattedAmount).toBe('₦123,456.781234');
  });

  test('returns 0 if the amount is not provided', () => {
    const formattedAmount = formatAmount();
    expect(formattedAmount).toBe('₦0.00');
  });

  test('returns 0 if the amount is null', () => {
    const formattedAmount = formatAmount('null' as unknown as number);
    expect(formattedAmount).toBe('₦0.00');
  });

  test('returns 0 if the amount is undefined', () => {
    const formattedAmount = formatAmount('undefined' as unknown as number);
    expect(formattedAmount).toBe('₦0.00');
  });

  test('returns 0 if the amount is NaN', () => {
    const formattedAmount = formatAmount(NaN as unknown as number);
    expect(formattedAmount).toBe('₦0.00');
  });
});

describe('formatDateString', () => {
  it('should format date string with default format', () => {
    const format = 'D MMM YYYY h:mm A';
    const date = '2024-05-08T12:34:56Z';
    const formattedDate = formatDateString(date);
    const expectedDate = dayjs(date).format(format);
    expect(formattedDate).toEqual(expectedDate);
  });

  it('should format date string with custom format', () => {
    const date = '2024-05-08T12:34:56Z';
    const format = 'YYYY-MM-DD HH:mm:ss';
    const formattedDate = formatDateString(date, format);
    const expectedDate = dayjs(date).format(format);
    expect(formattedDate).toEqual(expectedDate);
  });

  it('should handle date strings without timezone', () => {
    const format = 'D MMM YYYY h:mm A';
    const date = '2024-05-08T12:34:56';
    const formattedDate = formatDateString(date);
    const expectedDate = dayjs(`${date}z`).format(format);
    expect(formattedDate).toEqual(expectedDate);
  });

  it('should handle empty date string', () => {
    const formattedDate = formatDateString('');
    expect(formattedDate).toEqual('Invalid Date');
  });

  it('should handle invalid date string', () => {
    const date = 'invalid date';
    const formattedDate = formatDateString(date);
    expect(formattedDate).toEqual('Invalid Date');
  });
});
