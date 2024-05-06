// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom';

if (typeof window.URL.createObjectURL === 'undefined') {
  window.URL.createObjectURL = jest.fn();
}
