import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box } from '@mui/material';
import { SignupAgreement } from '@/types/auth';

export default function AgreementLinks() {
  const pathname = usePathname();
  const termsOfServicePath = `${pathname}/agreements?type=${SignupAgreement.TERMS_OF_SERVICE}`;
  const privacyPolicyPath = `${pathname}/agreements?type=${SignupAgreement.PRIVACY_POLICY}`;

  return (
    <Box component="section">
      <p className="text-caption text-grey-900">
        I accept the{' '}
        <Link className="font-bold text-primary-main" href={termsOfServicePath}>
          Terms of service
        </Link>{' '}
        and{' '}
        <Link className="font-bold text-primary-main" href={privacyPolicyPath}>
          Privacy Policy
        </Link>
      </p>
    </Box>
  );
}
