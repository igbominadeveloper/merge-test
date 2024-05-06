'use client';

import ClearIcon from '@mui/icons-material/Clear';
import Image from 'next/image';
import sidebarItems from '@/utils/sidebarItems';
import Submenu from '@/components/Layout/Sidebar/Submenu';
import Button from '@/shared/Form/Button';
import Logo from '@/shared/logo';
import { ROUTES } from '@/utils/routes';
import { useUserProfile } from '@/services/queries/user';

export default function Sidebar({
  onCloseSidebar,
  className = '',
}: {
  onCloseSidebar: () => void;
  className?: string;
}) {
  const { data } = useUserProfile();

  return (
    <div
      className={`flex h-full  flex-col  space-y-4 overflow-y-auto bg-white px-4  pb-10 pt-6 scrollbar-hide ${className}`}
    >
      <div className="flex h-full flex-1 flex-col space-y-5">
        <div className="mx-4 mb-2 flex items-center justify-between ">
          <Logo />

          <button
            type="button"
            aria-label="close-menu"
            className="lg:hidden"
            onClick={onCloseSidebar}
          >
            <ClearIcon />
          </button>
        </div>

        <div className="flex flex-col space-y-2">
          {sidebarItems.map(menu => (
            <Submenu key={menu.id} menu={menu} />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        {data && data?.photo ? (
          <div className="relative mb-3 size-[45px]">
            <Image
              src={data?.photo}
              alt={`${data?.firstName} ${data?.lastName}`}
              fill
              className="rounded-full  object-cover"
              priority
            />
          </div>
        ) : (
          <div className="grid size-[45px] place-items-center rounded-full bg-blue-800 text-white">
            {data?.firstName?.slice(0, 1)?.toUpperCase()}
            {data?.lastName?.slice(0, 1)?.toUpperCase()}
          </div>
        )}

        <h2 className="font-primary font-bold text-textColor-primary">
          {data?.firstName} {data?.lastName}
        </h2>
        <p className="mb-4 font-primary text-sm text-gray-500">{data?.username}</p>

        <Button
          text="Logout"
          type="button"
          className=" w-full  hover:bg-grey-800 hover:bg-opacity-15 hover:text-secondary-100"
          variant="orange"
          as="link"
          href={ROUTES.logout}
        />
      </div>
    </div>
  );
}
