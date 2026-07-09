import { education } from "../lib/content";
import { Reveal } from "./ui/Reveal";

export function Education() {
  return (
    <section id="education" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <h2 className="text-[clamp(1.875rem,3vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
          {education.heading}
        </h2>

        <div className="mt-10 divide-y divide-hairline border-t border-hairline">
          {education.entries.map((entry, index) => (
            <Reveal
              key={entry.school}
              delay={Math.min(index * 0.06, 0.3)}
              className="grid grid-cols-1 gap-1 py-6 md:grid-cols-12 md:items-center md:gap-4"
            >
              <div className="font-semibold text-ink md:col-span-6">{entry.school}</div>
              <div className="text-ink-2 md:col-span-4">{entry.degree}</div>
              <div className="font-mono text-sm text-ink-3 md:col-span-2 md:text-right">
                {entry.date}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
