import { useState } from 'react';
import { LoanStatusEnum, LoanProductCategoryEnum } from '@/types/loan';

const transactions = [
  {
    _id: '989898110',
    createdAt: '2024-03-21T08:30:00.000Z',
    productCategory: LoanProductCategoryEnum.CommodityFinancing,
    loanAmount: 1000,
    paymentTenorInDays: 30,
    status: LoanStatusEnum.Approved,
    updatedAt: '2024-10-10T08:30:00.000Z',
  },
  {
    _id: '989898111',
    createdAt: '2024-03-22T12:45:00.000Z',
    productCategory: LoanProductCategoryEnum.CommodityFinancing,
    loanAmount: 2000,
    paymentTenorInDays: 45,
    status: LoanStatusEnum.New,
    updatedAt: '2024-10-10T08:30:00.000Z',
  },
  {
    _id: '989898112',
    createdAt: '2024-03-23T16:20:00.000Z',
    productCategory: LoanProductCategoryEnum.InventoryFinancing,
    loanAmount: 1500,
    paymentTenorInDays: 60,
    status: LoanStatusEnum.Rejected,
    updatedAt: '2024-10-10T08:30:00.000Z',
  },
  {
    _id: '989898113',
    createdAt: '2024-03-24T09:10:00.000Z',
    productCategory: LoanProductCategoryEnum.WorkingCapital,
    loanAmount: 3000,
    paymentTenorInDays: 30,
    status: LoanStatusEnum.Approved,
    updatedAt: '2024-10-10T08:30:00.000Z',
  },
  {
    _id: '989898114',
    createdAt: '2024-03-25T14:35:00.000Z',
    productCategory: LoanProductCategoryEnum.CommodityFinancing,
    loanAmount: 2500,
    paymentTenorInDays: 45,
    status: LoanStatusEnum.CreditAssessment,
    updatedAt: '2024-10-10T08:30:00.000Z',
  },
  {
    _id: '989898115',
    createdAt: '2024-03-26T10:00:00.000Z',
    productCategory: LoanProductCategoryEnum.InventoryFinancing,
    loanAmount: 1800,
    paymentTenorInDays: 60,
    status: LoanStatusEnum.Approved,
    updatedAt: '2024-10-10T08:30:00.000Z',
  },
  {
    _id: '989898116',
    createdAt: '2024-03-27T17:45:00.000Z',
    productCategory: LoanProductCategoryEnum.WorkingCapital,
    loanAmount: 3500,
    paymentTenorInDays: 30,
    status: LoanStatusEnum.CreditAssessment,
    updatedAt: '2024-10-10T08:30:00.000Z',
  },
  {
    _id: '989898117',
    createdAt: '2024-03-28T13:20:00.000Z',
    productCategory: LoanProductCategoryEnum.CommodityFinancing,
    loanAmount: 2700,
    paymentTenorInDays: 45,
    status: LoanStatusEnum.CreditAssessment,
    updatedAt: '2024-10-10T08:30:00.000Z',
  },
  {
    _id: '989898118',
    createdAt: '2024-03-29T11:55:00.000Z',
    productCategory: LoanProductCategoryEnum.InvoiceDiscounting,
    loanAmount: 2000,
    paymentTenorInDays: 60,
    status: LoanStatusEnum.Rejected,
    updatedAt: '2024-10-10T08:30:00.000Z',
  },
  {
    _id: '989898119',
    createdAt: '2024-03-30T14:30:00.000Z',
    productCategory: LoanProductCategoryEnum.WorkingCapital,
    loanAmount: 4000,
    paymentTenorInDays: 30,
    status: LoanStatusEnum.Rejected,
    updatedAt: '2024-10-10T08:30:00.000Z',
  },
  {
    _id: '989898120',
    createdAt: '2024-03-31T18:00:00.000Z',
    productCategory: LoanProductCategoryEnum.CommodityFinancing,
    loanAmount: 3000,
    paymentTenorInDays: 45,
    status: LoanStatusEnum.Rejected,
    updatedAt: '2024-10-10T08:30:00.000Z',
  },
  {
    _id: '989898121',
    createdAt: '2024-04-01T12:15:00.000Z',
    productCategory: LoanProductCategoryEnum.InvoiceDiscounting,
    loanAmount: 2200,
    paymentTenorInDays: 60,
    status: LoanStatusEnum.Rejected,
    updatedAt: '2024-10-10T08:30:00.000Z',
  },
  {
    _id: '989898122',
    createdAt: '2024-04-02T15:50:00.000Z',
    productCategory: LoanProductCategoryEnum.WorkingCapital,
    loanAmount: 4500,
    paymentTenorInDays: 30,
    status: LoanStatusEnum.Approved,
    updatedAt: '2024-10-10T08:30:00.000Z',
  },
  {
    _id: '989898123',
    createdAt: '2024-04-03T10:25:00.000Z',
    productCategory: LoanProductCategoryEnum.CommodityFinancing,
    loanAmount: 3200,
    paymentTenorInDays: 45,
    status: LoanStatusEnum.CreditAssessment,
    updatedAt: '2024-10-10T08:30:00.000Z',
  },
  {
    _id: '989898124',
    createdAt: '2024-04-04T16:40:00.000Z',
    productCategory: LoanProductCategoryEnum.InvoiceDiscounting,
    loanAmount: 2400,
    paymentTenorInDays: 60,
    status: LoanStatusEnum.Rejected,
    updatedAt: '2024-10-10T08:30:00.000Z',
  },
];

export default function useLoanTransactions() {
  const [allTransactions] = useState(transactions);
  const transactionsMap = new Map<string, any>(new Map());

  allTransactions.forEach(transaction => {
    transactionsMap.set(transaction._id, transaction);
  });

  const getTransactionByID = (_id: string) => transactionsMap.get(_id);

  const filterByStatus = (status: LoanStatusEnum) =>
    allTransactions.filter(transaction => transaction.status === status);

  const activeLoans = filterByStatus(LoanStatusEnum.Approved);
  const upcomingPayments = activeLoans.reduce((prev, current) => prev + current.loanAmount, 0);

  return {
    transactions,
    activeLoans,
    upcomingPayments,
    getTransactionByID,
  };
}
