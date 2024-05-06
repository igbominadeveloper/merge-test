import { ISidebarItems } from '@/types/sidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Submenu({ menu }: { menu: ISidebarItems }) {
  const { name, path, icon } = menu;
  const pathname = usePathname();

  const isActive = path.split('/')[1] === pathname.split('/')[1];

  return (
    <Link
      className={`flex h-[44px] cursor-pointer items-center space-x-2 rounded-md pl-4 pr-2 hover:bg-primary-100 hover:fill-primary-main hover:text-primary-main
      ${isActive ? 'bg-primary-100 fill-primary-main' : ''}
      `}
      href={path}
    >
      {icon}
      <span
        className={`font-primary text-sm font-medium hover:text-primary-main ${isActive ? 'text-primary-main' : ''}`}
      >
        {name}
      </span>
    </Link>
  );
}
