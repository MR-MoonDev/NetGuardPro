import React from 'react';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

interface NetworkActivityChartProps {
  dailyStats: any[];
}

const NetworkActivityChart: React.FC<NetworkActivityChartProps> = ({ dailyStats }) => (
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
        <AreaChart data={dailyStats}>
          <defs>
            <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
          <XAxis dataKey="date" stroke="#ffffff20" fontSize={12} tickLine={false} axisLine={false}
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
);

export default NetworkActivityChart;