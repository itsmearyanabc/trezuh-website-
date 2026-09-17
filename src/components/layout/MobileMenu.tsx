"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

import { BRAND, NAV, SOCIAL } from "@/lib/content";
import { EASE_EDITORIAL } from "@/lib/motion";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * Fullscreen menu. Not a drawer, not a dropdown: the page gives way to a
 * single black index page with the navigation set at editorial scale.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          data-theme="dark"
          className="fixed inset-0 z-40 flex flex-col bg-ink text-paper lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.42, ease: EASE_EDITORIAL } }}
          transition={{ duration: 0.5, ease: EASE_EDITORIAL }}
        >
          {/* The masthead sits above this panel and keeps the wordmark and
              the close control; the overlay only reserves its height. */}
          <div className="h-20 shrink-0" />

          <nav
            aria-label="Primary"
            className="shell flex flex-1 flex-col justify-center"
          >
            <ul>
              {NAV.map((item, i) => (
                <li key={item.href} className="overflow-hidden border-b rule">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%", transition: { duration: 0.3 } }}
                    transition={{
                      duration: 0.9,
                      ease: EASE_EDITORIAL,
                      delay: 0.1 + i * 0.06,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-baseline gap-5 py-[0.7em] display text-[clamp(2rem,10vw,3.25rem)] uppercase"
                    >
                      <span className="label opacity-60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="shell shrink-0 pb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.45, duration: 0.7 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <p className="label opacity-60">{BRAND.descriptor}</p>
            <a href={`mailto:${BRAND.email}`} className="label mt-6 block">
              {BRAND.email}
            </a>
            <a
              href={`tel:${BRAND.phone.tel}`}
              className="label mt-3 block opacity-80"
            >
              {BRAND.phone.display}
            </a>
            <div className="mt-5 flex items-center gap-x-8">
              {SOCIAL.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label opacity-60"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
