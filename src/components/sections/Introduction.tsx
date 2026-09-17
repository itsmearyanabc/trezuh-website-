import { ParallaxImage } from "@/components/primitives/ParallaxImage";
import { Reveal } from "@/components/primitives/Reveal";
import { RevealLines } from "@/components/primitives/RevealLines";
import { IMAGES } from "@/lib/images";

/**
 * Introduction.
 *
 * The statement is set in sentence case against the uppercase hero, broken
 * into authored lines, and closed by the one serif phrase on the screen.
 * Everything else here is space.
 */
export function Introduction() {
  return (
    <section id="firm" className="bg-paper text-ink">
      <div className="shell section-pad-lg">
        <div className="grid-12">
          <RevealLines
            lines={[
              "A diversified firm spanning",
              "luxury real estate and private",
              "equity, focused on creating",
              "exceptional opportunities,",
              "enduring value, and",
              <span key="accent" className="serif-accent">
                generational wealth.
              </span>,
            ]}
            className="col-span-6 display text-[clamp(1.75rem,4.4vw,4.25rem)] leading-[1.08] tracking-[-0.012em] lg:col-span-10 lg:col-start-2"
          />
        </div>

        <div className="grid-12 mt-[clamp(5rem,11vw,11rem)] gap-y-10">
          <Reveal className="col-span-6 lg:col-span-3" distance={14}>
            <p className="label">
              <span>01</span>
              <span className="mx-[0.9em] opacity-60">&#8212;</span>
              <span>Our Approach</span>
            </p>
          </Reveal>

          <div className="col-span-6 space-y-8 lg:col-span-5 lg:col-start-7">
            <Reveal delay={0.06}>
              <p className="max-w-[46ch] text-lead leading-[1.55]">
                We identify opportunities where capital, real estate and
                strategic vision intersect.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="max-w-[46ch] text-body opacity-65">
                Through disciplined investment and thoughtful development, we
                seek to create assets that retain relevance long beyond their
                creation.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Full-bleed plate. A pause in the reading, and the first change of
          scale on the page. */}
      <figure className="m-0">
        <Reveal distance={0}>
          <ParallaxImage
            src={IMAGES.bandCurve}
            alt="A sweeping concrete canopy crossed by a single figure"
            className="aspect-[16/10] w-full sm:aspect-[2/1] lg:aspect-[21/9]"
            sizes="100vw"
            amount={8}
          />
        </Reveal>
        <figcaption className="shell mt-5 flex items-baseline justify-between gap-6 pb-[clamp(3rem,6vw,6rem)]">
          <span className="label opacity-60">Fig. 01</span>
          <span className="label opacity-60">Form · Permanence · Light</span>
        </figcaption>
      </figure>
    </section>
  );
}
