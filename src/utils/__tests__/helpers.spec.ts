import { formatAmount } from '../helpers';

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
