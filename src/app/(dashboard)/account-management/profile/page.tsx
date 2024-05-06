import { Metadata } from 'next';
import ProfileDetails from './_components/profile-details';
import ProfilePhoto from './_components/profile-photo';
import BusinessDetails from './_components/business-details';

export const metadata: Metadata = {
  title: 'Account Managent - Profile',
  description: 'Manage users here',
};

function ProfilePage() {
  return (
    <div className="flex w-full flex-col space-y-6">
      <ProfilePhoto />

      <hr className="h-[1px] w-full bg-[#919EAB33]" />

      <ProfileDetails />

      <hr className="h-[1px] w-full bg-[#919EAB33]" />

      <BusinessDetails />
    </div>
  );
}
export default ProfilePage;
