import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder = "Buscar produto, empresa ou categoria..." }: Props) {
  return (
    <div className="bg-white rounded-2xl px-5 py-4 flex items-center gap-3 shadow-md border border-zinc-100 flex-1">
      <Search className="text-zinc-400" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full outline-none text-zinc-700 text-lg bg-transparent"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
