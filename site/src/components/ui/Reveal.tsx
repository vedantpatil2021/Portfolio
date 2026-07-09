import { motion, useReducedMotion } from "motion/react";
import { createElement, useMemo, type ElementType, type ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: ElementType;
  className?: string;
}

export function Reveal({ children, delay = 0, y = 24, as = "div", className }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = useMemo(() => motion.create(as), [as]);

  if (shouldReduceMotion) {
    return createElement(as, { className }, children);
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
