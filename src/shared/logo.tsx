import Image from 'next/image';
import Link from 'next/link';
import img from '@/assets/katsu-logo.svg';

function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={className}>
      <Image src={img} alt="Katsu-logo" className="w-fit" />
    </Link>
  );
}
export default Logo;
