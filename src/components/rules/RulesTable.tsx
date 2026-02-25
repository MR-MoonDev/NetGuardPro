import RuleRow from "./RuleRow";
import { ShieldAlert } from "lucide-react";

export default function RulesTable({ rules, loading, refresh, setRules }: any) {
  return (
    <div className="bg-[#121216] border border-white/5 rounded-2xl overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-white/2">
          <tr className="border-b border-white/5 text-xs uppercase text-zinc-400">
            <th className="px-6 py-4">Domain</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Keyword</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/5">
          {loading ? (
            <tr>
              <td colSpan={5} className="px-6 py-10 text-center text-zinc-400">
                Loading...
              </td>
            </tr>
          ) : rules.length > 0 ? (
            rules.map((rule: any) => (
              <RuleRow
                key={rule.id}
                rule={rule}
                setRules={setRules}
                refresh={refresh}
              />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                <div className="flex flex-col items-center gap-2">
                  <ShieldAlert className="w-8 h-8 opacity-40" />
                  <p>No Rules Found</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}