"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import WindowShell from ".";

/** The frame straightens as its center approaches the center of the viewport. */
export default function HeroWindowShell({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);

  return (
    <div
      ref={ref}
      {...props}
      className={cn("w-full [perspective:1400px]", className)}
    >
      <motion.div
        className="origin-center motion-reduce:!transform-none"
        style={reducedMotion ? undefined : { rotateX, rotateY, scale }}
      >
        <WindowShell className="shadow-[0_24px_80px_-28px_rgba(0,0,0,0.6)]">
          {children}
        </WindowShell>
      </motion.div>
    </div>
  );
}
