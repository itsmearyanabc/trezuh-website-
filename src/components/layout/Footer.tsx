import Link from "next/link";

import { Wordmark } from "@/components/layout/Wordmark";
import { Reveal } from "@/components/primitives/Reveal";
import { BRAND, NAV, SOCIAL } from "@/lib/content";

export function Footer() {
  return (
    <footer data-theme="dark" className="bg-ink text-paper">
      <div className="shell border-t rule pt-[clamp(3.5rem,7vw,6rem)] pb-10">
        <div className="grid-12 gap-y-14">
          <Reveal className="col-span-6 lg:col-span-5" distance={16}>
            <Wordmark
              className="text-[clamp(1.4rem,2.4vw,2rem)]"
              withDescriptor
              descriptorClassName="tracking-[0.18em]"
            />

            <address className="mt-[clamp(2.5rem,4vw,3.5rem)] not-italic">
              <p className="label leading-[2] opacity-70">
                {BRAND.address.street}
                <br />
                {BRAND.address.locality}, {BRAND.address.region}
                <br />
                {BRAND.address.country}
              </p>

              <div className="mt-7 flex flex-col gap-3">
                <a
                  href={`tel:${BRAND.phone.tel}`}
                  className="label opacity-80 transition-opacity duration-500 hover:opacity-100"
                >
                  {BRAND.phone.display}
                </a>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="label opacity-80 transition-opacity duration-500 hover:opacity-100"
                >
                  {BRAND.email}
                </a>
              </div>
            </address>
          </Reveal>

          <nav
            aria-label="Footer"
            className="col-span-3 lg:col-span-3 lg:col-start-8"
          >
            <p className="label mb-6 opacity-60">Navigate</p>
            <ul className="space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="label opacity-75 transition-opacity duration-500 hover:opacity-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-3 lg:col-span-2 lg:col-start-11">
            <p className="label mb-6 opacity-60">Connect</p>
            <ul className="space-y-3">
              {SOCIAL.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="label opacity-75 transition-opacity duration-500 hover:opacity-100"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={BRAND.phone.whatsapp}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label opacity-75 transition-opacity duration-500 hover:opacity-100"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="label opacity-75 transition-opacity duration-500 hover:opacity-100"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-[clamp(4rem,8vw,7rem)] flex flex-col gap-3 border-t rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label opacity-60">
            &copy; {BRAND.year} {BRAND.name}
          </p>
          <p className="label opacity-60">{BRAND.address.short}</p>
        </div>
      </div>
    </footer>
  );
}
