import Image from "next/image";

import { ArrowLink } from "@/components/primitives/ArrowLink";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionHead } from "@/components/primitives/SectionHead";
import { PILLARS } from "@/lib/content";

/**
 * The three disciplines.
 *
 * Not cards — full-width registers, the way a contents page is set. Hovering
 * a register inverts it from the baseline up and lifts a single photograph
 * into the space between the copy and the link. Focus inside the register
 * does the same thing, so the behaviour exists for the keyboard too.
 */
export function Pillars() {
  return (
    <section className="bg-paper pb-[clamp(4rem,9vw,9rem)] text-ink">
      <div className="shell pb-[clamp(3rem,6vw,5.5rem)]">
        <SectionHead
          index="02"
          label="Capabilities"
          aside="Three disciplines held to one standard"
        />
      </div>

      <div>
        {PILLARS.map((pillar) => (
          <article
            key={pillar.id}
            id={pillar.id}
            className="group relative scroll-mt-24 border-t rule last:border-b"
          >
            <span
              aria-hidden
              className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 group-focus-within:scale-y-100 motion-reduce:transition-none"
            />

            <div className="shell relative">
              <Reveal
                /* Baseline alignment: the numeral, the title and the link all
                   sit on one line, the way an index page is set. */
                className="grid-12 items-baseline gap-y-7 py-[clamp(2.75rem,5.5vw,5.5rem)] transition-colors duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-paper group-focus-within:text-paper"
                distance={18}
              >
                <p className="col-span-6 display text-numeral leading-none opacity-45 transition-opacity duration-[700ms] group-hover:opacity-70 group-focus-within:opacity-70 lg:col-span-1">
                  {pillar.index}
                </p>

                <div className="col-span-6 lg:col-span-5 lg:col-start-3">
                  <h3 className="display text-h2 uppercase leading-[0.9]">
                    {pillar.title}
                  </h3>
                  <p className="mt-6 max-w-[34ch] text-body opacity-60">
                    {pillar.description}
                  </p>
                </div>

                {/* One photograph, two jobs. On a touch screen it sits in the
                    flow, because there is no hover to reveal it; from the
                    desktop breakpoint the same element becomes the panel that
                    unmasks between the copy and the link. */}
                <div className="col-span-6 mt-1 sm:col-span-4 sm:col-start-3 lg:pointer-events-none lg:absolute lg:top-1/2 lg:right-[19%] lg:col-auto lg:mt-0 lg:h-[78%] lg:w-[12.5vw] lg:max-w-[14rem] lg:-translate-y-1/2">
                  <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-auto lg:h-full lg:[clip-path:inset(100%_0_0_0)] lg:transition-[clip-path] lg:duration-[1000ms] lg:ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover:[clip-path:inset(0%_0_0_0)] lg:group-focus-within:[clip-path:inset(0%_0_0_0)]">
                    <div className="relative h-full w-full lg:scale-[1.12] lg:transition-transform lg:duration-[1400ms] lg:ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover:scale-100 lg:group-focus-within:scale-100">
                      <Image
                        src={pillar.image}
                        alt={pillar.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 60vw, 100vw"
                        placeholder="blur"
                        className="object-cover grade"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-6 lg:col-span-2 lg:col-start-11 lg:justify-self-end">
                  <ArrowLink href={pillar.href}>Explore</ArrowLink>
                </div>
              </Reveal>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
