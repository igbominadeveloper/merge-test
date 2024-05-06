import { useState, useEffect } from 'react';

export default function useDebounceValue(input: string, delay: number) {
  const [value, setValue] = useState(input);

  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(input);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [input, delay]);

  return value;
}
