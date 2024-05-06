interface IListItem {
  data: { key: string; value: string | number }[];
  showLastBorder?: boolean;
}

export function ListItem({ data, showLastBorder }: IListItem) {
  return (
    <div className="grid gap-4 md:p-[8.5px]">
      {data.map(({ key, value }) => (
        <div
          key={key}
          className={`border-[rgba(145, 158, 171, 0.20)] flex h-11 items-center justify-between border-b ${!showLastBorder ? 'last:border-none' : null}`}
        >
          <h6 className="text-sm font-bold md:text-lg">{key}:</h6>
          <p className="text-sm text-grey-900 md:text-lg">{value}</p>
        </div>
      ))}
    </div>
  );
}
