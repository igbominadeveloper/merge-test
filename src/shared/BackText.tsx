'use client';

import { useRouter } from 'next/navigation';
import BackIcon from '@/assets/icons/back.svg';
import Image from 'next/image';

export default function BackText({
  text,
  onClick,
  className = '',
  disabled = false,
}: {
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <button
      className={`group flex cursor-pointer items-center gap-1 hover:opacity-100 ${className}`}
      onClick={handleClick}
      disabled={disabled}
      type="button"
    >
      <Image
        src={BackIcon}
        alt="back icon"
        className="transition duration-300 group-hover:-translate-x-1"
      />
      <p className="text-sm font-medium text-primary-main sm:text-base">{text}</p>
    </button>
  );
}
