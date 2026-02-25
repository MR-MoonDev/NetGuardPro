import React from 'react';
import { Search, Activity } from 'lucide-react';
import { Device } from '../../types';

interface DeviceSearchBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  devices: Device[];
}

export default function DeviceSearchBar({ searchQuery, setSearchQuery, devices }: DeviceSearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
        <input
          type="text"
          placeholder="Search devices by name, IP, MAC..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#121216] border border-white/5 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00f2ff]/50 transition-all"
        />
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-[#00f2ff]/5 border border-[#00f2ff]/10 rounded-xl">
        <Activity className="w-4 h-4 text-[#00f2ff]" />
        <span className="text-xs font-semibold text-[#00f2ff]">{devices.filter(d => d.status === 'online').length} Devices Active</span>
      </div>
    </div>
  );
}