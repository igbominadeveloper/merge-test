'use client';

import { useEffect, useState } from 'react';
import { useAccountBalance } from '@/services/queries/wallet';
import { formatAmount } from '@/utils/helpers';
import { Skeleton } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

function Balance() {
  const { data: balance, isLoading } = useAccountBalance();
  const [showBalance, setShowBalance] = useState(true);

  const [currentBalance, setCurrentBalance] = useState(0);

  useEffect(() => {
    if (!isLoading && balance) {
      const duration = 3000; // 3 seconds
      const increment = Math.ceil(balance.availableBalance / (duration / 30)); // Calculate increment based on duration
      const interval = setInterval(() => {
        setCurrentBalance(prevBalance => {
          if (prevBalance < balance.availableBalance) {
            return Math.min(prevBalance + increment, balance.availableBalance); // Increment by the calculated amount
          }
          clearInterval(interval);
          return balance.availableBalance;
        });
      }, 10); // Speed of the animation
      return () => clearInterval(interval);
    }
  }, [isLoading, balance]);

  return (
    <div className="relative col-span-3 w-full flex-shrink-0 overflow-hidden rounded-2xl border-2 bg-gradient-to-l from-[#2C3A42] via-[rgb(54,111,184)] to-[#2C3A42] text-white">
      <div className="p-6">
        <p className="font-medium">Account Balance</p>
        <div
          className="mt-1 flex cursor-pointer items-center justify-between"
          onClick={() => setShowBalance(!showBalance)}
        >
          <h3
            className={`max-w-[20ch] truncate overflow-ellipsis text-[32px] font-bold ${showBalance ? 'visible' : 'invisible w-0'}`}
          >
            {isLoading ? (
              <Skeleton className="w-20 bg-slate-300 text-xs" />
            ) : (
              formatAmount(currentBalance)
            )}
          </h3>
          <div
            className={`mr-auto flex h-12 items-center gap-2 transition-all duration-300 ${showBalance ? 'invisible w-0' : 'visible'}`}
          >
            {Array(8)
              .fill(1)
              .map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index} className="h-3 w-3 rounded-full bg-white" />
              ))}
          </div>
          {showBalance ? (
            <VisibilityOffIcon className="text-[32px] font-bold" />
          ) : (
            <VisibilityIcon className="text-[32px] font-bold" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Balance;
