'use client';

import Image, { StaticImageData } from 'next/image';

import Button from '@/shared/Form/Button';
import { ROUTES } from '@/utils/routes';
import { loanTypeParam } from '../_utils';

interface Props {
  className?: string;
  description: string;
  icon: StaticImageData;
  title: string;
}
export default function LoanType(props: Props) {
  const { description, icon, title, className } = props;

  return (
    <article className={`flex flex-col gap-5 rounded-2xl bg-white p-6 ${className}`}>
      <Image src={icon} alt={title} height={45} width={45} />
      <h1 className="text-xl font-bold">{title}</h1>
      <div
        className="max-w-[70ch] text-grey-900"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br>') }}
      />
      <Button
        as="link"
        className="w-max"
        text="Apply for loan"
        variant="light-primary"
        href={`${ROUTES.Loan}/apply/${loanTypeParam(title)}`}
      />
    </article>
  );
}
