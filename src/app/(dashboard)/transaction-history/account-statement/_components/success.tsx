import React from 'react';
import Image from 'next/image';
import successIcon from '@/assets/icons/email-sent.svg';
import Button from '@/shared/Form/Button';

export default function Success({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="flex flex-col items-center gap-4 p-5">
        <Image src={successIcon} width={60} alt="success-icon" />
        <div className="flex flex-1 flex-col items-center gap-1">
          <p className="text-xl font-semibold">Successful!</p>
          <p className="text-lg font-normal text-gray-900/60">
            Your account statement has been downloaded
          </p>
        </div>
      </div>

      <Button
        text="Done"
        type="button"
        handleClick={onClose}
        className="mt-3 w-full rounded-lg bg-gray-700/10 p-4 py-3 text-sm font-bold text-black"
      />
    </>
  );
}
