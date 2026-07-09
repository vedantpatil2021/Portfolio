import {
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef } from "react";
import { EASE } from "./Reveal";

interface CountUpProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CountUp({ value, decimals = 0, prefix = "", suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);

  useMotionValueEvent(motionValue, "change", (latest) => {
    if (ref.current) {
      ref.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
    }
  });

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      motionValue.set(value);
      return;
    }
    const controls = animate(motionValue, value, { duration: 1.2, ease: EASE });
    return () => controls.stop();
  }, [isInView, shouldReduceMotion, value, motionValue]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}
