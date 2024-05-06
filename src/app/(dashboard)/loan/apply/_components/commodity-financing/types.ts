import { UploadKeyFileType } from '@/types/loan';
import {
  CommodityFinancingSchemaType,
  UploadCommodityFinancingSchemaType,
} from '../../_validation';

export type UploadSchemaKey = keyof UploadCommodityFinancingSchemaType;

export type CommodityFinancingType = Partial<
  CommodityFinancingSchemaType & { documents: Array<UploadKeyFileType<UploadSchemaKey>> }
> | null;
