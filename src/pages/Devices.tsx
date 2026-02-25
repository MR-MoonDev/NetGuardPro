import React, { useState, useEffect } from 'react';
import { Device } from '../types';
import DeviceCard from '../components/devices/DeviceCard';
import DeviceSearchBar from '../components/devices/DeviceSearchBar';

export default function Devices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchDevices = async () => {
    try {
      const response = await fetch('/api/devices');
      const data = await response.json();
      setDevices(data);
    } catch (err) {
      console.error('Failed to fetch devices:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const toggleDeviceBlock = async (id: number, blocked: number) => {
    try {
      await fetch(`/api/devices/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blocked: blocked === 1 ? 0 : 1 }),
      });
      setDevices(devices.map(d => d.id === id ? { ...d, blocked: blocked === 1 ? 0 : 1 } : d));
    } catch (err) {
      console.error('Failed to toggle device block:', err);
    }
  };

  const filteredDevices = devices.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.ip.includes(searchQuery) ||
    d.mac.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <DeviceSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} devices={devices} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-[#121216] rounded-2xl border border-white/5 animate-pulse" />
          ))
        ) : filteredDevices.map(device => (
          <DeviceCard key={device.id} device={device} toggleBlock={toggleDeviceBlock} />
        ))}
      </div>
    </div>
  );
}