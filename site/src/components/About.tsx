import { about } from "../lib/content";
import { Reveal } from "./ui/Reveal";
import { ShaderPanel } from "./ui/ShaderPanel";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <Reveal className="flex items-end justify-between gap-6">
          <h2 className="text-[clamp(1.875rem,3vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
            {about.heading}
          </h2>
          <div className="w-24 shrink-0 rotate-3 overflow-hidden rounded-[0.625rem] border border-hairline aspect-4/5 transition-transform duration-300 ease-out hover:rotate-0 motion-reduce:transition-none md:w-28">
            <ShaderPanel variant="portrait" />
          </div>
        </Reveal>

        <div className="mt-8 flex flex-col gap-8 md:flex-row">
          <div
            role="img"
            aria-label="Dithered portrait of Vedant Patil"
            className="w-full shrink-0 overflow-hidden rounded-[0.625rem] border border-hairline aspect-4/5 sm:w-64 md:aspect-auto md:w-72"
          >
            <ShaderPanel variant="photo" />
          </div>

          <div className="flex-1 space-y-8">
            <Reveal delay={0.05}>
              <p className="max-w-[58ch] text-[clamp(1.25rem,1.9vw,1.625rem)] leading-[1.45] text-ink">
                {about.paragraphs[0]}
              </p>
            </Reveal>

            <Reveal delay={0.1} className="grid gap-8 md:grid-cols-2">
              {about.paragraphs.slice(1).map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="max-w-[52ch] leading-relaxed text-ink-2">
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.15}>
          <dl className="mt-12 grid grid-cols-2 gap-px border-t border-hairline md:grid-cols-4">
            {about.facts.map((fact) => (
              <div key={fact.label} className="py-5 pr-6">
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-sm text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
