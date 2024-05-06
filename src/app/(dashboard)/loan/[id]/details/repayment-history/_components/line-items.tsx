import LineItem from './line-item';

const transactions: Props[] = [
  { date: '2024-01-01', amount: 40000, status: 'paid' },
  { date: '2024-02-01', amount: 40000, status: 'paid' },
  { date: '2024-03-01', amount: 40000, status: 'paid' },
  { date: '2024-04-01', amount: 40000, status: 'pending' },
  { date: '2024-05-01', amount: 40000, status: 'pending' },
  { date: '2024-06-01', amount: 40000, status: 'pending' },
];

interface Props {
  date: string;
  amount: number;
  status: 'paid' | 'pending';
}
export default function LineItems() {
  return (
    <div className="flex flex-col">
      {transactions.map((transaction, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <LineItem key={index} {...transaction} />
      ))}
    </div>
  );
}
