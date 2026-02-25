import { motion } from "motion/react";
import { User } from "../../types";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";

interface Props {
  onLogin: (user: User) => void;
}

export default function LoginCard({ onLogin }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md"
    >
      <div className="bg-[#121216] border border-white/5 rounded-3xl p-8 shadow-2xl relative z-10">

        <LoginHeader />

        <LoginForm onLogin={onLogin} />

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-zinc-600">
            Authorized access only. All activities are logged.
          </p>
        </div>

      </div>
    </motion.div>
  );
}