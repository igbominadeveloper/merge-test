import { UploadKeyFileType } from '@/types/loan';
import {
  InventoryFinancingSchemaType,
  UploadInventoryFinancingSchemaType,
} from '../../_validation';

export type UploadSchemaKey = keyof UploadInventoryFinancingSchemaType;

export type InventoryFinancingType = Partial<
  InventoryFinancingSchemaType & { documents: Array<UploadKeyFileType<UploadSchemaKey>> }
> | null;
