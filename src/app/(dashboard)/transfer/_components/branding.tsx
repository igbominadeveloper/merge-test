import { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import BankAd from '@/assets/bank-ad.png';

export default function Branding() {
  const brandTexts = ['Seamless', 'Secure'];
  const [brandTextIndex, setBrandTextIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setBrandTextIndex(prevIndex => (prevIndex === 0 ? 1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="gap-5 p-8 md:flex md:flex-col md:self-center">
      <Stack direction="column">
        <Typography className="text-xs font-bold tracking-[3px] text-grey-700">ENJOY</Typography>
        <Typography
          className="animate-slide-up text-2xl font-bold text-primary-main duration-1000"
          key={brandTextIndex}
        >
          {brandTexts[brandTextIndex]}
        </Typography>
        <Typography className="text-2xl font-bold">Transactions with Katsu</Typography>
      </Stack>
      <div className="self-center overflow-hidden rounded-xl">
        <Image className="min-h-[520px] object-cover" src={BankAd} alt="ad image" />
      </div>
    </div>
  );
}
