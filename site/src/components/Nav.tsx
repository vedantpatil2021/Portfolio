import { useEffect, useState } from "react";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { global, nav, navLinks } from "../lib/content";
import { Button } from "./ui/Button";
import { ThemeToggle } from "./ui/ThemeToggle";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    const ids = navLinks.map((link) => link.href.replace("#", ""));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 h-[68px] border-b bg-canvas/80 backdrop-blur-md transition-colors duration-200 ${
          scrolled ? "border-hairline" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-full w-full max-w-[1200px] items-center justify-between px-6 md:px-10">
          <a
            href="#top"
            className="rounded-sm font-semibold tracking-[-0.01em] text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            {global.name}
          </a>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = id === activeId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap rounded-sm text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${
                    isActive
                      ? "text-ink underline decoration-accent decoration-2 underline-offset-8"
                      : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <Button href={nav.cta.href} variant="primary" className="h-10 px-5">
              {nav.cta.label}
            </Button>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            >
              <ListIcon size={24} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col bg-canvas lg:hidden"
          >
            <div className="flex h-[68px] w-full items-center justify-end px-6">
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
              >
                <XIcon size={24} />
              </button>
            </div>
            <nav
              className="flex flex-1 flex-col items-start justify-center gap-6 px-8"
              aria-label="Mobile"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.06, ease: EASE }}
                  className="rounded-sm text-3xl font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
