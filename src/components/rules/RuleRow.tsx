import { Trash2, CheckCircle2, XCircle } from "lucide-react";
import { deleteRule, toggleRuleStatus } from "../../services/rulesApi";

export default function RuleRow({ rule, setRules }: any) {

  const toggle = async () => {
    const newStatus = rule.active === 1 ? 0 : 1;
    await toggleRuleStatus(rule.id, newStatus);

    setRules((prev: any) =>
      prev.map((r: any) =>
        r.id === rule.id ? { ...r, active: newStatus } : r
      )
    );
  };

  const remove = async () => {
    await deleteRule(rule.id);
    setRules((prev: any) => prev.filter((r: any) => r.id !== rule.id));
  };

  return (
    <tr className="border-b border-white/5">
      <td className="p-4">{rule.domain}</td>
      <td className="p-4">{rule.category}</td>
      <td className="p-4">{rule.keyword || "-"}</td>

      <td className="p-4">
        <button onClick={toggle}>
          {rule.active ? <CheckCircle2 /> : <XCircle />}
        </button>
      </td>

      <td className="p-4 text-right">
        <button onClick={remove}>
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
}