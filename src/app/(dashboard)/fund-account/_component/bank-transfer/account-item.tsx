function AccountItem({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex flex-wrap justify-between">
      <small className="grow-1 basis-[200px]  text-sm font-normal text-secondary-400 sm:text-base">
        {title}
        <span className="hidden min-[472px]:inline-block">:</span>
      </small>

      <div className="grow-1 basis-[200px]">
        <p className="text-base font-semibold sm:text-xl">{value}</p>
      </div>
    </div>
  );
}

export default AccountItem;
