'use client';

import React, { useEffect } from 'react';
import VerifyBusinessStore from '@/utils/verify';
import { useRouter } from 'next/navigation';
import { useVerifyBusinessChecklist, useVerifyOwnerChecklist } from '@/store/state/useVerifyStore';
import BackText from '@/shared/BackText';
import useKYCKYBVerification from '@/hooks/useKYCKYBVerification';
import { ROUTES } from '@/utils/routes';
import { ListItem } from './list-item';

function VerifyBusinessView() {
  const { push } = useRouter();

  const { VerifyBusinessMock, VerifyOwnerMock } = VerifyBusinessStore();
  const { verifyOwnerChecklist } = useVerifyOwnerChecklist();
  const { verifyBusinessChecklist } = useVerifyBusinessChecklist();
  const { progress } = useKYCKYBVerification();
  const kycCompleted = verifyOwnerChecklist.every(checklist => checklist.completed);

  const backToDashboard = () => {
    push(ROUTES.Dashboard);
  };

  useEffect(() => {
    if (progress === 100) push('/wallet/setup');
  }, [progress, push]);

  return (
    <>
      <BackText onClick={backToDashboard} text="Back" />
      <p className="mt-2 text-[32px] font-bold">Verify your business</p>
      <div className="mt-5 w-full rounded-2xl border bg-white p-5 lg:mt-10">
        <p className="text-xl font-semibold">Let&apos;s get started!</p>

        <div className="flex justify-between">
          <div className="relative mt-3 h-[5px] w-[95%] rounded-[4px] border bg-secondary-300">
            <div
              className="absolute -mt-[1px] h-[5px] rounded-[4px] bg-secondary-200 transition-all duration-[5000] ease-out"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
          <p className="mt-1 pl-2 text-[12px] text-textColor-main">100%</p>
        </div>
        <div className="mt-5">
          <p className="mt-5 text-[20px] font-bold">
            Verify Business Owner or Representative’s details
          </p>

          {VerifyOwnerMock.map((data, index) => {
            const checklist = verifyOwnerChecklist.find(d => d.id === data.id);
            // here we are checking if the previous state has been completed first
            const previousStageCompleted =
              index === 0 ? true : verifyOwnerChecklist[index - 1].completed;
            return (
              <ListItem
                checklist={checklist}
                data={data}
                key={data.id}
                disabled={!previousStageCompleted}
              />
            );
          })}
        </div>

        <div className="mt-10">
          <p className="mt-5 text-[20px] font-bold">Verify Business Details</p>

          {VerifyBusinessMock.map((data, index) => {
            const previousStageCompleted =
              index === 0 ? !kycCompleted : verifyBusinessChecklist[index - 1].completed;
            const checklist = verifyBusinessChecklist.find(d => d.id === data.id);
            return (
              <ListItem
                checklist={checklist}
                data={data}
                key={data.id}
                disabled={previousStageCompleted}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default VerifyBusinessView;
