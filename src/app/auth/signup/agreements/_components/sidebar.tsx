'use client';

import { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import { SignupAgreementID, SignupAgreementSection } from '@/types/auth';
import agreements from '../_utils/signup-agreements';

interface Props {
  activeAgreement: SignupAgreementID;
}

const sections: readonly SignupAgreementSection[] = agreements as SignupAgreementSection[];

export default function Sidebar({ activeAgreement }: Props) {
  const activeSection = sections.find(section => section.id === activeAgreement)!;
  const pathname = usePathname();
  const pathWithSearch = `${pathname}?type=${activeAgreement}`;
  const [currentSectionID, setCurrentSectionID] = useState(
    (typeof window !== 'undefined' && window.location.hash.slice(1)) || 'introduction',
  );

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentSectionID(window.location.hash.slice(1));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    activeSection && (
      <Stack direction="column">
        <Typography component="h2" className="mb-2 pl-2 text-xs font-bold uppercase text-grey-700">
          {activeSection.title}
        </Typography>

        <section className="flex flex-col gap-1">
          {activeSection.headings.map(heading => (
            <Typography
              component="a"
              href={`${pathWithSearch}#${heading.link}`}
              key={heading.link}
              className={`rounded-xl p-3 text-sm ${currentSectionID === heading.link ? 'bg-primary-main/20 text-primary-main' : 'text-secondary-400'}`}
            >
              {heading.label}
            </Typography>
          ))}
        </section>
      </Stack>
    )
  );
}
