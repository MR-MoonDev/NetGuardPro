import { motion } from "motion/react";
import { Check } from "lucide-react";

export default function SuccessAlert() {

  return (
    <motion.div
      initial={{opacity:0,y:-20}}
      animate={{opacity:1,y:0}}
      className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl flex items-center gap-3 text-sm"
    >
      <Check className="w-4 h-4"/>
      Operation completed successfully.
    </motion.div>
  );
}