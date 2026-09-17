import Link from "next/link";

import { DraftGrid } from "@/components/primitives/DraftGrid";
import { Reveal } from "@/components/primitives/Reveal";
import { RevealLines } from "@/components/primitives/RevealLines";
import { SectionHead } from "@/components/primitives/SectionHead";
import { BRAND } from "@/lib/content";

/**
 * Final call to action. One instruction, one address, nothing else.
 */
export function Contact() {
  return (
    <section
      id="contact"
      data-theme="dark"
      className="relative scroll-mt-20 overflow-hidden bg-ink text-paper"
    >
      <DraftGrid />

      <div className="shell section-pad-lg relative">
        <SectionHead
          index="06"
          label="Enquiries"
          aside={BRAND.address.short}
        />

        <RevealLines
          lines={["Let’s build", "what lasts."]}
          className="mt-[clamp(3rem,7vw,6rem)] display display-tight text-mega uppercase"
        />

        <div className="grid-12 mt-[clamp(3.5rem,8vw,7rem)] items-end gap-y-12">
          <div className="col-span-6 lg:col-span-6">
            <Reveal>
              <p className="max-w-[38ch] text-lead leading-[1.55] opacity-70">
                For investment opportunities, strategic partnerships and
                private enquiries.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <Link
                href={`mailto:${BRAND.email}`}
                className="group relative mt-[clamp(2.5rem,4vw,3.5rem)] flex w-full max-w-[28rem] items-center justify-between overflow-hidden border rule px-7 py-6"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 bg-paper transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <span className="label relative transition-colors duration-[600ms] group-hover:text-ink group-focus-visible:text-ink">
                  Contact TREZUH
                </span>
                <span
                  aria-hidden
                  className="relative transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-hover:text-ink group-focus-visible:translate-x-1.5 group-focus-visible:text-ink"
                >
                  &#8594;
                </span>
              </Link>
            </Reveal>
          </div>

          <Reveal
            className="col-span-6 lg:col-span-4 lg:col-start-9"
            delay={0.16}
          >
            <dl className="grid grid-cols-2 gap-x-6 gap-y-10 border-t rule pt-6">
              <div className="col-span-2">
                <dt className="label opacity-60">Direct</dt>
                <dd className="mt-3">
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="label underline decoration-[0.5px] underline-offset-[6px] opacity-80 transition-opacity duration-500 hover:opacity-100"
                  >
                    {BRAND.email}
                  </a>
                </dd>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <dt className="label opacity-60">Telephone</dt>
                <dd className="mt-3">
                  <a
                    href={`tel:${BRAND.phone.tel}`}
                    className="label opacity-80 transition-opacity duration-500 hover:opacity-100"
                  >
                    {BRAND.phone.display}
                  </a>
                </dd>
              </div>

              <div className="col-span-2">
                <dt className="label opacity-60">Office</dt>
                <dd className="label mt-3 leading-[1.9] opacity-80">
                  {BRAND.address.street}
                  <br />
                  {BRAND.address.locality}, {BRAND.address.region}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
