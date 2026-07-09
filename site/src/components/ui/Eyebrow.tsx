interface EyebrowProps {
  children: string;
  className?: string;
}

export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p
      className={`font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3 ${className}`}
    >
      {children}
    </p>
  );
}
