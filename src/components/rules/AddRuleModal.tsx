import { useState } from "react";
import { createRule } from "../../services/rulesApi";

export default function AddRuleModal({ open, close, refresh }: any) {
  const [rule, setRule] = useState({
    domain: "",
    category: "Social",
    keyword: "",
  });

  if (!open) return null;

  const submit = async (e: any) => {
    e.preventDefault();
    await createRule(rule);
    refresh();
    close();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="bg-[#121216] p-8 rounded-2xl w-100">

        <h2 className="text-lg mb-6">Create Rule</h2>

        <form onSubmit={submit} className="space-y-4">

          <input
            placeholder="domain"
            value={rule.domain}
            onChange={e => setRule({ ...rule, domain: e.target.value })}
            className="w-full p-2 bg-black rounded"
          />

          <select
            value={rule.category}
            onChange={e => setRule({ ...rule, category: e.target.value })}
            className="w-full p-2 bg-black rounded"
          >
            <option>Social</option>
            <option>Ads</option>
            <option>Tracking</option>
            <option>Adult</option>
            <option>Malware</option>
          </select>

          <input
            placeholder="keyword"
            value={rule.keyword}
            onChange={e => setRule({ ...rule, keyword: e.target.value })}
            className="w-full p-2 bg-black rounded"
          />

          <div className="flex gap-2">
            <button type="button" onClick={close} className="flex-1">
              Cancel
            </button>

            <button type="submit" className="flex-1 bg-cyan-400 text-black">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}