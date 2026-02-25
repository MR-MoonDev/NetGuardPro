import React, { useState, useEffect } from 'react';
import SummaryCard from '../components/dashboard/SummaryCard';
import NetworkActivityChart from '../components/dashboard/NetworkActivityChart';
import TopBlockedDomains from '../components/dashboard/TopBlockedDomains';
import LiveSecurityFeed from '../components/dashboard/LiveSecurityFeed';
import { DashboardStats } from '../types';
import { ShieldAlert, Activity, Smartphone } from 'lucide-react';
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
        {[1, 2, 3].map(i => <div key={i} className="h-32 bg-[#121216] rounded-2xl border border-white/5" />)}
        <div className="md:col-span-2 h-80 bg-[#121216] rounded-2xl border border-white/5" />
        <div className="h-80 bg-[#121216] rounded-2xl border border-white/5" />
      </div>
    );
  }

  const summaryCards = [
    { label: 'Total Rules', value: stats.summary.totalRules, icon: ShieldAlert, color: 'text-[#00f2ff]', bg: 'bg-[#00f2ff]/10', trend: '+2 this week', trendUp: true, target: 'rules' },
    { label: 'Active Blocks', value: stats.summary.activeBlocks, icon: Activity, color: 'text-purple-400', bg: 'bg-purple-400/10', trend: '12% increase', trendUp: true, target: 'logs' },
    { label: 'Total Devices', value: stats.summary.totalDevices, icon: Smartphone, color: 'text-emerald-400', bg: 'bg-emerald-400/10', trend: 'All online', trendUp: true, target: 'devices' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryCards.map((card, i) => <SummaryCard key={i} card={card} onNavigate={onNavigate} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <NetworkActivityChart dailyStats={stats.dailyStats} />
        <TopBlockedDomains topBlocked={stats.topBlocked} onNavigate={onNavigate} />
      </div>

      <LiveSecurityFeed items={[1, 2, 3, 4]} />
    </div>
  );
}