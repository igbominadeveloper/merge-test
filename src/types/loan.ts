export enum LoanProductCategoryEnum {
  CommodityFinancing = 'Commodity Financing',
  InventoryFinancing = 'Inventory Financing',
  WorkingCapital = 'Working Capital',
  InvoiceDiscounting = 'Invoice Discounting',
}

export enum LoanStatusEnum {
  Approved = 'Approved',
  New = 'New Application',
  Rejected = 'Rejected',
  'CreditAssessment' = 'Credit Assessment',
  'HeadCreditApproval' = 'Head Credit Approval',
  'ChiefCommercialOfficerApproval' = 'Chief Commercial Officer Approval',
  'DirectorFinancialServicesApproval' = 'Director Financial Services Approval',
  'ExecutionAndSigningOfPreDisbursementDocuments' = 'Execution and Signing of Pre Disbursement Documents',
  'CollateralManagerVisit' = 'Collateral Manager Visit',
  'DisbursementOfFunds' = 'Disbursement of Funds',
}

export interface ProductType {
  category: string;
  products: Array<string>;
}

export type ProductCategoryType =
  | LoanProductCategoryEnum.InventoryFinancing
  | LoanProductCategoryEnum.WorkingCapital
  | LoanProductCategoryEnum.InvoiceDiscounting
  | LoanProductCategoryEnum.CommodityFinancing;

export type LoanType = 'Domestic' | 'Export';
export type LoanStatus = keyof typeof LoanStatusEnum;

export enum FormattedLoanStatusEnum {
  Approved = 'APPROVED',
  New = 'NEW_APPLICATION',
  Rejected = 'REJECTED',
  CreditAssessment = 'CREDIT_ASSESSMENT',
  HeadCreditApproval = 'HEAD_CREDIT_APPROVAL',
  ChiefCommercialOfficerApproval = 'CHIEF_COMMERCIAL_OFFICER_APPROVAL',
  DirectorFinancialServicesApproval = 'DIRECTOR_FINANCIAL_SERVICES_APPROVAL',
  ExecutionAndSigningOfPreDisbursementDocuments = 'EXECUTION_AND_SIGNING_OF_PRE_DISBURSEMENT_DOCUMENTS',
  CollateralManagerVisit = 'COLLATERAL_MANAGER_VISIT',
  DisbursementOfFunds = 'DISBURSEMENT_OF_FUNDS',
}
export type LoanStatusFilter =
  | 'APPROVED'
  | 'NEW_APPLICATION'
  | 'REJECTED'
  | 'CREDIT_ASSESSMENT'
  | 'HEAD_CREDIT_APPROVAL'
  | 'CHIEF_COMMERCIAL_OFFICER_APPROVAL'
  | 'DIRECTOR_FINANCIAL_SERVICES_APPROVAL'
  | 'EXECUTION_AND_SIGNING_OF_PRE_DISBURSEMENT_DOCUMENTS'
  | 'COLLATERAL_MANAGER_VISIT'
  | 'DISBURSEMENT_OF_FUNDS';

export interface LoanTransactionFilter {
  loanStatus: LoanStatusFilter | null;
  page: number | null;
  pageSize: number | null;
  setLoanStatus: (status: LoanStatusFilter | null) => void;
  setPageSize: (size: number) => void;
  setPage: (page: number) => void;
}

interface DocLink {
  name: string;
  link: string;
}

export type LoanOriginatorType = 'KATSU_FINANCE';

export type LoanApplicationDTO = {
  productType: string;
  customProductType?: string;
  productList?: string;
  loanType: LoanType;
  productCategory: ProductCategoryType;
  productUnit: string;
  productQuantity: number;
  productUnitPurchasePrice: number;
  productUnitSellingPrice: number;
  logisticsCostPerTruck: number;
  logisticsNumberOfTrucks: number;
  loanAmount: number;
  paymentTenorInDays: number;
  requestId?: string;
  offTakerId?: string;
  loanOriginator: LoanOriginatorType;
  docLinks: DocLink[];
  offTakerName: string;
  offTakerEmail: string;
  offTakerAddress: string;
  otherCostAmount?: number;
  otherCostDescription?: string;
};

export interface WorkingCapitalDTO {
  productCategory: LoanProductCategoryEnum.WorkingCapital;
  paymentTenorInDays: number;
  loanPurpose: string;
  loanAmount: number;
  docLinks: DocLink[];
}

export interface InvoiceDiscountingDTO {
  productCategory: LoanProductCategoryEnum.InvoiceDiscounting;
  loanAmount: number;
  offTakerName: string;
  offTakerEmail: string;
  offTakerAddress: string;
  loanOriginator: LoanOriginatorType;
  invoiceIssuedDate: string;
  paymentTenorInDays: number;
  docLinks: DocLink[];
}

export type UploadKeyFileType<T> = { key: T; file: File };

export type UploadFileArrType<T> = {
  name: string;
  setValue: (value: File) => void;
  errorMessage: string;
  value: File;
  key: T;
};

export interface DocLinks {
  name: string;
  link: string;
  status: string;
  extension: string;
  _id: string;
}

export interface LoanTransaction {
  offTaker?: {
    address: string;
    firstName: string;
    lastName: string;
    phone: string;
    username: string;
    _id: string;
  };
  offTakerName: string;
  offTakerEmail: string;
  offTakerAddress: string;
  productType: string;
  productList: string;
  loanType: string;
  productCategory: LoanProductCategoryEnum;
  productUnit: string;
  productQuantity: number;
  productUnitPurchasePrice: number;
  productUnitSellingPrice: number;
  loanAmount: number;
  paymentTenorInDays: number;
  status: LoanStatusEnum;
  loanNumber: string;
  digifyLoanId: string;
  requestId: string;
  loanOriginator: string;
  allDocsDigifyUploadStatus: string;
  loanPurpose: string | null;
  docLinks: DocLinks[];
  otherCostAmount: number;
  otherCostDescription: string;
  logisticsCostPerTruck: number;
  logisticsNumberOfTrucks: number;
  tenant: string;
  user: string;
  business: {
    name: string;
    phone: string;
    address: {
      country: string;
      state: string;
      lga: string;
      latitude: string;
      longitude: string;
      name: string;
    };
    _id: string;
  };
  createdBy: null;
  updatedBy: null;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export interface LoanHistoryType {
  nextPage: number | null;
  previousPage: number | null;
  currentPage: number;
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
  results: LoanTransaction[];
}
