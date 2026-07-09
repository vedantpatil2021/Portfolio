import { ArrowUpRightIcon, CodeIcon, PlugsIcon, SparkleIcon, type Icon } from "@phosphor-icons/react";
import { projects } from "../lib/content";
import { useTheme } from "../lib/theme";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal } from "./ui/Reveal";
import { ShaderPanel } from "./ui/ShaderPanel";

type ProjectItem = (typeof projects.items)[number];

const cardBase =
  "group relative flex flex-col gap-3 overflow-hidden rounded-[1rem] border border-hairline p-6 shadow-[0_1px_2px_rgba(28,25,23,0.05)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-ink/15 hover:shadow-[0_24px_48px_-24px_rgba(28,25,23,0.18)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:shadow-none dark:hover:shadow-none md:p-7";

const stackIcons: Record<string, Icon> = {
  "Claude Code": SparkleIcon,
  Codex: CodeIcon,
  MCP: PlugsIcon,
};

function StackGlow({ stack }: { stack: string[] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-28 overflow-hidden rounded-b-[1rem]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(var(--accent) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
          maskImage: "linear-gradient(to bottom, transparent, black)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black)",
          opacity: 0.5,
        }}
      />
      <div className="absolute inset-x-6 bottom-5 flex items-center gap-4 md:inset-x-7">
        {stack.map((tech) => {
          const StackIcon = stackIcons[tech];
          return StackIcon ? <StackIcon key={tech} className="h-5 w-5 text-ink-3" weight="light" /> : null;
        })}
      </div>
    </div>
  );
}

function Chips({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {stack.map((tech) => (
        <span
          key={tech}
          className="rounded-full border border-hairline bg-surface-tint px-3 py-1 font-mono text-xs text-ink-2"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const { theme } = useTheme();
  const delay = Math.min(index * 0.06, 0.3);
  const backgroundClass = project.visual === "tint" ? "bg-accent-tint" : "bg-surface";
  const cardClass = project.href
    ? cardBase
    : cardBase.replace("hover:-translate-y-1", "").replace("hover:border-ink/15", "");

  if (project.visual === "shader-b") {
    return (
      <Reveal
        delay={delay}
        className={`${cardClass} bg-surface ${project.span} min-h-[280px] justify-end`}
      >
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} — open project`}
            className="absolute inset-0 z-10"
          />
        )}
        <div aria-hidden className="absolute inset-0">
          <div className="h-full w-full transition-transform duration-300 ease-out group-hover:scale-[1.03]">
            <ShaderPanel variant="project-b" />
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-t from-surface via-surface/90 to-surface/25
                       md:bg-gradient-to-r md:from-surface md:via-surface/85 md:to-surface/15"
          />
        </div>
        <div className="relative z-10 flex flex-col gap-3 md:max-w-[55%]">
          <h3 className="text-lg font-semibold text-ink">{project.title}</h3>
          <p className="text-[15px] text-ink-2">{project.tagline}</p>
          <p className="text-sm leading-relaxed text-ink-2">{project.description}</p>
          {project.metric && (
            <p className="mt-auto font-mono text-[13px] text-accent">{project.metric}</p>
          )}
          <Chips stack={project.stack} />
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal delay={delay} className={`${cardClass} ${backgroundClass} ${project.span}`}>
      {project.href && (
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} — open project`}
          className="absolute inset-0 z-10"
        />
      )}
      {project.visual === "pattern" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(var(--hairline) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      )}

      {project.visual === "shader-a" && (
        <div className="relative aspect-16/9 overflow-hidden rounded-[0.625rem]">
          <div className="h-full w-full transition-transform duration-300 ease-out group-hover:scale-[1.03]">
            <ShaderPanel variant="project-a" />
          </div>
        </div>
      )}

      {project.visual === "image" && project.art && (
        <div className="relative aspect-16/9 overflow-hidden rounded-[0.625rem] border border-hairline">
          <img
            src={`/art/${project.art}-${theme}.png`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        </div>
      )}

      {project.visual === "icon-pattern" && <StackGlow stack={project.stack} />}

      <div className="relative z-10 flex flex-1 flex-col gap-3">
        <h3 className="text-lg font-semibold text-ink">{project.title}</h3>
        <p className="text-[15px] text-ink-2">{project.tagline}</p>
        <p className="text-sm leading-relaxed text-ink-2">{project.description}</p>
        {project.metric && (
          <p className="mt-auto font-mono text-[13px] text-accent">{project.metric}</p>
        )}
        <Chips stack={project.stack} />
      </div>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <Eyebrow>{projects.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-[clamp(1.875rem,3vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
          {projects.heading}
        </h2>
        <p className="mt-3 max-w-[52ch] text-ink-2">{projects.support}</p>

        <div className="mt-10 grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-12">
          {projects.items.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <div className="mt-8 text-right">
          <a
            href={projects.moreLink.href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1 rounded-sm text-sm font-medium text-ink-2 transition-colors duration-200 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            {projects.moreLink.label}
            <ArrowUpRightIcon
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
