export interface Rule {
  id: number;
  domain: string;
  category: string;
  keyword: string;
  active: number;
  created_at: string;
}

export interface Device {
  id: number;
  name: string;
  ip: string;
  mac: string;
  status: 'online' | 'offline';
  blocked: number;
}

export interface Log {
  id: number;
  device_id: number;
  device_name: string;
  domain: string;
  action: 'blocked' | 'allowed';
  timestamp: string;
}

export interface DashboardStats {
  summary: {
    totalRules: number;
    activeBlocks: number;
    totalDevices: number;
  };
  topBlocked: { domain: string; count: number }[];
  dailyStats: { date: string; blocked: number; allowed: number }[];
}

export interface User {
  username: string;
}
