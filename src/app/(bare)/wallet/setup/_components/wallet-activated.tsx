import Link from 'next/link';

export default function WalletActivated() {
  return (
    <>
      <p className="text-center text-sm text-secondary-400 sm:text-base">
        {`Now, let's set up your PIN`}
      </p>

      <Link className="btn-primary w-full" href="/wallet/create-pin">
        Set up PIN
      </Link>
    </>
  );
}
