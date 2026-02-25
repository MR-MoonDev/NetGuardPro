import React from 'react';
import { Calendar, Smartphone, Globe, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Log } from '../../types';
import { cn } from '../../lib/utils';

interface LogRowProps {
  log: Log;
}

// React.FC automatically allows key prop
const LogRow: React.FC<LogRowProps> = ({ log }) => {
  return (
    <tr className="hover:bg-white/[0.02] transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-zinc-400">
          <Calendar className="w-3.5 h-3.5" />
          <span className="text-xs font-mono">
            {new Date(log.timestamp).toLocaleString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit',
              second: '2-digit'
            })}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Smartphone className="w-3.5 h-3.5 text-zinc-500" />
          <span className="text-sm font-medium">{log.device_name}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-zinc-500" />
          <span className="text-sm font-mono text-zinc-300">{log.domain}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className={cn(
          "inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
          log.action === 'blocked' 
            ? "bg-red-500/10 text-red-400 border border-red-500/20" 
            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
        )}>
          {log.action === 'blocked' ? <ShieldAlert className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
          {log.action}
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <button className="text-xs font-semibold text-zinc-500 hover:text-[#00f2ff] transition-colors">
          View Info
        </button>
      </td>
    </tr>
  );
};

export default LogRow;