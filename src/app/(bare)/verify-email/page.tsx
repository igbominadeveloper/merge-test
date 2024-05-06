import { Metadata } from 'next';
import { Suspense } from 'react';
import PageTransition from '@/components/page-transition';
import { redirect } from 'next/navigation';
import VerifyEmail from './_components/verify-email';

export const metadata: Metadata = {
  title: 'Verify Email',
};

function VerifyEmailPage({ searchParams }: { searchParams: { id: string } }) {
  if (!searchParams?.id) {
    redirect('/');
  }

  return (
    <Suspense fallback={<PageTransition />}>
      <VerifyEmail />
    </Suspense>
  );
}
export default VerifyEmailPage;
