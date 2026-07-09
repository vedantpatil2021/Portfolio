import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { quote } from "../lib/content";
import { EASE } from "./ui/Reveal";

const word: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE },
  },
};

const wordGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.02 } },
};

const mark: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.5, ease: EASE },
  },
};

export function Quote() {
  const shouldReduceMotion = useReducedMotion();
  const words = quote.text.split(" ");

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-[880px] px-6 text-center md:px-10">
        <figure>
          <blockquote>
            {shouldReduceMotion ? (
              <p className="font-serif italic text-[clamp(1.625rem,3.4vw,2.75rem)] leading-[1.3] text-ink">
                {quote.text}
              </p>
            ) : (
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={wordGroup}
                className="font-serif italic text-[clamp(1.625rem,3.4vw,2.75rem)] leading-[1.3] text-ink"
              >
                {words.map((w, i) => (
                  <Fragment key={`${w}-${i}`}>
                    <motion.span variants={word} className="inline-block">
                      {w}
                    </motion.span>
                    {i < words.length - 1 ? " " : ""}
                  </Fragment>
                ))}
              </motion.p>
            )}
          </blockquote>
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.5 }}
            variants={mark}
            aria-hidden
            className="mx-auto mt-7 h-px w-10 bg-hairline"
          />
          <motion.figcaption
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.5 }}
            variants={mark}
            className="mt-5"
          >
            <cite className="font-mono text-[11px] not-italic uppercase tracking-[0.3em] text-ink-3">
              {quote.attribution}
            </cite>
          </motion.figcaption>
        </figure>
      </div>
    </section>
  );
}
