"use client";

import { useEffect } from "react";

const STORAGE_KEY = "grapesjs:first-touch-utm";
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;
const APP_ORIGIN = "https://app.grapesjs.com";

/** Forwards first-touch campaign tags to the app's URL-based attribution. */
export default function MarketingAttributionLinks() {
  useEffect(() => {
    const incoming = new URLSearchParams(window.location.search);
    const initialUtm = new URLSearchParams();

    for (const key of UTM_KEYS) {
      const value = incoming.get(key);
      if (value) initialUtm.set(key, value);
    }

    try {
      if (!sessionStorage.getItem(STORAGE_KEY) && initialUtm.size > 0) {
        sessionStorage.setItem(STORAGE_KEY, initialUtm.toString());
      }
    } catch {
      // Attribution forwarding is optional when browser storage is unavailable.
    }

    const forwardAttribution = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== APP_ORIGIN) return;

      try {
        const savedUtm = sessionStorage.getItem(STORAGE_KEY);
        if (!savedUtm) return;

        const attribution = new URLSearchParams(savedUtm);
        for (const key of UTM_KEYS) {
          const value = attribution.get(key);
          if (value && !destination.searchParams.has(key)) {
            destination.searchParams.set(key, value);
          }
        }
        anchor.href = destination.toString();
      } catch {
        // Keep the original destination if browser storage is unavailable.
      }
    };

    document.addEventListener("click", forwardAttribution, true);
    return () =>
      document.removeEventListener("click", forwardAttribution, true);
  }, []);

  return null;
}
