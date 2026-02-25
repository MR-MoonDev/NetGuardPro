import { ShieldCheck } from "lucide-react";

export default function LoginHeader() {
  return (
    <div className="flex flex-col items-center mb-8">

      <div className="w-16 h-16 bg-[#00f2ff]/10 rounded-2xl flex items-center justify-center border border-[#00f2ff]/20 mb-4">
        <ShieldCheck className="text-[#00f2ff] w-10 h-10" />
      </div>

      <h1 className="text-2xl font-bold tracking-tight">
        NetGuard<span className="text-[#00f2ff]">Pro</span>
      </h1>

      <p className="text-zinc-500 text-sm mt-1">
        Secure Network Administration
      </p>

    </div>
  );
}