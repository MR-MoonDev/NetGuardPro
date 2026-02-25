import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface LiveSecurityFeedProps {
  items: any[];
}

const LiveSecurityFeed: React.FC<LiveSecurityFeedProps> = ({ items }) => (
  <div className="bg-[#121216] border border-white/5 rounded-2xl overflow-hidden">
    <div className="p-6 border-b border-white/5 flex items-center justify-between">
      <h3 className="text-lg font-semibold">Live Security Feed</h3>
      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        Real-time monitoring
      </div>
    </div>
    <div className="divide-y divide-white/5">
      {items.map((item, i) => (
        <div key={i} className="p-4 flex items-center justify-between hover:bg-white/2 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
              <ShieldAlert className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-sm font-medium">Blocked access to <span className="text-[#00f2ff]">doubleclick.net</span></p>
              <p className="text-xs text-zinc-500">Device: Work Laptop • 2 mins ago</p>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-bold text-red-400 uppercase tracking-wider">
            Blocked
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default LiveSecurityFeed;