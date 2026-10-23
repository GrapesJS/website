import { cn } from "@/lib/utils";
import { theme } from "./theme";

export const sdkFeatureCardClass = cn(
  "overflow-hidden rounded-2xl",
  theme.cards.border,
  theme.cards.bg,
);

export default function SdkFeatureCard({
  label,
  title,
  description,
  links,
  children,
  wide = false,
}: {
  label: string;
  title: string;
  description: string;
  links: React.ReactNode;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <article
      data-reveal
      className={cn(
        sdkFeatureCardClass,
        "flex flex-col",
        wide && "md:col-span-2",
      )}
    >
      <div className="flex-1 p-6 md:p-8">
        <p
          className={cn("mb-3", theme.cards.eyebrow, theme.colors.eyebrowText)}
        >
          {label}
        </p>
        <h3
          className={cn(
            "text-2xl font-semibold leading-tight tracking-tight",
            wide ? "md:text-[30px]" : "md:text-[28px]",
            theme.colors.primaryText,
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "mb-5 mt-4 max-w-[760px] text-base leading-relaxed",
            theme.colors.secondaryText,
          )}
        >
          {description}
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-3">{links}</div>
      </div>
      <div className="px-3 pb-3 md:px-5 md:pb-5">{children}</div>
    </article>
  );
}
