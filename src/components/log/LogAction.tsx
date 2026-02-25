import React from 'react';
import { Download, Filter } from 'lucide-react';
import { Log } from '../../types';

interface LogActionProps {
  logs: Log[];
}

export default function LogAction({ logs }: LogActionProps) {
  const exportToCSV = () => {
    const headers = ['ID', 'Timestamp', 'Device', 'Domain', 'Action'];
    const rows = logs.map(log => [
      log.id,
      log.timestamp,
      log.device_name,
      log.domain,
      log.action
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `netguard_logs_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex items-center gap-3">
      <button className="p-2.5 bg-[#121216] border border-white/5 rounded-xl text-zinc-400 hover:text-white transition-colors">
        <Filter className="w-5 h-5" />
      </button>
      <button 
        onClick={exportToCSV}
        className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-white/10 transition-all"
      >
        <Download className="w-5 h-5" />
        Export CSV
      </button>
    </div>
  );
}