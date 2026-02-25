import { User } from "../types";
import LoginCard from "../components/login/LoginCard";

interface LoginProps {
  onLogin: (user: User) => void;
}

export default function Login({ onLogin }: LoginProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-6 relative overflow-hidden">

      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#00f2ff]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

      <LoginCard onLogin={onLogin} />

    </div>
  );
}