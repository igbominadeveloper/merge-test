'use client';

import { useState } from 'react';
import useHandleStep from '@/hooks/useHandleStep';

import UploadDocument from './upload-document';
import Stepper from '../stepper';
import WorkingCapitalApplicationForm from './details-form';
import { WorkingCapitalType } from './types';

enum Stages {
  'STEP_ONE',
  'STEP_TWO',
}

type StageType = keyof typeof Stages;

function WorkingCapital() {
  const [currentStage, setCurrentStage] = useState<StageType>('STEP_ONE');
  const allSteps = [Stages.STEP_ONE, Stages.STEP_TWO];
  const { visitedSteps, handleNextStep, handleBackStep } = useHandleStep(allSteps);
  const [detailsData, setDetailsData] = useState<WorkingCapitalType>(null);

  const renderPages: Record<StageType, React.ReactNode> = {
    STEP_ONE: (
      <WorkingCapitalApplicationForm
        onNext={() => {
          handleNextStep();
          setCurrentStage('STEP_TWO');
        }}
        setData={setDetailsData}
        defaultData={detailsData}
      />
    ),
    STEP_TWO: (
      <UploadDocument
        onBack={() => {
          setCurrentStage('STEP_ONE');
          handleBackStep();
        }}
        setData={setDetailsData}
        defaultData={detailsData}
      />
    ),
  };

  return (
    <div>
      <Stepper visitedSteps={visitedSteps.length} totalSteps={allSteps.length} />
      {renderPages[currentStage]}
    </div>
  );
}

export default WorkingCapital;
