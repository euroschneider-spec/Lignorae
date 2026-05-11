"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "lignorae-cookie-consent";
const STORAGE_VALUE = "essential-only-accepted";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = window.localStorage.getItem(STORAGE_KEY);

    if (accepted !== STORAGE_VALUE) {
      setVisible(true);
    }
  }, []);

  function acceptCookies() {
    window.localStorage.setItem(STORAGE_KEY, STORAGE_VALUE);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-3xl border border-black/15 bg-[#fbfaf7]/95 p-5 text-black shadow-2xl backdrop-blur-xl md:bottom-6 md:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-black/95">
            Cookies
          </p>
          <p className="text-sm font-normal leading-7 text-black/95">
            We currently use only essential cookies and local storage required
            for the proper functioning, security and basic operation of this
            website. No analytics, advertising trackers or marketing cookies are
            active at this stage.
          </p>
          <p className="mt-3 text-xs font-normal leading-6 text-black/95">
            If this changes in the future, optional services will not be loaded
            without your prior consent.
          </p>
          <Link
            href="/privacy-policy"
            className="mt-3 inline-block text-[10px] uppercase tracking-[0.3em] text-black/95 underline underline-offset-4 transition hover:text-black"
          >
            Privacy Policy / Datenschutzerklärung
          </Link>
        </div>

        <button
          type="button"
          onClick={acceptCookies}
          className="shrink-0 border border-black bg-black px-5 py-3 text-[10px] uppercase tracking-[0.32em] text-white transition hover:bg-transparent hover:text-black"
        >
          Accept essential
        </button>
      </div>
    </div>
  );
}