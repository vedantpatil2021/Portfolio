import { Fragment, useRef } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { hero } from "../lib/content";
import { Button } from "./ui/Button";
import { Eyebrow } from "./ui/Eyebrow";
import { ShaderPanel } from "./ui/ShaderPanel";
import { EASE } from "./ui/Reveal";

const item: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

const wordGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } },
};

const band: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0 round 1rem)" },
  visible: {
    clipPath: "inset(0 0% 0 0 round 1rem)",
    transition: { duration: 0.9, delay: 0.5, ease: EASE },
  },
};

function Words({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </>
  );
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate={shouldReduceMotion ? false : "visible"}
          variants={item}
        >
          <Eyebrow>{hero.eyebrow}</Eyebrow>
        </motion.div>

        <motion.h1
          initial={shouldReduceMotion ? false : "hidden"}
          animate={shouldReduceMotion ? false : "visible"}
          variants={wordGroup}
          className="mt-6 text-[clamp(2.5rem,7vw,6.25rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink"
        >
          {shouldReduceMotion ? (
            <>
              {hero.heading.pre}{" "}
              <em className="font-serif font-normal italic tracking-[-0.01em]">
                {hero.heading.em}
              </em>{" "}
              {hero.heading.post}
            </>
          ) : (
            <>
              <Words text={hero.heading.pre} />{" "}
              <em className="font-serif font-normal italic tracking-[-0.01em]">
                <Words text={hero.heading.em} />
              </em>{" "}
              <Words text={hero.heading.post} />
            </>
          )}
        </motion.h1>

        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate={shouldReduceMotion ? false : "visible"}
          variants={item}
          transition={{ delay: 0.35 }}
          className="mt-10 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-[46ch] text-lg leading-relaxed text-ink-2">
            {hero.support}
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-4">
            <Button href={hero.primaryButton.href} variant="primary">
              {hero.primaryButton.label}
            </Button>
            <a
              href={hero.secondaryLink.href}
              className="group inline-flex items-center gap-2 rounded-full text-[15px] font-medium text-ink transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            >
              {hero.secondaryLink.label}
              <ArrowRightIcon
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate={shouldReduceMotion ? false : "visible"}
          variants={band}
          className="relative mt-14 h-[clamp(160px,26vw,300px)] overflow-hidden rounded-[1rem] border border-hairline md:mt-16"
        >
          <motion.div
            style={shouldReduceMotion ? undefined : { y: parallaxY }}
            className="absolute -inset-[12%]"
          >
            <ShaderPanel variant="hero" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
