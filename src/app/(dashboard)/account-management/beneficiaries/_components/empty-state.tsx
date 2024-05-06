import Button from '@/shared/Form/Button';
import { ROUTES } from '@/utils/routes';
import userIcon from '@/assets/icons/user.svg';
import Image from 'next/image';

function EmptyState({ isSearch = false }: { isSearch?: boolean }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center space-y-5 text-center">
      <Image src={userIcon} alt="user placeholder" width={48} height={48} />

      <div className="flex flex-col items-center space-y-2 text-center">
        <h4 className="text-lg font-bold">
          {isSearch ? 'No beneficary found' : 'No saved beneficiary'}
        </h4>
        <p className="text-sm font-normal text-secondary-400">
          {isSearch ? 'Please try searching a saved name' : 'Nothing to see here yet'}
        </p>
      </div>

      {!isSearch && (
        <Button
          variant="light-primary"
          className="w-auto flex-shrink-0"
          text="Add New Beneficiary"
          as="link"
          href={`${ROUTES.AccountManagement}/beneficiaries/add`}
        />
      )}
    </div>
  );
}

export default EmptyState;
