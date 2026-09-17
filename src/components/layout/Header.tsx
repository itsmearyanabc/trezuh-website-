"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { MobileMenu } from "@/components/layout/MobileMenu";
import { Wordmark } from "@/components/layout/Wordmark";
import { NAV } from "@/lib/content";

/**
 * The masthead.
 *
 * Two behaviours, both quiet. It contracts once the page has moved, gaining a
 * surface and a hairline; and it reads the section beneath it — any section
 * marked `data-theme="dark"` — and inverts itself accordingly, so the
 * wordmark is always the right colour without a single flash.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const darkSections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-theme="dark"]'),
    );
    let frame = 0;

    const measure = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);

      // Probe the masthead's optical centre rather than the viewport top.
      const probe = 34;
      setOnDark(
        darkSections.some((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= probe && rect.bottom >= probe;
        }),
      );
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const inverted = onDark || menuOpen;

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-colors duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          inverted ? "text-paper" : "text-ink",
          scrolled && !menuOpen
            ? onDark
              ? "border-b border-rule-dark bg-ink/90 backdrop-blur-[12px]"
              : "border-b border-rule bg-paper/95 backdrop-blur-[12px]"
            : "border-b border-transparent",
        ].join(" ")}
      >
        <div
          className={[
            "shell flex items-center justify-between transition-[height] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled ? "h-16 lg:h-[4.5rem]" : "h-20 lg:h-24",
          ].join(" ")}
        >
          <Link
            href="#top"
            aria-label="TREZUH — home"
            className="shrink-0 py-2"
          >
            <Wordmark
              className={[
                "transition-[font-size] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                scrolled
                  ? "text-[0.95rem] lg:text-[1.05rem]"
                  : "text-[1.05rem] lg:text-[1.3rem]",
              ].join(" ")}
            />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-[clamp(1.75rem,3vw,3.25rem)]">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group relative label inline-block py-2 opacity-75 transition-opacity duration-500 hover:opacity-100 focus-visible:opacity-100"
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-current transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className="label relative z-50 -mr-1 flex items-center gap-3 py-3 pl-3 lg:hidden"
          >
            <span>{menuOpen ? "Close" : "Menu"}</span>
            <span aria-hidden className="relative block h-3 w-5">
              <span
                className={[
                  "absolute left-0 block h-px w-full bg-current transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  menuOpen ? "top-1.5 rotate-45" : "top-0.5",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 block h-px w-full bg-current transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  menuOpen ? "top-1.5 -rotate-45" : "top-[0.6875rem]",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
