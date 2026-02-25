import { Search, Plus, Filter } from "lucide-react";

export default function SearchBar({ search, setSearch, openModal }: any) {
  return (
    <div className="flex justify-between gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search rules"
          className="w-full bg-[#121216] border border-white/5 rounded-xl py-2 pl-10"
        />
      </div>

      <div className="flex gap-2">
        <button className="p-2 bg-[#121216] border border-white/5 rounded-xl">
          <Filter size={18} />
        </button>

        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-[#00f2ff] text-black px-4 py-2 rounded-xl"
        >
          <Plus size={18} />
          Add Rule
        </button>
      </div>
    </div>
  );
}