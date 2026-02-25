import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface SummaryCardProps {
  card: any;
  onNavigate: (tab: string) => void;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ card, onNavigate }) => (
  <button onClick={() => onNavigate(card.target)} className="bg-[#121216] border border-white/5 p-6 rounded-2xl hover:border-[#00f2ff]/20 transition-all group text-left w-full">
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
);

export default SummaryCard;