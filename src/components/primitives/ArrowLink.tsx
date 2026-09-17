import Link from "next/link";
import type { ReactNode } from "react";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** `lead` is used for primary calls to action; `label` for in-flow links. */
  size?: "label" | "lead";
  external?: boolean;
};

/**
 * The single link treatment used site-wide: a tracked label, a rule that
 * draws itself in from the left, and an arrow that steps forward.
 */
export function ArrowLink({
  href,
  children,
  className,
  size = "label",
  external,
}: ArrowLinkProps) {
  const sizing =
    size === "lead"
      ? "label text-[0.8125rem] tracking-[0.2em]"
      : "label";

  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={`group/arrow relative inline-flex items-center gap-[0.9em] pb-[0.7em] ${sizing} ${className ?? ""}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/arrow:scale-x-100 group-focus-visible/arrow:scale-x-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-current opacity-25"
      />
      <span>{children}</span>
      <span
        aria-hidden
        className="inline-block translate-y-[0.05em] transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/arrow:translate-x-[0.45em] group-focus-visible/arrow:translate-x-[0.45em]"
      >
        &#8594;
      </span>
    </Link>
  );
}
