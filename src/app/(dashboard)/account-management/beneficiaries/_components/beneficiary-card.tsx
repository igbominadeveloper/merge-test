'use client';

import useTrxFns from '@/hooks/useTrxFns';
import { Beneficiary } from '@/types/transaction';
import { useCallback, useEffect, useRef, useState } from 'react';

function icon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.32"
        d="M3.04262 26.2113C3.16085 27.3561 3.91144 28.2623 5.03714 28.502C6.81397 28.8802 10.1634 29.3346 16.0013 29.3346C21.8392 29.3346 25.1886 28.8802 26.9655 28.502C28.0912 28.2623 28.8418 27.3561 28.96 26.2113C29.1353 24.5138 29.3346 21.3972 29.3346 16.0013C29.3346 10.6054 29.1353 7.48877 28.96 5.79132C28.8418 4.64648 28.0912 3.74029 26.9654 3.50064C25.1886 3.12238 21.8392 2.66797 16.0013 2.66797C10.1634 2.66797 6.81397 3.12238 5.03714 3.50064C3.91144 3.74029 3.16085 4.64648 3.04262 5.79132C2.86733 7.48877 2.66797 10.6054 2.66797 16.0013C2.66797 21.3972 2.86733 24.5138 3.04262 26.2113Z"
        fill="#1877F2"
      />
      <path
        d="M18.5855 18.4745C20.3519 17.5443 21.5563 15.6906 21.5563 13.5555C21.5563 10.4873 19.069 8 16.0007 8C12.9325 8 10.4452 10.4873 10.4452 13.5555C10.4452 15.6907 11.6496 17.5445 13.4162 18.4746C11.0505 19.3759 9.24418 21.4789 8.68465 24.0705C8.60725 24.4292 8.80458 24.7974 9.16585 24.8628C10.4624 25.0974 12.6095 25.3333 16.0021 25.3333C19.3946 25.3333 21.5418 25.0974 22.8383 24.8628C23.1982 24.7977 23.3951 24.4309 23.318 24.0735C22.7592 21.4804 20.9523 19.3761 18.5855 18.4745Z"
        fill="#1877F2"
      />
    </svg>
  );
}

function MenuIcon({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.9987 11.6667C10.9192 11.6667 11.6654 10.9205 11.6654 10C11.6654 9.07952 10.9192 8.33333 9.9987 8.33333C9.07822 8.33333 8.33203 9.07952 8.33203 10C8.33203 10.9205 9.07822 11.6667 9.9987 11.6667Z"
        fill="#637381"
      />
      <path
        d="M9.9987 5.83333C10.9192 5.83333 11.6654 5.08714 11.6654 4.16667C11.6654 3.24619 10.9192 2.5 9.9987 2.5C9.07822 2.5 8.33203 3.24619 8.33203 4.16667C8.33203 5.08714 9.07822 5.83333 9.9987 5.83333Z"
        fill="#637381"
      />
      <path
        d="M9.9987 17.5C10.9192 17.5 11.6654 16.7538 11.6654 15.8333C11.6654 14.9129 10.9192 14.1667 9.9987 14.1667C9.07822 14.1667 8.33203 14.9129 8.33203 15.8333C8.33203 16.7538 9.07822 17.5 9.9987 17.5Z"
        fill="#637381"
      />
    </svg>
  );
}

function BeneficiaryCard(props: Beneficiary) {
  const { accountNumber, lastName, firstName, bankName, phoneNumber, uuId, bankCode, accountId } =
    props;
  const fullName = `${firstName} ${lastName}`;
  const titleRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [toggleMenu, setToggleMenu] = useState(false);
  const { deleteBeneficiary, loading } = useTrxFns();

  useEffect(() => {
    const handleResize = () => {
      if (titleRef.current) {
        setContainerWidth(titleRef.current.offsetWidth);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleRef = useRef<HTMLDivElement>(null);

  const onClick = useCallback((event: MouseEvent) => {
    if (toggleRef.current && !toggleRef.current.contains(event.target as Node)) {
      setToggleMenu(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('mousedown', onClick);
    };
  }, [onClick]);

  const onDeleteBeneficiary = async () => {
    setToggleMenu(false);

    await deleteBeneficiary({
      uuId,
      accountNumber: accountNumber || null,
      bankCode: bankCode || null,
      bankName: bankName || null,
      deleted: true,
      firstName,
      lastName,
      phoneNumber: phoneNumber || null,
      accountId: accountId || null,
    });
  };

  return (
    <div className="flex-start flex space-x-3 rounded-2xl bg-[#F4F6F8] p-5">
      <div>{icon()}</div>

      <div className="flex flex-1 flex-col" ref={titleRef}>
        <p
          className=" w-full truncate text-base font-semibold sm:text-lg"
          style={{ maxWidth: containerWidth }}
        >
          {fullName}
        </p>
        <span className="text-xs text-[#637381] sm:text-sm">{bankName}</span>
        <span className="text-xs text-[#637381] sm:text-sm">{phoneNumber || accountNumber}</span>
      </div>

      <div className="relative flex items-start">
        <MenuIcon className="cursor" onClick={() => setToggleMenu(!toggleMenu)} role="button" />

        <div
          className={`absolute right-0 top-5 z-10 grid min-h-[44px] min-w-max place-items-center rounded-2xl bg-white px-2 py-2 shadow-sm transition-all duration-100 ${toggleMenu ? 'visible opacity-100' : 'invisible opacity-0'}`}
          role="menu"
          ref={toggleRef}
        >
          <button
            type="button"
            role="menuitem"
            className="rounded-xl px-2 py-1 text-sm font-medium text-secondary-400 hover:bg-black hover:bg-opacity-10"
            onClick={onDeleteBeneficiary}
            disabled={loading.DELETE_BENEFICIARY}
          >
            Delete beneficiary
          </button>
        </div>
      </div>
    </div>
  );
}
export default BeneficiaryCard;
