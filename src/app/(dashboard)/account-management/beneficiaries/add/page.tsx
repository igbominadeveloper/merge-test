import { Metadata } from 'next';
import AddBeneficiary from '../_components/add-beneficiary';

export const metadata: Metadata = {
  title: 'Add Beneficiaries',
  description: 'Manage users here',
};

function AddBeneficiaryPage() {
  return <AddBeneficiary />;
}

export default AddBeneficiaryPage;
