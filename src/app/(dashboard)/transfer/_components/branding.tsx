import { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Image from 'next/image';
import BankAd from '@/assets/bank-ad.png';

export default function Branding() {
  const [brandTexts, setBrandTexts] = useState(['Seamless', 'Secure']);
  const [parent] = useAutoAnimate({ duration: 700 });

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const reversed = [...brandTexts];
      reversed.push(reversed.shift()!);
      setBrandTexts(reversed);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [brandTexts]);

  return (
    <div className="gap-5 p-8 md:flex md:flex-col md:self-center">
      <Stack direction="column">
        <Typography className="text-xs font-bold tracking-[3px] text-grey-700">ENJOY</Typography>

        <div ref={parent} className="h-7 overflow-hidden">
          {brandTexts.map(brandText => (
            <Typography key={brandText} className="text-2xl font-bold text-primary-main">
              {brandText}
            </Typography>
          ))}
        </div>
        <Typography className="text-2xl font-bold">Transactions with Katsu</Typography>
      </Stack>
      <div className="self-center overflow-hidden rounded-xl">
        <Image
          className="min-h-[520px] object-cover"
          placeholder="blur"
          quality={50}
          src={BankAd}
          alt="ad image"
        />
      </div>
    </div>
  );
}
