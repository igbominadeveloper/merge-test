export type Status = 'success' | 'warning' | 'secondary' | 'danger';
interface Props {
  status: string;
  theme?: Status;
  className?: string;
}

const badgeClass: Record<Status, string> = {
  success: 'bg-success-500 text-success-main',
  warning: 'text-yellow-700 bg-yellow-400/60',
  secondary: 'text-grey-900 bg-grey-300',
  danger: 'text-error-300 bg-error-600/20',
};

export default function StatusBadge({ status, className, theme = 'secondary' }: Props) {
  return (
    <div
      className={`max-w-max rounded-lg p-1 px-2 text-xs font-bold !capitalize ${badgeClass[theme]} ${className}`}
    >
      {status?.toLowerCase()}
    </div>
  );
}
