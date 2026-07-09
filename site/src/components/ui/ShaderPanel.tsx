import { lazy, Suspense } from "react";

export type ShaderVariant = "hero" | "project-a" | "project-b" | "portrait" | "photo";

const ShaderScene = lazy(() => import("./ShaderScene"));

interface ShaderPanelProps {
  variant: ShaderVariant;
  className?: string;
}

export function ShaderPanel({ variant, className = "" }: ShaderPanelProps) {
  return (
    <div className={`h-full w-full ${className}`}>
      <Suspense
        fallback={
          <div className="h-full w-full bg-[linear-gradient(135deg,var(--accent-tint),var(--surface-tint))]" />
        }
      >
        <ShaderScene variant={variant} />
      </Suspense>
    </div>
  );
}
