import LoanType from './loan-type';
import { loanTypes } from '../_utils';

export default function Apply() {
  return (
    <div className="grid min-h-[614px] grid-rows-4 gap-4 lg:grid-cols-[352px_352px_1fr] lg:grid-rows-2">
      {loanTypes.map(loanType => (
        <LoanType key={loanType.title} {...loanType} />
      ))}
    </div>
  );
}
