import { convertToNumber } from '../general';

describe('Convert to number', () => {
  it('converts a basic string to number', () => {
    const input = '909090';
    const output = convertToNumber(input);
    expect(output).toBe(909090);
  });

  it('converts a string amount to number', () => {
    const input = '100,000,000';
    const output = convertToNumber(input);
    expect(output).toBe(100000000);
  });

  it('converts a string amount that is prefixed with the currency symbol to number', () => {
    const input = '₦100,000,000';
    const output = convertToNumber(input);
    expect(output).toBe(100000000);
  });

  it('converts a string with decimals to number', () => {
    const input = '100.50';
    const output = convertToNumber(input);
    expect(output).toBe(100.5);
  });

  it('converts a string amount prefixed with the currency symbol and is a floating amount to number', () => {
    const input = '₦100,000,000.90';
    const output = convertToNumber(input);
    expect(output).toBe(100000000.9);
  });
});
