/**
 * A faint twelve-column drafting grid, used only behind the dark sections.
 * It is aligned to the page grid — not to the viewport — so the lines fall in
 * the real gutters: the structure of the page, made just visible enough.
 */
export function DraftGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden lg:block"
    >
      <div className="shell h-full">
        <div className="relative h-full">
          {Array.from({ length: 11 }).map((_, i) => (
            <span
              key={i}
              className="absolute top-0 bottom-0 w-px bg-rule-dark"
              style={{ left: `${((i + 1) / 12) * 100}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
