import truck from '@/assets/icons/truck.svg';
import capital from '@/assets/icons/capital.svg';
import invoice from '@/assets/icons/invoice.svg';
import box from '@/assets/icons/box.svg';

export const loanTypeParam = (title: string) => title.split(' ').join('-').toLowerCase();

export const loanTypes = [
  {
    title: 'Commodity Financing',
    className: 'col-span-full row-span-1 lg:col-span-1 lg:row-span-2',
    icon: truck,
    description: `
    Need help financing the aggregation, transportation, or processing of agricultural grains, solid minerals for export or local trade?

    Our Commodity Finance helps to provide short-term facilities to a range of actors in the value chain, including Processors, Aggregators, Commodity traders and Exporters
    `,
  },
  {
    title: 'Inventory Financing',
    className: 'col-span-full lg:col-span-2',
    icon: box,
    description: `Need to stock up on inventory but short on cash? Our Inventory financing is a short-term facility that helps businesses purchase inventory, such as finished goods, or raw materials to meet immediate customer or seasonal demands.`,
  },
  {
    title: 'Working Capital',
    className: 'col-span-full lg:col-span-1',
    icon: capital,
    description: `Our working capital financing product is designed to support businesses to meet their short-term liquidity and operational requirements.`,
  },
  {
    title: 'Invoice Discounting',
    className: 'col-span-full lg:col-span-1',
    icon: invoice,
    description: `Get paid faster with Invoice Discounting. 
    Turn unpaid invoices into immediate cash to cover expenses, invest in growth, or simply improve your cash flow.`,
  },
];
