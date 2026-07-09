import { metrics } from "../lib/content";
import { CountUp } from "./ui/CountUp";
import { Reveal } from "./ui/Reveal";

export function Metrics() {
  return (
    <section className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <Reveal as="h2" className="text-[clamp(1.875rem,3vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
          {metrics.heading}
        </Reveal>
        <Reveal as="p" delay={0.05} className="mt-3 max-w-[52ch] text-ink-2">
          {metrics.support}
        </Reveal>

        <Reveal delay={0.1} className="mt-10 overflow-hidden rounded-[1rem] border border-hairline bg-surface">
          <div className="grid grid-cols-2 gap-px bg-hairline lg:grid-cols-3">
            {metrics.items.map((item) => (
              <div key={item.label} className="bg-surface p-6 md:p-8">
                <div className="flex items-baseline gap-0.5 font-mono text-ink">
                  {item.prefix && (
                    <span className="text-[0.6em] text-ink-3">{item.prefix}</span>
                  )}
                  <CountUp
                    value={item.value}
                    decimals={item.decimals}
                    className="tabular-nums text-[clamp(2rem,3.5vw,3rem)] font-medium"
                  />
                  {item.suffix && (
                    <span className="text-[0.6em] text-ink-3">{item.suffix}</span>
                  )}
                </div>
                <p className="mt-2 text-sm font-medium text-ink">{item.label}</p>
                <p className="mt-1 text-[13px] text-ink-3">{item.context}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
