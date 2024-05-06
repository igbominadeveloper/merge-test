import Button from '@/shared/Form/Button';
import sendIcon from '@/assets/icons/send.svg';
import Image from 'next/image';

export default function VerifyEmailSuccess({ businessName }: { businessName: string }) {
  return (
    <div className="mb-10 flex flex-col items-center space-y-6">
      <Image src={sendIcon} alt="Send icon" />

      <div className="text-center">
        <h3 className="text-[2rem]/[3rem] font-bold text-grey-800 ">Welcome, {businessName}!</h3>
        <p className="leading-[24px] text-grey-900">
          {`Welcome to Katsu! We're thrilled to have you on board.`}
        </p>
      </div>

      <Button
        text="Continue to dashboard"
        ariaLabel="Continue to dashboard"
        type="button"
        as="link"
        href="/"
        className="w-full"
      />
    </div>
  );
}
