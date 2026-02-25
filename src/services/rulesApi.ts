export const getRules = async () => {
  const res = await fetch("/api/rules");
  return res.json();
};

export const createRule = async (rule: any) => {
  return fetch("/api/rules", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rule),
  });
};

export const deleteRule = async (id: number) => {
  return fetch(`/api/rules/${id}`, {
    method: "DELETE",
  });
};

export const toggleRuleStatus = async (id: number, active: number) => {
  return fetch(`/api/rules/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ active }),
  });
};