import PageTitle from '@/components/Dashboard/PageTitle';
import Button from '@/shared/Form/Button';

interface Props {
  generateStatement: () => void;
}
export default function PageHeader({ generateStatement }: Props) {
  return (
    <header className="flex flex-col justify-between gap-6 lg:flex-row">
      <PageTitle title="Transaction History" />
      <Button
        className="hidden rounded-lg px-4
         font-bold capitalize"
        variant="light-primary"
        handleClick={generateStatement}
        text="Generate Statement"
      />
    </header>
  );
}
