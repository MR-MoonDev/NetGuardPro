import { useEffect, useState } from "react";
import { Rule } from "../../types";
import { getRules } from "../../services/rulesApi";
import RulesTable from "./RulesTable";
import AddRuleModal from "./AddRuleModal";
import SearchBar from "./SearchBar";

export default function RulesPage() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);

  const fetchRules = async () => {
    const data = await getRules();
    setRules(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const filtered = rules.filter(
    r =>
      r.domain.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase()) ||
      r.keyword.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <SearchBar
        search={search}
        setSearch={setSearch}
        openModal={() => setModal(true)}
      />

      <RulesTable
        rules={filtered}
        loading={loading}
        refresh={fetchRules}
        setRules={setRules}
      />

      <AddRuleModal
        open={modal}
        close={() => setModal(false)}
        refresh={fetchRules}
      />
    </div>
  );
}