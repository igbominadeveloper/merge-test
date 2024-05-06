'use client';

import { useState } from 'react';
import useHandleStep from '@/hooks/useHandleStep';
import { useBusinessDetailsStore } from '@/store/state/useBusinessDetails';
import BusinessRepDetails from './business-rep-details';
import BusinessDetails from './business-detail';
import { SignUpDataType } from './types';

enum Stages {
  'BUSINESS_REPRESENTATIVE',
  'BUSINESS_DETAILS',
}

type StageType = keyof typeof Stages;

function FormStepNav({ isActive, title }: { title: string; isActive: boolean }) {
  return (
    <div className="">
      <div
        className={`h-[4px] rounded border ${
          isActive ? 'border-primary-main bg-primary-main' : 'border-[#F4F6F8] bg-[#F4F6F8]'
        } `}
      />
      <h4 className="pt-2 text-xs text-grey-800 sm:text-sm">{title}</h4>
    </div>
  );
}

const steps: Record<StageType, string> = {
  BUSINESS_REPRESENTATIVE: '1. Business Details',
  BUSINESS_DETAILS: '2. Business Representative Details ',
};

export default function SignupForm() {
  const { businessDetails } = useBusinessDetailsStore();
  const [currentStage, setCurrentStage] = useState<StageType>('BUSINESS_DETAILS');
  // We are doing this so that we can preserve the form state when the user open the policy page and then comes back
  const [detailsData, setDetailsData] = useState<SignUpDataType>(businessDetails);

  const allSteps = Object.keys(steps);
  const { handleBackStep, handleNextStep, visitedSteps } = useHandleStep(allSteps);

  const renderPages: Record<
    StageType,
    {
      title?: string;
      description?: string;
      component: React.ReactNode;
    }
  > = {
    BUSINESS_DETAILS: {
      title: 'Create a Business Account',
      description: 'Kindly provide information for your business and the business representative.',
      component: (
        <BusinessDetails
          onNext={() => {
            handleNextStep();
            setCurrentStage('BUSINESS_REPRESENTATIVE');
          }}
          setData={setDetailsData}
          defaultData={detailsData}
        />
      ),
    },

    BUSINESS_REPRESENTATIVE: {
      title: 'Create a Business Account',
      description: 'Kindly provide information for your business and the business representative.',
      component: (
        <BusinessRepDetails
          detailsData={detailsData}
          setDetailsData={setDetailsData}
          onBack={() => {
            handleBackStep();
            setCurrentStage('BUSINESS_DETAILS');
          }}
        />
      ),
    },
  };

  const isForm = currentStage === 'BUSINESS_REPRESENTATIVE' || currentStage === 'BUSINESS_DETAILS';

  return (
    <>
      <header className="">
        <h3 className="pb-1 text-3xl font-bold leading-tight text-grey-800 sm:text-[32px]">
          {renderPages[currentStage].title}
        </h3>
        <p className="text-sm text-grey-900  sm:text-base">
          {renderPages[currentStage].description}
        </p>
      </header>

      {isForm && (
        <div className="my-8 grid grid-cols-2 gap-x-4 sm:gap-x-6">
          {allSteps.map((item, index) => {
            return (
              <FormStepNav
                key={item}
                title={steps[item as Exclude<StageType, 'OTP' | 'SUCCESS'>]}
                isActive={visitedSteps[index] === allSteps[index]}
              />
            );
          })}
        </div>
      )}

      {renderPages[currentStage].component}
    </>
  );
}
