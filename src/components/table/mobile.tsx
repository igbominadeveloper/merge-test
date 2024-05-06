import Loader from './loader';

interface Props<T> {
  rows: T[];
  isLoading: boolean;
  page: number;
  rowsPerPage: number;
  rowId: keyof T;
  children?: (row: T, rowKey: string) => React.ReactNode;
}
export default function MobileTable<T>(props: Props<T>) {
  const { rowsPerPage, page, rows, rowId, isLoading, children } = props;

  return (
    <div className="flex flex-col gap-3">
      {isLoading ? (
        <Loader />
      ) : (
        rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
          const rowKey = row[rowId] as string;

          return children && children(row, rowKey);
        })
      )}
    </div>
  );
}
