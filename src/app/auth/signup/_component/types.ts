import { BusinessDetailsType, BusinessRepType } from '../_validation';

export type SignUpDataType = Partial<BusinessDetailsType & BusinessRepType> | undefined;
