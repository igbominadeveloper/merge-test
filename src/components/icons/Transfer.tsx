import * as React from 'react';
import { memo } from 'react';

interface TransferProps {
  className?: string;
}
function TransferComponent({ className }: TransferProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
      <path
        className={`'w-20 h-20' ${className}`}
        fillRule="evenodd"
        d="M3.777 21.375c-.844-.18-1.407-.859-1.496-1.718C2.15 18.384 2 16.047 2 12c0-4.047.15-6.384.281-7.657.089-.86.652-1.539 1.496-1.718C5.109 2.34 7.622 2 12 2s6.89.34 8.223.625c.844.18 1.407.859 1.496 1.718C21.85 5.616 22 7.953 22 12c0 4.047-.15 6.384-.281 7.657-.089.86-.652 1.539-1.496 1.718C18.891 21.66 16.378 22 12 22s-6.89-.34-8.223-.625ZM17 8.373v6.863a1.374 1.374 0 0 1-1.37 1.348 1.37 1.37 0 0 1-1.371-1.348v-3.569l-4.91 4.928a1.375 1.375 0 0 1-1.948-1.94c1.723-1.726 4.295-4.292 4.939-4.91H8.776a1.37 1.37 0 0 1-1.347-1.372A1.374 1.374 0 0 1 8.776 7h6.853A1.374 1.374 0 0 1 17 8.373Z"
        clipRule="evenodd"
        opacity={0.32}
      />
      <path
        className={`'w-20 h-20' ${className}`}
        d="M17 15.236V8.373A1.378 1.378 0 0 0 15.63 7H8.775a1.37 1.37 0 0 0-1.347 1.373 1.374 1.374 0 0 0 1.347 1.372h3.564c-.644.618-3.216 3.184-4.94 4.91a1.375 1.375 0 0 0 1.949 1.94l4.91-4.928v3.569a1.374 1.374 0 0 0 1.37 1.348A1.37 1.37 0 0 0 17 15.236Z"
      />
    </svg>
  );
}
const Transfer = memo(TransferComponent);
export default Transfer;
