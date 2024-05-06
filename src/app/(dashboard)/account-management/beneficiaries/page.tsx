import { Metadata } from 'next';
import Beneficiaries from './_components';

export const metadata: Metadata = {
  title: 'Account Managent - Beneficiaries',
  description: 'Manage users here',
};

async function Beneficiary() {
  return <Beneficiaries />;
}
export default Beneficiary;
