import React from 'react';
import { Search } from 'lucide-react';

interface LogSearchProps {
  query: string;
  onChange: (val: string) => void;
}

export default function LogSearch({ query, onChange }: LogSearchProps) {
  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
      <input
        type="text"
        placeholder="Filter by domain or device..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#121216] border border-white/5 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00f2ff]/50 transition-all"
      />
    </div>
  );
}