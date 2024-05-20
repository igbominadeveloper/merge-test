import SearchIcon from '@mui/icons-material/Search';

interface Props {
  placeholder?: string;
  className?: string;
  value: string | null;
  onChange: (value: string) => void;
}
export default function Search({ placeholder = 'Search...', className, value, onChange }: Props) {
  return (
    <div className={`flex items-center rounded-md bg-gray-100 p-2 py-3 ${className}`}>
      <SearchIcon className="mr-2 size-7 text-gray-400" />
      <input
        placeholder={placeholder}
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        className="h-full flex-1 bg-transparent outline-none"
      />
    </div>
  );
}
