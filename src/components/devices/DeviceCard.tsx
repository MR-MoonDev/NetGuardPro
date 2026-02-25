import React from 'react';
import { Smartphone, Wifi, WifiOff, Cpu, MoreVertical, Shield, ShieldOff } from 'lucide-react';
import { Device } from '../../types';
import { cn } from '../../lib/utils';

interface DeviceCardProps {
  device: Device;
  toggleBlock: (id: number, blocked: number) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, toggleBlock }) => {
  return (
    <div className="bg-[#121216] border border-white/5 rounded-2xl p-6 hover:border-[#00f2ff]/20 transition-all group relative overflow-hidden">
      {/* Status Indicator */}
      <div className={cn(
        "absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full blur-3xl opacity-20",
        device.status === 'online' ? "bg-emerald-500" : "bg-zinc-500"
      )} />

      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className={cn(
          "p-3 rounded-xl border",
          device.status === 'online' 
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
            : "bg-zinc-800 border-white/5 text-zinc-500"
        )}>
          <Smartphone className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-2">
          <div className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
            device.status === 'online' ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-800 text-zinc-500"
          )}>
            {device.status === 'online' ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {device.status}
          </div>
          <button className="p-1.5 hover:bg-white/5 rounded-lg text-zinc-500">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <div>
          <h3 className="text-lg font-bold truncate">{device.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Cpu className="w-3 h-3 text-zinc-500" />
            <span className="text-xs text-zinc-500 font-mono">{device.mac}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
          <div>
            <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">IP Address</p>
            <p className="text-sm font-mono mt-0.5">{device.ip}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Assigned Rules</p>
            <p className="text-sm mt-0.5">Global Default</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <div className={cn("w-2 h-2 rounded-full", device.blocked === 1 ? "bg-red-500" : "bg-emerald-500")} />
            <span className="text-xs font-medium text-zinc-400">
              {device.blocked === 1 ? 'Network Blocked' : 'Access Allowed'}
            </span>
          </div>
          <button 
            onClick={() => toggleBlock(device.id, device.blocked)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
              device.blocked === 1 
                ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20" 
                : "bg-white/5 text-zinc-400 border border-white/5 hover:bg-white/10"
            )}
          >
            {device.blocked === 1 ? <ShieldOff className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
            {device.blocked === 1 ? 'Unblock' : 'Block Device'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;