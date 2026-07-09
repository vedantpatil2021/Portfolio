import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type Variant = "primary" | "secondary";

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonProps = ButtonAsAnchor | ButtonAsButton;

const base =
  "inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-medium transition-[background-color,transform] duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-on hover:bg-accent-strong",
  secondary: "border border-hairline text-ink hover:bg-surface-tint",
};

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (props.href) {
    const { href, ...anchorProps } = props as ButtonAsAnchor;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
