import { useState } from "react";
import { GithubLogoIcon, LinkedinLogoIcon, CopyIcon, CheckIcon } from "@phosphor-icons/react";
import { contact, global } from "../lib/content";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";

const iconButtonClass =
  "flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-ink-2 transition-colors duration-200 hover:bg-surface-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="contact" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto flex w-full max-w-[720px] flex-col items-center px-6 text-center md:px-10">
        <Reveal>
          <Eyebrow>{contact.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-3 text-[clamp(1.875rem,3vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
            {contact.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-3 max-w-[52ch] text-ink-2">{contact.support}</p>
        </Reveal>

        <Reveal delay={0.15} className="w-full min-w-0">
          <a
            href={contact.primaryButton.href}
            className="mt-8 inline-block w-full min-w-0 break-words rounded-sm text-[clamp(1.375rem,3.4vw,2.5rem)] font-semibold tracking-[-0.02em] text-ink underline decoration-hairline decoration-2 underline-offset-8 transition-colors duration-200 hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            {contact.email}
          </a>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={contact.primaryButton.href} variant="primary">
              {contact.primaryButton.label}
            </Button>
            <Button variant="secondary" onClick={handleCopy}>
              {copied ? (
                <>
                  <CheckIcon size={18} />
                  {contact.copiedLabel}
                </>
              ) : (
                <>
                  <CopyIcon size={18} />
                  {contact.copyLabel}
                </>
              )}
            </Button>
            <a href={global.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={iconButtonClass}>
              <GithubLogoIcon size={18} />
            </a>
            <a href={global.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconButtonClass}>
              <LinkedinLogoIcon size={18} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
