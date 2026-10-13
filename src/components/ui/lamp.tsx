import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Supplied conic light and reveal, adapted to illuminate the shared-values statement.
export function LampContainer({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <div className={cn("lamp-container", className)}>
    <div className="lamp-light" aria-hidden="true">
      <motion.div className="lamp-cone lamp-cone-left" initial={reduced ? false : { opacity: 0, scaleX: 0.5 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 1.2 }} />
      <motion.div className="lamp-cone lamp-cone-right" initial={reduced ? false : { opacity: 0, scaleX: 0.5 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 1.2 }} />
      <motion.div className="lamp-line" initial={reduced ? false : { scaleX: 0.5 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2 }} />
    </div>
    <motion.div className="lamp-content" initial={reduced ? false : { opacity: 0.5, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>{children}</motion.div>
  </div>;
}