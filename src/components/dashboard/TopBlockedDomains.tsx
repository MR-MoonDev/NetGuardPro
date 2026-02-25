import React from 'react';
import { motion } from 'motion/react';

interface TopBlockedDomainsProps {
  topBlocked: any[];
  onNavigate: (tab: string) => void;
}

const TopBlockedDomains: React.FC<TopBlockedDomainsProps> = ({ topBlocked, onNavigate }) => (
  <div className="bg-[#121216] border border-white/5 p-6 rounded-2xl flex flex-col">
    <h3 className="text-lg font-semibold mb-6">Top Blocked Domains</h3>
    <div className="flex-1 space-y-4">
      {topBlocked.map((item, i) => (
        <button key={i} onClick={() => onNavigate('logs')} className="flex items-center gap-4 group w-full text-left">
          <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400 group-hover:bg-[#00f2ff]/10 group-hover:text-[#00f2ff] transition-colors">
            {i + 1}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{item.domain}</p>
            <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(item.count / topBlocked[0].count) * 100}%` }}
                className="bg-[#00f2ff] h-full rounded-full"
              />
            </div>
          </div>
          <span className="text-sm font-bold text-[#00f2ff]">{item.count}</span>
        </button>
      ))}
    </div>
    <button 
      onClick={() => onNavigate('logs')}
      className="mt-8 w-full py-2.5 rounded-xl bg-white/5 text-xs font-semibold hover:bg-white/10 transition-colors"
    >
      View Detailed Logs
    </button>
  </div>
);

export default TopBlockedDomains;