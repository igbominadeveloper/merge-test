import WarningIcon from '@/assets/icons/warning.svg';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  title?: string;
}
export default function IncompleteKYC({ title = 'Fund account' }: Props) {
  return (
    <div className="flex flex-col items-center">
      <Image height={80} width={80} src={WarningIcon} alt="Warning icon" />
      <h1 className="my-4 text-2xl font-semibold">{title}?</h1>
      <p className="text-center text-base text-grey-900">
        You cannot perform any action now. Kindly upgrade your account to gain full access.
      </p>

      <Link
        href="/verify"
        className="mt-6 w-full rounded-xl bg-primary-main py-4 text-center text-white hover:bg-primary-main/90"
      >
        Complete KYC
      </Link>
    </div>
  );
}
