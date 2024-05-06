import Button from '@/shared/Form/Button';
import React from 'react';
import Warning from '@/assets/icons/warning.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function AccountVerification({ path }: { path: string }) {
  const { push } = useRouter();
  return (
    <div className="my-5 flex flex-col justify-between gap-5 rounded-lg bg-[#FFF5CC] p-3 lg:flex-row lg:gap-0">
      <div className="flex gap-3">
        <Image src={Warning} alt="error sign" className="-mt-5" />
        <div className="flex flex-col">
          <p className="text-[16px] text-[#7A4100]">Your account verification is pending.</p>
          <p className="text-[14px] text-[#7A4100]">
            Completing this step is vital for accessing all Katsu features and ensuring your
            account&apos;s security.
          </p>
        </div>
      </div>
      <Button
        text="Get Started"
        className="rounded-lg bg-warning-main/100 px-4 font-bold text-black hover:bg-warning-main/80"
        variant="orange"
        handleClick={() => push(path)}
      />
    </div>
  );
}

export default AccountVerification;
