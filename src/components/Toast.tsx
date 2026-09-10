import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useApp } from "../lib/store";
import { EASE } from "../lib/anim";

export default function Toast() {
  const { toast } = useApp();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-12 z-[350] flex justify-center">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ y: 22, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="flex items-center gap-2.5 border border-bline border-l-2 border-l-copper bg-[rgba(18,49,82,0.96)] px-4 py-2.5 font-mono text-[11px] tracking-[0.1em] text-ink shadow-[0_14px_36px_rgba(0,0,0,0.55)]"
          >
            <Check size={13} className="text-copperb" />
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
