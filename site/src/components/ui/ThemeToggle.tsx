import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "../../lib/theme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-hairline text-ink transition-colors duration-200 hover:bg-surface-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -30 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 30 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {theme === "dark" ? <MoonIcon size={18} /> : <SunIcon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
