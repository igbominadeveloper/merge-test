interface Props {
  visitedSteps: number;
  totalSteps: number;
}
function Stepper({ visitedSteps, totalSteps }: Props) {
  return (
    <div className="mb-6 w-full max-w-[480px]">
      <p className=" font-bold text-disabled">
        STEP {visitedSteps} OF {totalSteps}
      </p>

      <div className="flex items-center space-x-2">
        <div className="relative  h-1 w-full flex-1 rounded-[50px] bg-primary-main bg-opacity-[24%]">
          <div
            className="absolute left-0 top-0 h-full w-full rounded-[50px] bg-primary-main "
            style={{
              width: `${(visitedSteps / totalSteps) * 100}%`,
            }}
          />
        </div>

        <span className="text-xs text-secondary-400">100%</span>
      </div>
    </div>
  );
}

export default Stepper;
