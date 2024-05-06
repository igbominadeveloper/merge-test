import { Metadata } from 'next';
import ChangePassword from './_components/change-password';
import ChangePin from './_components/change-pin';

export const metadata: Metadata = {
  title: 'Account Managent - Security ',
  description: 'Manage users here',
};

function Security() {
  return (
    <div className="flex w-full flex-col space-y-6">
      <ChangePassword />

      <hr className="h-[1px] w-full bg-[#919EAB33]" />

      <ChangePin />
    </div>
  );
}

export default Security;
