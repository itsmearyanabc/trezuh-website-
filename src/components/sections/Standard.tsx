import { Reveal } from "@/components/primitives/Reveal";
import { RevealLines } from "@/components/primitives/RevealLines";
import { SectionHead } from "@/components/primitives/SectionHead";
import { PRINCIPLES } from "@/lib/content";

/**
 * The TREZUH Standard.
 *
 * The manifesto is set as two opposed blocks — one anchored left, one pushed
 * to the right margin — so the statement is read as a turn rather than as a
 * paragraph. The closing word is the only italic on the page.
 */
export function Standard() {
  return (
    <section id="standard" className="scroll-mt-20 bg-paper text-ink">
      <div className="shell section-pad-lg">
        <SectionHead index="05" label="The TREZUH Standard" />

        <div className="grid-12 mt-[clamp(3rem,7vw,6rem)] items-end gap-y-10">
          <RevealLines
            lines={["The TREZUH", "Standard."]}
            className="col-span-6 display display-tight text-h1 uppercase lg:col-span-7"
          />
          <Reveal
            className="col-span-6 lg:col-span-4 lg:col-start-9"
            delay={0.12}
          >
            <p className="max-w-[34ch] text-body opacity-65">
              Four principles govern every position we take, and every position
              we decline.
            </p>
          </Reveal>
        </div>

        <div className="mt-[clamp(5rem,12vw,12rem)]">
          <RevealLines
            lines={["We don’t chase", "momentum."]}
            className="display display-tight text-mega uppercase"
          />
          <RevealLines
            lines={[
              "We build",
              <span key="endurance" className="serif-accent">
                endurance.
              </span>,
            ]}
            className="mt-[0.06em] display display-tight text-mega uppercase lg:text-right"
            delay={0.12}
          />
        </div>

        <div className="mt-[clamp(5rem,13vw,13rem)] grid grid-cols-2 gap-x-[clamp(0.75rem,1.6vw,2rem)] gap-y-12 lg:grid-cols-4">
          {PRINCIPLES.map((principle, i) => (
            <Reveal
              key={principle.title}
              delay={i * 0.08}
              className="border-t rule pt-6"
            >
              <p className="label opacity-60">{principle.index}</p>
              <h3 className="mt-6 display text-h3 uppercase">
                {principle.title}
              </h3>
              <p className="mt-4 max-w-[26ch] text-small leading-[1.7] opacity-60">
                {principle.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
