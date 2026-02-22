import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Smartphone, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { motion } from 'motion/react';
import { DashboardStats } from '../types';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-32 bg-[#121216] rounded-2xl border border-white/5" />
        ))}
        <div className="md:col-span-2 h-80 bg-[#121216] rounded-2xl border border-white/5" />
        <div className="h-80 bg-[#121216] rounded-2xl border border-white/5" />
      </div>
    );
  }

  const summaryCards = [
    { 
      label: 'Total Rules', 
      value: stats.summary.totalRules, 
      icon: ShieldAlert, 
      color: 'text-[#00f2ff]', 
      bg: 'bg-[#00f2ff]/10',
      trend: '+2 this week',
      trendUp: true,
      target: 'rules'
    },
    { 
      label: 'Active Blocks', 
      value: stats.summary.activeBlocks, 
      icon: Activity, 
      color: 'text-purple-400', 
      bg: 'bg-purple-400/10',
      trend: '12% increase',
      trendUp: true,
      target: 'logs'
    },
    { 
      label: 'Total Devices', 
      value: stats.summary.totalDevices, 
      icon: Smartphone, 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-400/10',
      trend: 'All online',
      trendUp: true,
      target: 'devices'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryCards.map((card, i) => (
          <button 
            key={i} 
            onClick={() => onNavigate(card.target)}
            className="bg-[#121216] border border-white/5 p-6 rounded-2xl hover:border-[#00f2ff]/20 transition-all group text-left w-full"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${card.bg} ${card.color} border border-current/10`}>
                <card.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${card.trendUp ? 'text-emerald-400' : 'text-red-400'}`}>
                {card.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {card.trend}
              </div>
            </div>
            <h3 className="text-zinc-500 text-sm font-medium">{card.label}</h3>
            <p className="text-3xl font-bold mt-1">{card.value}</p>
            <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-[#00f2ff] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
              View Details <ArrowUpRight className="w-3 h-3" />
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-[#121216] border border-white/5 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-semibold">Network Activity</h3>
              <p className="text-sm text-zinc-500">Blocked vs Allowed requests over time</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#00f2ff]" />
                <span className="text-xs text-zinc-400">Blocked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
                <span className="text-xs text-zinc-400">Allowed</span>
              </div>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.dailyStats}>
                <defs>
                  <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#ffffff20" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(val) => new Date(val).toLocaleDateString('en-US', { weekday: 'short' })}
                />
                <YAxis stroke="#ffffff20" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#121216', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="blocked" stroke="#00f2ff" fillOpacity={1} fill="url(#colorBlocked)" strokeWidth={2} />
                <Area type="monotone" dataKey="allowed" stroke="#3f3f46" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Blocked Domains */}
        <div className="bg-[#121216] border border-white/5 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-semibold mb-6">Top Blocked Domains</h3>
          <div className="flex-1 space-y-4">
            {stats.topBlocked.map((item, i) => (
              <button 
                key={i} 
                onClick={() => onNavigate('logs')}
                className="flex items-center gap-4 group w-full text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400 group-hover:bg-[#00f2ff]/10 group-hover:text-[#00f2ff] transition-colors">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.domain}</p>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.count / stats.topBlocked[0].count) * 100}%` }}
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
      </div>

      {/* Recent Activity Mini Log */}
      <div className="bg-[#121216] border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Live Security Feed</h3>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Real-time monitoring
          </div>
        </div>
        <div className="divide-y divide-white/5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
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
    </div>
  );
}
