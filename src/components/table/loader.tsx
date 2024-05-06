import { Column } from '@/types/general';
import { Skeleton, TableCell, TableRow } from '@mui/material';
import loadingImage from '@/assets/image-loader.svg';
import Image from 'next/image';

interface LoaderProps {
  className?: string;
}

export default function Loader({ className }: LoaderProps) {
  return (
    <div className={`flex h-full w-full items-center justify-center bg-transparent ${className}`}>
      <Image src={loadingImage} alt="loading icon" className="mx-auto h-20 w-20 animate-spin" />
    </div>
  );
}

interface SkeletonLoaderProps<T> {
  columns: Column<T>[];
}
export function SkeletonLoader<T>({ columns }: SkeletonLoaderProps<T>) {
  return new Array(10).fill(0).map((_, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <TableRow key={index}>
      {columns?.map(column => (
        <TableCell key={column.label} align={column.align}>
          <Skeleton animation="wave" className="w-full" variant="text" sx={{ fontSize: '12px' }} />
        </TableCell>
      ))}
    </TableRow>
  ));
}
