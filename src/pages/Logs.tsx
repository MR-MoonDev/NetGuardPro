import React, { useState, useEffect } from "react";
import { History } from "lucide-react";
import { Log } from "../types";
import LogSearch from "../components/log/LogSearch";
import LogAction from "../components/log/LogAction";
import LogRow from "../components/log/LogRow";

const columns = [
  { key: "timestamp", label: "Timestamp" },
  { key: "device_name", label: "Device" },
  { key: "domain", label: "Domain" },
  { key: "action", label: "Action" },
  { key: "details", label: "Details", align: "right" },
];

export default function Logs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch("/api/logs");
        const data = await response.json();
        setLogs(data);
      } catch (err) {
        console.error("Failed to fetch logs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(
    (l) =>
      l.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.device_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <LogSearch query={searchQuery} onChange={setSearchQuery} />
        <LogAction logs={logs} />
      </div>

      <div className="bg-[#121216] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider ${
                      col.align === "right" ? "text-right" : ""
                    }`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={columns.length} className="px-6 py-6">
                      <div className="h-4 bg-zinc-800 rounded w-full" />
                    </td>
                  </tr>
                ))
              ) : filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <LogRow key={log.id} log={log} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-12 text-center"
                  >
                    <div className="flex flex-col items-center text-zinc-500">
                      <History className="w-12 h-12 mb-4 opacity-20" />
                      <p className="text-sm">No network logs found.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}