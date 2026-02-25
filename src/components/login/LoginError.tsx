import { AlertCircle } from "lucide-react";
import { motion } from "motion/react";

export default function LoginError({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-center gap-3 text-sm"
    >
      <AlertCircle className="w-4 h-4 shrink-0" />
      {message}
    </motion.div>
  );
}