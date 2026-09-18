import type { Metadata } from "next";
import Link from "next/link";

import { Wordmark } from "@/components/layout/Wordmark";
import { BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * 404.
 *
 * Worth building properly rather than leaving the framework default: while
 * the domain was parked, GoDaddy's lander bounced every visitor to /lander,
 * so that URL is sitting in browser histories and autocomplete. Anyone who
 * lands there should see the brand and a way back, not a white page that
 * reads as "the site is broken".
 */
export default function NotFound() {
  return (
    <main
      data-theme="dark"
      className="flex min-h-[100svh] flex-col bg-ink text-paper"
    >
      <div className="shell flex h-20 shrink-0 items-center lg:h-24">
        <Link href="/" aria-label={`${BRAND.name} — home`} className="py-2">
          <Wordmark className="text-[1.05rem] lg:text-[1.3rem]" />
        </Link>
      </div>

      <div className="shell grid-12 flex-1 content-center gap-y-10 pb-24">
        <p className="col-span-6 label border-t rule pt-5 opacity-60 lg:col-span-12">
          <span>404</span>
          <span className="mx-[0.9em] opacity-40">&#8212;</span>
          <span>Not found</span>
        </p>

        <h1 className="col-span-6 display display-tight text-h1 uppercase lg:col-span-8">
          This page
          <br />
          does not exist.
        </h1>

        <div className="col-span-6 lg:col-span-4 lg:col-start-9 lg:self-end">
          <p className="max-w-[34ch] text-body opacity-65">
            The address may be out of date, or the page may have moved.
            Everything else is where you left it.
          </p>

          <Link
            href="/"
            className="group/arrow label relative mt-10 inline-flex items-center gap-[0.9em] pb-[0.7em]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/arrow:scale-x-100 group-focus-visible/arrow:scale-x-100"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-current opacity-25"
            />
            <span>Return to TREZUH</span>
            <span
              aria-hidden
              className="inline-block translate-y-[0.05em] transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/arrow:translate-x-[0.45em] group-focus-visible/arrow:translate-x-[0.45em]"
            >
              &#8594;
            </span>
          </Link>
        </div>
      </div>

      <div className="shell flex shrink-0 items-center justify-between border-t rule py-6">
        <p className="label opacity-60">
          &copy; {BRAND.year} {BRAND.name}
        </p>
        <p className="label opacity-60">{BRAND.address.short}</p>
      </div>
    </main>
  );
}
