import { useEffect, useState } from "react";
import SearchBar from "../components/rules/SearchBar";
import RulesTable from "../components/rules/RulesTable";
import AddRuleModal from "../components/rules/AddRuleModal";
import { getRules } from "../services/rulesApi";
import { Rule } from "../types";

export default function Rules() {

  const [rules,setRules] = useState<Rule[]>([]);
  const [loading,setLoading] = useState(true);
  const [search,setSearch] = useState("");
  const [modal,setModal] = useState(false);

  const fetchRules = async () => {
    const data = await getRules();
    setRules(data);
    setLoading(false);
  };

  useEffect(()=>{
    fetchRules();
  },[]);

  const filteredRules = rules.filter(r =>
    r.domain.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase()) ||
    r.keyword.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      <SearchBar
        search={search}
        setSearch={setSearch}
        openModal={()=>setModal(true)}
      />

      <RulesTable
        rules={filteredRules}
        loading={loading}
        setRules={setRules}
        refresh={fetchRules}
      />

      <AddRuleModal
        open={modal}
        close={()=>setModal(false)}
        refresh={fetchRules}
      />

    </div>
  );
}