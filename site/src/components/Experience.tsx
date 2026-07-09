import type { ReactNode } from "react";
import { experience } from "../lib/content";
import { Reveal } from "./ui/Reveal";

const METRIC_PATTERN = /(?<![A-Za-z0-9-])\$?\d(?:[\d,]|\.\d)*\s?(?:GB|ms|s|x|%)?(?![A-Za-z0-9])/g;

function highlightMetrics(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  METRIC_PATTERN.lastIndex = 0;

  while ((match = METRIC_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    nodes.push(
      <span key={match.index} className="font-mono text-ink">
        {match[0]}
      </span>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <Reveal as="h2" className="text-[clamp(1.875rem,3vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
          {experience.heading}
        </Reveal>

        {experience.entries.map((entry, index) => (
          <Reveal
            key={entry.org}
            delay={index * 0.06}
            className={`grid grid-cols-1 gap-6 md:grid-cols-12 ${
              index === 0 ? "mt-10" : "mt-10 border-t border-hairline pt-10"
            }`}
          >
            <div className="md:col-span-4">
              <p className="font-mono text-sm text-ink-3">{entry.dates}</p>
              <p className="mt-2 text-lg font-semibold text-ink">{entry.role}</p>
              <p className="text-sm text-ink-2">{entry.org}</p>
            </div>
            <ul className="space-y-3 md:col-span-8">
              {entry.bullets.map((bullet) => (
                <li key={bullet} className="max-w-[68ch] leading-relaxed text-ink-2">
                  {highlightMetrics(bullet)}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
