import { Metadata } from 'next';
import DetailGroup from '../_components/detail-section';
import Wrapper from '../_components/details-wrapper';

export const metadata: Metadata = {
  title: 'Loan Details',
};

type PageProps = {
  params: { id: string };
};

export default function Page({ params }: PageProps) {
  return (
    <Wrapper>
      <DetailGroup id={params.id} />;
    </Wrapper>
  );
}
