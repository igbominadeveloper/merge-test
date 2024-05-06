import { Metadata } from 'next';
import AuthLayout from '@/components/Layout/AuthLayout';
import SignupForm from './_component';

export const metadata: Metadata = {
  title: 'Sign up',
};

export default function SignUp() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}
