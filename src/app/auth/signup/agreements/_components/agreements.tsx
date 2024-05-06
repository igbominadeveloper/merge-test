'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import BackText from '@/shared/BackText';
import { ButtonSwitch } from '@/shared/ButtonSwitch';
import Logo from '@/shared/logo';
import { SignupAgreement, SignupAgreementID } from '@/types/auth';
import { ROUTES } from '@/utils/routes';
import Sidebar from './sidebar';
import Content from './content';

export default function Agreements() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const closeAgreement = () => {
    router.replace(ROUTES.signup);
  };

  const options: { label: string; value: SignupAgreementID }[] = [
    { label: 'Terms of Service', value: SignupAgreement.TERMS_OF_SERVICE },
    { label: 'Privacy Policy', value: SignupAgreement.PRIVACY_POLICY },
  ];
  const currentAgreement = searchParams.get('type') as SignupAgreement | null;

  const activeAgreement = currentAgreement || SignupAgreement.TERMS_OF_SERVICE;
  const termsOfServicePath = `${pathname}?type=${SignupAgreement.TERMS_OF_SERVICE}`;
  const privacyPolicyPath = `${pathname}?type=${SignupAgreement.PRIVACY_POLICY}`;

  const changeActiveAgreement = (value: SignupAgreementID) => {
    if (value === 'PRIVACY_POLICY') {
      router.push(privacyPolicyPath);
      return;
    }

    router.push(termsOfServicePath);
  };

  return (
    <main className="flex min-h-screen max-w-[1168px] flex-col gap-10 bg-white py-[67px] pl-[43px]">
      <section className="flex gap-20">
        <div className="w-[280px] bg-white">
          <Logo />
        </div>

        <div className="mt-16 flex w-full flex-1 flex-col gap-10">
          <BackText text="Back" onClick={closeAgreement} className="max-w-max" />
          <div className="shadow-grey-500 max-w-[400px] overflow-clip rounded-xl bg-grey-100 p-[0.5px] shadow-sm">
            <ButtonSwitch
              options={options}
              activeType={activeAgreement}
              handleChange={changeActiveAgreement}
            />
          </div>
        </div>
      </section>

      <section className="flex gap-20">
        <article className="w-[280px] overflow-scroll">
          <Sidebar activeAgreement={activeAgreement} />
        </article>

        <article className="flex-1">
          <Content activeAgreement={activeAgreement} />
        </article>
      </section>
    </main>
  );
}
