import { SignupAgreementID, SignupAgreementSection } from '@/types/auth';
import agreements from '../_utils/signup-agreements';
import PrivacyPolicy from './privacy-policy.mdx';
import TermsOfService from './terms-of-service.mdx';

interface Props {
  activeAgreement: SignupAgreementID;
}

export default function Content({ activeAgreement }: Props) {
  const sections: readonly SignupAgreementSection[] = agreements as SignupAgreementSection[];
  const activeSection = sections.find(section => section.id === activeAgreement)!;

  const content: Record<SignupAgreementID, React.ReactNode> = {
    TERMS_OF_SERVICE: <TermsOfService />,
    PRIVACY_POLICY: <PrivacyPolicy />,
  };

  return (
    activeSection && (
      <div className="flex flex-col gap-3">
        <header className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold">{activeSection.title}</h1>
          <div>{activeSection.summary}</div>
        </header>

        <section className="prose max-w-full text-justify prose-headings:my-2 prose-headings:font-semibold prose-headings:text-black prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-h4:text-sm prose-h5:text-xs">
          <div className="w-full">{content[activeAgreement]}</div>
        </section>
      </div>
    )
  );
}
