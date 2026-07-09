import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { thought } from "../lib/content";
import { Reveal } from "./ui/Reveal";

interface WordProps {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function Word({ word, index, total, progress }: WordProps) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}
      {" "}
    </motion.span>
  );
}

export function Thought() {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = thought.statement.split(" ");

  return (
    <section className="bg-surface-tint py-24 md:py-32">
      <div className="mx-auto w-full max-w-[900px] px-6 text-center md:px-10">
        {shouldReduceMotion ? (
          <p className="text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-ink">
            {thought.statement}
          </p>
        ) : (
          <p
            ref={containerRef}
            className="text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-ink"
          >
            {words.map((word, index) => (
              <Word
                key={`${word}-${index}`}
                word={word}
                index={index}
                total={words.length}
                progress={scrollYProgress}
              />
            ))}
          </p>
        )}
        <Reveal delay={0.1}>
          <p className="mt-6 text-ink-2">{thought.support}</p>
        </Reveal>
      </div>
    </section>
  );
}
