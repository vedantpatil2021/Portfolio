import { footer, socials } from "../lib/content";

export function Footer() {
  return (
    <footer className="border-t border-hairline py-10">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-6 text-sm md:px-10">
        <div
          aria-hidden
          className="select-none overflow-hidden text-center text-[clamp(3.5rem,13vw,10rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-ink/[0.05] dark:text-ink/[0.07]"
        >
          {footer.wordmark}
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <span className="font-semibold text-ink">{footer.wordmark}</span>
          <span className="text-ink-3">{footer.location}</span>
          <div className="flex items-center gap-6">
            {socials.map((social) => {
              const isMail = social.href.startsWith("mailto:");
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={isMail ? undefined : "_blank"}
                  rel={isMail ? undefined : "noreferrer"}
                  className="rounded-sm text-ink-2 transition-colors duration-200 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                >
                  {social.label}
                </a>
              );
            })}
          </div>
        </div>
        <p className="text-ink-3">{footer.copyright}</p>
      </div>
    </footer>
  );
}
