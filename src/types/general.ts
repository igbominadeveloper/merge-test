import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export interface ISpinner {
  color?: string;
  height?: string;
  width?: string;
  className?: string;
}

export interface Column<T> {
  id?: keyof T;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: keyof T extends never ? string | number : T[keyof T]) => string;
}

export type MUIIcon = OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
  muiName: string;
};

export interface APIResponse<T> {
  results: any;
  error: null | string | Record<string, string>;
  message: string;
  status: number;
  data: T;
  supportDescriptiveMessage: string;
  traceId: string;
}
