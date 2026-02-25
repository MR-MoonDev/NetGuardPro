import React, { useState } from "react";import { Lock, User as UserIcon } from "lucide-react";
import LoginError from "./LoginError";
import { User } from "../../types";

interface Props {
  onLogin: (user: User) => void;
}

export default function LoginForm({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        onLogin(data.user);
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {error && <LoginError message={error} />}

      <div className="space-y-2">
        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1">
          Username
        </label>

        <div className="relative">
          <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="admin"
            className="w-full bg-[#0a0a0c] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#00f2ff]/50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1">
          Password
        </label>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full bg-[#0a0a0c] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#00f2ff]/50"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#00f2ff] text-[#0a0a0c] font-bold py-3 rounded-xl hover:bg-[#00d8e6] transition-all disabled:opacity-50"
      >
        {isLoading ? "Authenticating..." : "Sign In"}
      </button>

    </form>
  );
}