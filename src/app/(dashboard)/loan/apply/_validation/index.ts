import validateZodFile from '@/utils/validateZodFile';
import { z } from 'zod';

const ACCEPTED_FILE_TYPES = ['application/pdf'];

const validateLoanTenor = () =>
  z
    .string()
    .min(1, { message: 'loan tenor is required' })
    .refine(
      value => {
        const parsedValue = parseFloat(value);
        if (Number.isNaN(parsedValue)) return false;
        return Number.isInteger(parsedValue) && parsedValue >= 7;
      },
      {
        message: 'Minimum number of days is 7 days',
      },
    );

export const CommodityFinancingSchema = z.object({
  productType: z
    .string({ required_error: 'Please select a product type' })
    .min(1, { message: 'product type is required' }),
  transactionType: z
    .string({ required_error: 'Please select a transaction type' })
    .min(1, { message: 'Please select transaction type' }),
  product: z
    .string({ required_error: 'Please select a product' })
    .min(1, { message: 'product is required' }),

  otherProduct: z.string().optional(),
  productUnit: z
    .string({ required_error: 'Please select a product unit' })
    .min(1, { message: 'product unit is required' }),
  productQuantity: z
    .string({ required_error: 'Please select a product quantity' })
    .min(1, { message: 'product quantity is required' }),
  productUnitPurchasePrice: z
    .string({ required_error: 'Please enter a product unit purchase price' })
    .min(1, { message: 'product unit purchase price is required' }),
  productUnitSellingPrice: z
    .string({ required_error: 'Please enter a product unit selling price' })
    .min(1, { message: 'product unit selling price is required' }),
  requestAmount: z
    .string({ required_error: 'Please enter a request amount' })
    .min(1, { message: 'request amount is required' }),

  loanTenor: validateLoanTenor(),

  offTakerEmailAddress: z
    .string()
    .min(1, { message: `off taker's email is required` })
    .email('Email is invalid'),
  logisticCostPerTruck: z
    .string({ required_error: 'please enter a value' })
    .min(1, { message: 'logistic cost per truck is required' }),

  logisticsNumberOfTrucks: z
    .string({ required_error: 'please enter a value' })
    .min(1, { message: 'logistics number of truck is required' }),
  otherCostAmount: z.string().optional(),
  otherCostDescription: z.string().optional(),
  offTakerName: z
    .string({ required_error: 'please enter a name' })
    .min(1, { message: `off taker's name is required` }),
  offTakerAddress: z
    .string({ required_error: 'please enter address' })
    .min(1, { message: `off taker's address is required` }),
});

export type CommodityFinancingSchemaType = z.infer<typeof CommodityFinancingSchema>;

const BaseUploadSchema = z.object({
  profitabilityAnalysis: validateZodFile({
    requiredMessage: 'Please upload your profitability analysis/Cashloop projection',
    acceptedFileTypes: ACCEPTED_FILE_TYPES,
  }),

  additionalDocument: validateZodFile({
    requiredMessage: 'Please upload additional document',
    acceptedFileTypes: ACCEPTED_FILE_TYPES,
    isRequired: false,
  }),
});

export const UploadInventoryFinancingSchema = z
  .object({
    tradeContractAgreement: validateZodFile({
      requiredMessage: 'Please upload your trade contract agreement',
      acceptedFileTypes: ACCEPTED_FILE_TYPES,
    }),
    executedContracts: validateZodFile({
      requiredMessage: 'Please upload your executed contracts',
      acceptedFileTypes: ACCEPTED_FILE_TYPES,
    }),
    managementProfile: validateZodFile({
      requiredMessage: 'Please upload your management profile',
      acceptedFileTypes: ACCEPTED_FILE_TYPES,
    }),
    statementOfAccount: validateZodFile({
      requiredMessage: 'Please upload your statement of account',
      acceptedFileTypes: ACCEPTED_FILE_TYPES,
    }),
    auditedFinancialStatement: validateZodFile({
      requiredMessage: 'Please upload your audited financial statement',
      acceptedFileTypes: ACCEPTED_FILE_TYPES,
    }),
    invoice: validateZodFile({
      requiredMessage: 'Please upload your invoice',
      acceptedFileTypes: ACCEPTED_FILE_TYPES,
    }),
  })
  .merge(BaseUploadSchema);

export type UploadInventoryFinancingSchemaType = z.infer<typeof UploadInventoryFinancingSchema>;

export const UploadCommodityFinancingSchema = UploadInventoryFinancingSchema.extend({
  purchaseOrder: validateZodFile({
    requiredMessage: 'Please upload your purchase order',
    acceptedFileTypes: ACCEPTED_FILE_TYPES,
  }),
});

export type UploadCommodityFinancingSchemaType = z.infer<typeof UploadCommodityFinancingSchema>;

export const InventoryFinancingSchema = CommodityFinancingSchema.extend({});

export type InventoryFinancingSchemaType = z.infer<typeof InventoryFinancingSchema>;

export const WorkingCapitalSchema = z.object({
  requestAmount: z
    .string({ required_error: 'Please enter a request amount' })
    .min(1, { message: 'request amount is required' }),
  loanTenor: validateLoanTenor(),
  loanPurpose: z
    .string({ required_error: 'Please provide the purpose for the loan' })
    .min(5, { message: 'Minimum of 5 letters' }),
});

export type WorkingCapitalSchemaType = z.infer<typeof WorkingCapitalSchema>;

export const UploadWorkingCapitalSchema = z.object({
  proFomaInvoice: validateZodFile({
    requiredMessage: 'Please upload your pro-forma invoice',
    acceptedFileTypes: ACCEPTED_FILE_TYPES,
  }),
  auditedFinancialStatement: validateZodFile({
    requiredMessage: 'Please upload your audited financial statement',
    acceptedFileTypes: ACCEPTED_FILE_TYPES,
  }),
  bankStatement: validateZodFile({
    requiredMessage: 'Please upload your bank statement',
    acceptedFileTypes: ACCEPTED_FILE_TYPES,
  }),
  boardResolution: validateZodFile({
    requiredMessage: 'Please upload your formal application/board resolution',
    acceptedFileTypes: ACCEPTED_FILE_TYPES,
  }),
  managementProfile: validateZodFile({
    requiredMessage: 'Please upload your management profile',
    acceptedFileTypes: ACCEPTED_FILE_TYPES,
  }),
  executedContracts: validateZodFile({
    requiredMessage: 'Please upload your executed contracts',
    acceptedFileTypes: ACCEPTED_FILE_TYPES,
  }),
  cashlowProjection: validateZodFile({
    requiredMessage: 'Please upload your cashflow projection',
    acceptedFileTypes: ACCEPTED_FILE_TYPES,
  }),
  additionalDocument: validateZodFile({
    requiredMessage: 'Please upload additional document',
    acceptedFileTypes: ACCEPTED_FILE_TYPES,
    isRequired: false,
  }),
});

export type UploadWorkingCapitalSchemaType = z.infer<typeof UploadWorkingCapitalSchema>;

export const InvoiceDiscountingSchema = z.object({
  requestAmount: z
    .string({ required_error: 'Please enter a request amount' })
    .min(1, { message: 'request amount is required' }),

  loanTenor: validateLoanTenor(),

  counterPartyEmailAddress: z
    .string()
    .min(1, { message: `counterparty's email is required` })
    .email('Email is invalid'),

  counterPartyName: z
    .string({ required_error: 'please enter a name' })
    .min(1, { message: `counterparty's name is required` }),

  counterPartyAddress: z
    .string({ required_error: "please enter counterparty's address" })
    .min(1, { message: `counterparty's address is required` }),
  invoiceDate: z.date({
    required_error: 'Please pick date of birth',
    invalid_type_error: 'Please pick date of birth',
  }),
});

export type InvoiceDiscountingSchemaType = z.infer<typeof InvoiceDiscountingSchema>;

export const UploadInvoiceDiscountingSchema = z
  .object({
    invoiceStampedByPrincipal: validateZodFile({
      requiredMessage: 'Please upload your invoice stamped by principal',
      acceptedFileTypes: ACCEPTED_FILE_TYPES,
    }),
    auditedFinancialStatement: validateZodFile({
      requiredMessage: 'Please upload your audited financial statement',
      acceptedFileTypes: ACCEPTED_FILE_TYPES,
    }),
    statementOfAccount: validateZodFile({
      requiredMessage: 'Please upload your statement of account',
      acceptedFileTypes: ACCEPTED_FILE_TYPES,
    }),
    boardResolution: validateZodFile({
      requiredMessage: 'Please upload your formal application/board resolution',
      acceptedFileTypes: ACCEPTED_FILE_TYPES,
    }),
    managementProfile: validateZodFile({
      requiredMessage: 'Please upload your management profile',
      acceptedFileTypes: ACCEPTED_FILE_TYPES,
    }),
    pastSupplies: validateZodFile({
      requiredMessage: 'Please upload your evidence of past supplies',
      acceptedFileTypes: ACCEPTED_FILE_TYPES,
    }),
    deliveryNote: validateZodFile({
      requiredMessage: 'Please upload copy of delivery note',
      acceptedFileTypes: ACCEPTED_FILE_TYPES,
    }),
  })
  .merge(BaseUploadSchema);

export type UploadInvoiceDiscountingSchemaType = z.infer<typeof UploadInvoiceDiscountingSchema>;
