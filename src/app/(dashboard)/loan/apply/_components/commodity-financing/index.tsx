'use client';

import { useState } from 'react';
import useHandleStep from '@/hooks/useHandleStep';

import CommodityFinancingApplicationForm from './details-form';
import UploadDocument from './upload-document';
import Stepper from '../stepper';
import { CommodityFinancingType } from './types';

enum Stages {
  'STEP_ONE',
  'STEP_TWO',
}

type StageType = keyof typeof Stages;

function Commodity() {
  const [currentStage, setCurrentStage] = useState<StageType>('STEP_ONE');
  const allSteps = [Stages.STEP_ONE, Stages.STEP_TWO];
  const { visitedSteps, handleNextStep, handleBackStep } = useHandleStep(allSteps);
  const [detailsData, setDetailsData] = useState<CommodityFinancingType>(null);

  const renderPages: Record<StageType, React.ReactNode> = {
    STEP_ONE: (
      <CommodityFinancingApplicationForm
        setData={setDetailsData}
        defaultData={detailsData}
        onNext={() => {
          handleNextStep();
          setCurrentStage('STEP_TWO');
        }}
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

export default Commodity;
