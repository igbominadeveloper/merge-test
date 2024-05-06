'use client';

import { Suspense } from 'react';
import PageTransition from '@/components/page-transition';
import Agreements from './_components/agreements';

export default function Page() {
  return (
    <Suspense fallback={<PageTransition />}>
      <Agreements />;
    </Suspense>
  );
}
