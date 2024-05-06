import { UploadKeyFileType } from '@/types/loan';
import {
  InvoiceDiscountingSchemaType,
  UploadInvoiceDiscountingSchemaType,
} from '../../_validation';

export type UploadSchemaKey = keyof UploadInvoiceDiscountingSchemaType;

export type InvoiceDiscountingType = Partial<
  InvoiceDiscountingSchemaType & { documents: Array<UploadKeyFileType<UploadSchemaKey>> }
> | null;
