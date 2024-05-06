import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';

interface IPillTextIcon {
  icon: string | StaticImport;
  text: string;
  href: string;
  opensInNewTab: boolean;
}

export function PillTextIcon({ icon, text, href, opensInNewTab }: IPillTextIcon) {
  return (
    <Link
      href={href}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary-main/10 font-bold hover:bg-primary-main/20"
      target={opensInNewTab ? '_blank' : ''}
    >
      <Image src={icon} alt={text} />
      <div className="text-primary-800">{text}</div>
    </Link>
  );
}
