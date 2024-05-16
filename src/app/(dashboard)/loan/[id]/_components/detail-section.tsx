'use client';

import { styled } from '@mui/material';
import Image from 'next/image';
import Accordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import pdfIcon from '@/assets/icons/pdf-icon.svg';
import { useLoanTransaction } from '@/services/queries/loan';
import { DocLinks } from '@/types/loan';
import { formatAmount } from '@/utils/helpers';

/* eslint-disable react/button-has-type */

type TextLineItem = {
  title: string;
  value: string;
};

interface Props {
  title: string;
  lineItems: TextLineItem[] | DocLinks[];
}

const AccordionOverride = styled((props: AccordionProps) => <Accordion {...props} />)(() => ({
  '&.Mui-expanded': {
    margin: 0,
  },
  '&.Mui-expanded:not(:first-of-type)': {
    borderTop: '1px solid lightgray',
  },
}));

const isTextType = (lineItem: TextLineItem | DocLinks): lineItem is TextLineItem =>
  (lineItem as TextLineItem).title !== undefined;

function FileItem(props: DocLinks) {
  const { name, status, link, extension } = props;

  const fileName = `${name}.${extension}`;

  const handleDownload = () => {
    const anchor = document.createElement('a');
    anchor.href = link;
    anchor.download = fileName;
    anchor.target = '_blank';
    anchor.click();
  };

  return (
    <button
      onClick={handleDownload}
      className="flex h-full w-full items-center gap-3 rounded-xl border border-gray-200 bg-grey-300/30 p-5"
    >
      <Image src={pdfIcon} width={32} alt="pdf-icon" />
      <div className="flex flex-1 flex-col items-start gap-1 text-xs">
        <p className="self-start text-left text-sm font-semibold">{fileName}</p>
        <p className="text-xs text-gray-400">{status}</p>
      </div>
    </button>
  );
}

function DetailSection({ lineItems, title }: Props) {
  return (
    <AccordionOverride className="border-none shadow-none">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={title}
        id={title}
        className="py-4"
      >
        <Typography className="text-lg font-bold">{title}</Typography>
      </AccordionSummary>
      <div className="grid grid-cols-2 gap-2 pb-5">
        {lineItems.map(lineItem => {
          return isTextType(lineItem) ? (
            <AccordionDetails key={lineItem.title}>
              <Typography className="text-xs text-grey-900">{lineItem.title}</Typography>
              <Typography className="text-sm">{lineItem.value}</Typography>
            </AccordionDetails>
          ) : (
            <AccordionDetails key={lineItem.name}>
              <FileItem {...lineItem} />
            </AccordionDetails>
          );
        })}
      </div>
    </AccordionOverride>
  );
}

export default function DetailSections({ id }: { id: string }) {
  const { data } = useLoanTransaction(id);

  const returnObject = (obj: { title: string; value: string | undefined | null }) => {
    return obj?.value ? [{ title: obj?.title, value: obj?.value || '' }] : [];
  };

  const isNumber = (value: number | undefined): string => {
    if (typeof value === 'undefined') return '';
    return value === 0 ? '' : value?.toString();
  };

  const groups: Props[] = [
    {
      title: 'Product information',
      lineItems: [
        ...returnObject({
          title: 'Product type',
          value: data?.productType,
        }),

        ...returnObject({
          title: 'Transaction type',
          value: data?.loanType,
        }),

        ...returnObject({
          title: 'Product',
          value: data?.productList,
        }),

        ...returnObject({
          title: 'Product unit',
          value: data?.productUnit,
        }),

        ...returnObject({
          title: 'Product quantity',
          value: isNumber(data?.productQuantity)?.toLocaleString(),
        }),
        ...returnObject({
          title: 'Product unit selling price',
          value: isNumber(data?.productUnitSellingPrice)?.toLocaleString(),
        }),

        ...returnObject({
          title: 'Request Amount',
          value: formatAmount(data?.loanAmount),
        }),

        ...returnObject({
          title: 'Loan Tenor',
          value: `${data?.paymentTenorInDays} days`,
        }),

        ...returnObject({
          title: 'Loan Purpose',
          value: data?.loanPurpose,
        }),
      ],
    },
    {
      title: "Logistics or Offtaker's Information",
      lineItems: [
        ...returnObject({
          title: 'Logistics cost per truck',
          value: isNumber(data?.logisticsCostPerTruck)?.toLocaleString(),
        }),
        ...returnObject({
          title: 'Logistics number of trucks',
          value: isNumber(data?.logisticsNumberOfTrucks)?.toLocaleString(),
        }),
        ...returnObject({
          title: 'Off-taker’s name',
          value: data?.offTakerName
            ? data?.offTakerName
            : `${data?.offTaker?.firstName ?? ''} ${data?.offTaker?.lastName ?? ''}`,
        }),
        ...returnObject({
          title: 'Off-taker’s address',
          value: data?.offTakerAddress ? data?.offTakerAddress : data?.offTaker?.address,
        }),

        ...returnObject({
          title: 'Off-taker’s email',
          value: data?.offTakerEmail ? data?.offTakerEmail : data?.offTaker?.username,
        }),
      ],
    },
    {
      title: 'Documents',
      lineItems: [...(data?.docLinks ?? [])],
    },
  ];

  return (
    <div className="flex flex-col bg-white px-8">
      {groups.map(group => (
        <DetailSection key={group.title} lineItems={group.lineItems} title={group.title} />
      ))}
    </div>
  );
}
