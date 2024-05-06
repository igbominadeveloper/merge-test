function LoadingSkeleton() {
  return (
    <div className="w-full max-w-sm rounded-2xl p-4 shadow">
      <div className="flex animate-pulse space-x-4">
        <div className="size-8 rounded-md bg-[#e8eaec]" />
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 rounded bg-[#e8eaec]" />
          <div className="space-y-3">
            <div className=" h-2 rounded bg-[#e8eaec]" />
            <div className="h-2 rounded bg-[#e8eaec]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;
