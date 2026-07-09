import { BrainIcon, CloudArrowUpIcon, CpuIcon, CodeIcon, type Icon } from "@phosphor-icons/react";
import { skills } from "../lib/content";
import { Reveal } from "./ui/Reveal";

const icons: Icon[] = [BrainIcon, CloudArrowUpIcon, CpuIcon, CodeIcon];

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <h2 className="text-[clamp(1.875rem,3vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
          {skills.heading}
        </h2>
        <p className="mt-3 max-w-[52ch] text-ink-2">{skills.support}</p>

        <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2">
          {skills.groups.map((group, index) => {
            const GroupIcon = icons[index];
            return (
              <Reveal
                key={group.title}
                delay={Math.min(index * 0.06, 0.3)}
                className="border-t border-hairline pt-6"
              >
                <div className="flex items-center gap-2">
                  <GroupIcon size={18} weight="duotone" className="text-accent" />
                  <h3 className="text-base font-semibold text-ink">{group.title}</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-hairline bg-surface-tint px-3 py-1 font-mono text-xs text-ink-2"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
