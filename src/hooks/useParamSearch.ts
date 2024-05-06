import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const useParamSearch = () => {
  const searchParams = useSearchParams()!;

  const generateQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const createQueryStringFromObject = useCallback(
    (object: Record<string, string | null | number | undefined>) => {
      const params = new URLSearchParams(searchParams);
      const entries = Object.entries(object);

      entries.forEach(filter => {
        const [key, value] = filter;
        if (value) {
          params.set(key, value as string);
        } else params.delete(key);
      });

      return params.toString();
    },
    [searchParams],
  );

  return {
    generateQueryString,
    createQueryStringFromObject,
  };
};

export default useParamSearch;
