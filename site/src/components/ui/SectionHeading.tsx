interface SectionHeadingProps {
  children: string;
  support?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  children,
  support,
  centered = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${centered ? "text-center" : "text-left"} ${className}`}>
      <h2 className="text-[clamp(1.875rem,3vw,2.75rem)] leading-[1.1] tracking-[-0.02em] font-semibold text-ink">
        {children}
      </h2>
      {support && (
        <p
          className={`mt-3 max-w-[52ch] text-ink-2 ${centered ? "mx-auto" : ""}`}
        >
          {support}
        </p>
      )}
    </div>
  );
}
