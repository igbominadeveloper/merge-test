import { UploadKeyFileType } from '@/types/loan';
import { UploadWorkingCapitalSchemaType, WorkingCapitalSchemaType } from '../../_validation';

export type UploadSchemaKey = keyof UploadWorkingCapitalSchemaType;

export type WorkingCapitalType = Partial<
  WorkingCapitalSchemaType & { documents: Array<UploadKeyFileType<UploadSchemaKey>> }
> | null;
