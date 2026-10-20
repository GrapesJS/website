import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SectionEyebrowProps = HTMLAttributes<HTMLElement> & {
  as?: "p" | "h2";
};

/** Shared section label for headings outside the feature cards. */
export default function SectionEyebrow({
  as: Tag = "p",
  className,
  children,
  ...props
}: SectionEyebrowProps) {
  return (
    <Tag
      {...props}
      className={cn(
        "relative inline-block max-w-full pb-3 text-[14px] font-semibold uppercase leading-5 tracking-[0.16em] text-[color:var(--activeHighlightColor)]",
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent_0%,#caa4ea_49.5%,transparent_100%)]"
      />
    </Tag>
  );
}
