import { ArrowLink } from "@/components/primitives/ArrowLink";
import { DraftGrid } from "@/components/primitives/DraftGrid";
import { Reveal } from "@/components/primitives/Reveal";
import { RevealLines } from "@/components/primitives/RevealLines";
import { SectionHead } from "@/components/primitives/SectionHead";
import { CAPITAL_DISCIPLINES, CAPITAL_LINES } from "@/lib/content";

/**
 * Private Capital.
 *
 * The page goes black and loses its photography: type, rules and the
 * drafting grid carry the section on their own.
 */
export function PrivateCapital() {
  return (
    <section
      id="capital"
      data-theme="dark"
      className="relative scroll-mt-20 overflow-hidden bg-ink text-paper"
    >
      <DraftGrid />

      <div className="shell section-pad-lg relative">
        <SectionHead
          index="04"
          label="Private Capital"
          aside="Investment philosophy"
        />

        <div className="grid-12 mt-[clamp(3rem,7vw,6rem)] items-end gap-y-12">
          <RevealLines
            lines={["Private", "Capital."]}
            className="col-span-6 display display-tight text-mega uppercase lg:col-span-7"
          />

          <ul className="col-span-6 lg:col-span-4 lg:col-start-9">
            {CAPITAL_LINES.map((line, i) => (
              <Reveal
                key={line}
                as="li"
                delay={0.1 + i * 0.09}
                distance={16}
                className="border-b rule py-[clamp(0.85rem,1.4vw,1.35rem)] first:border-t"
              >
                <span className="serif-accent block text-h3 leading-tight">
                  {line}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="grid-12 mt-[clamp(4rem,9vw,8rem)] items-end gap-y-10">
          <Reveal className="col-span-6 lg:col-span-5 lg:col-start-4">
            <p className="max-w-[46ch] text-lead leading-[1.55] opacity-70">
              We partner with opportunities where capital, expertise and
              strategic vision can create meaningful long-term value.
            </p>
          </Reveal>

          <Reveal
            className="col-span-6 lg:col-span-3 lg:col-start-10 lg:justify-self-end"
            delay={0.1}
          >
            <ArrowLink href="#standard" size="lead">
              Discover our approach
            </ArrowLink>
          </Reveal>
        </div>

        <div className="mt-[clamp(5rem,11vw,10rem)] grid grid-cols-2 gap-x-[clamp(0.75rem,1.6vw,2rem)] gap-y-8 lg:grid-cols-4">
          {CAPITAL_DISCIPLINES.map((discipline, i) => (
            <Reveal
              key={discipline}
              delay={i * 0.07}
              distance={14}
              className="border-t rule pt-5"
            >
              <p className="label opacity-60">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="label mt-4">{discipline}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
