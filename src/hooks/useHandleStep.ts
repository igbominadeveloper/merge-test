import { useState } from 'react';

const useHandleStep = <T>(steps: Array<T>) => {
  const [allSteps] = useState(steps);
  const [visitedSteps, setVisitedSteps] = useState([allSteps[0]]);
  const activeStep = visitedSteps[visitedSteps.length - 1];

  const handleNextStep = () => {
    const nextStep = allSteps.at(visitedSteps.length)!;
    setVisitedSteps(visitedSteps.concat(nextStep));
  };

  const handleBackStep = () => {
    const stepsBeforeCurrent = [...visitedSteps];
    stepsBeforeCurrent.pop();
    setVisitedSteps(stepsBeforeCurrent);
  };

  return {
    visitedSteps,
    activeStep,
    handleBackStep,
    handleNextStep,
  };
};

export default useHandleStep;
