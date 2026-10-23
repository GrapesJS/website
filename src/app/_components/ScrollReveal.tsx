"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Mark section headings and cards with data-reveal; Tailwind handles the motion. */
export default function ScrollReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !("IntersectionObserver" in window)) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const elements = root.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        const groups = new Map<Element | null, number>();
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          const element = target as HTMLElement;
          if (element.dataset.reveal !== "pending") return;
          const index = groups.get(element.parentElement) ?? 0;
          groups.set(element.parentElement, index + 1);
          element.style.setProperty(
            "--reveal-delay",
            `${Math.min(index, 3) * 80}ms`,
          );
          element.dataset.reveal = "visible";
          observer.unobserve(element);
        });
      },
      { rootMargin: "0px 0px -48px 0px", threshold: 0.2 },
    );

    // Content stays visible in server HTML and when JavaScript is unavailable.
    elements.forEach((element) => {
      element.dataset.reveal = "pending";
      observer.observe(element);
    });

    const complete = (element: HTMLElement) => {
      observer.unobserve(element);
      element.dataset.reveal = "complete";
      element.style.removeProperty("--reveal-delay");
    };
    const onAnimationEnd = (event: AnimationEvent) => {
      if (event.animationName !== "section-enter") return;
      const target = event.target;
      if (target instanceof HTMLElement && target.hasAttribute("data-reveal")) {
        complete(target);
      }
    };
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const element = target.closest<HTMLElement>("[data-reveal]");
      if (element && root.contains(element)) complete(element);
    };
    const onMotionChange = () => {
      if (reducedMotion.matches) elements.forEach(complete);
    };

    root.addEventListener("animationend", onAnimationEnd);
    root.addEventListener("focusin", onFocusIn);
    reducedMotion.addEventListener("change", onMotionChange);

    return () => {
      observer.disconnect();
      root.removeEventListener("animationend", onAnimationEnd);
      root.removeEventListener("focusin", onFocusIn);
      reducedMotion.removeEventListener("change", onMotionChange);
      elements.forEach((element) => {
        element.dataset.reveal = "";
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, []);

  return (
    <div
      ref={ref}
      className="contents motion-safe:[&_[data-reveal=pending]]:opacity-0 motion-safe:[&_[data-reveal=visible]]:animate-section-enter"
    >
      {children}
    </div>
  );
}
