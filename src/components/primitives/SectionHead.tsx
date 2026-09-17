import type { ReactNode } from "react";

import { Reveal } from "@/components/primitives/Reveal";

type SectionHeadProps = {
  /** Running index across the page: 02, 03, 04 … */
  index: string;
  label: string;
  /** Optional right-hand annotation, set small and quiet. */
  aside?: ReactNode;
  className?: string;
};

/**
 * Every section opens the same way: a hairline, an index, a label, and a
 * great deal of nothing. Repetition is what makes the page feel edited.
 */
export function SectionHead({
  index,
  label,
  aside,
  className,
}: SectionHeadProps) {
  return (
    <Reveal
      className={`flex items-baseline justify-between gap-6 border-t pt-4 rule ${className ?? ""}`}
      distance={14}
    >
      <p className="label">
        <span className="opacity-100">{index}</span>
        <span className="mx-[0.9em] opacity-60">&#8212;</span>
        <span>{label}</span>
      </p>
      {aside ? (
        <p className="label hidden max-w-[24ch] text-right opacity-60 sm:block md:max-w-none md:whitespace-nowrap">
          {aside}
        </p>
      ) : null}
    </Reveal>
  );
}
