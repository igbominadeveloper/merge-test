import { Column } from '@/types/general';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { SkeletonLoader } from './loader';

interface Props<T> {
  isLoading?: boolean;
  columns: Column<T>[];
  rows: T[];
  hover?: boolean;
  rowId: keyof T;
  page: number;
  rowsPerPage: number;
  onPageChange: (pageNumber: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  children?: (row: T, column: Column<T>) => React.ReactNode;
  total?: number;
  minHeight?: number;
}

export default function DesktopTable<T>(props: Props<T>) {
  const {
    columns,
    rows,
    rowId,
    hover = true,
    isLoading,
    total,
    page,
    rowsPerPage,
    children,
    onPageChange = () => {},
    onRowsPerPageChange = () => {},
    minHeight = 600,
  } = props;

  const handleChangePage = (_event: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRowsPerPageChange(+event.target.value);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 800, minHeight }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  sx={{ backgroundColor: '#F4F6F8' }}
                  key={column.label}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {/* eslint-disable-next-line no-nested-ternary */}
            {isLoading ? (
              <SkeletonLoader columns={columns} />
            ) : rows.length > 0 ? (
              rows.map(row => {
                const rowKey = row[rowId] as string;
                return (
                  <TableRow hover={hover} role="checkbox" key={rowKey}>
                    {columns.map(column => (
                      <TableCell
                        key={column.label}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {children && children(row, column)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow className="mx-auto h-full">
                {/* A hacky way to put some no found text */}
                {/* TODO: Find out how to do this using the library */}
                {columns.map((column, index) => (
                  <TableCell key={column.label} className="border-none">
                    <div className="my-10 -ml-[30%]">
                      {index === Math.floor(columns.length / 2) ? 'No records found' : ''}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={total || 0}
        rowsPerPage={rowsPerPage as number}
        page={!total || total <= 0 ? 0 : page} // an error happens on the console when the data is loading from the api
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
