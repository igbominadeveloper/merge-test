import { Metadata } from 'next';
import AuthLayout from '@/components/Layout/AuthLayout';
import CapitalAd from '@/assets/capital-ad.png';
import SignupForm from './_component';
import AdWrapper from '../_components/ad-wrapper';

export const metadata: Metadata = {
  title: 'Sign up',
};

export default function SignUp() {
  return (
    <AuthLayout className="sm:max-w-full">
      <AdWrapper image={CapitalAd}>
        <SignupForm />
      </AdWrapper>
    </AuthLayout>
  );
}
