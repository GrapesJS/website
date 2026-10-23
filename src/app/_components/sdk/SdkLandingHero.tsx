import CTALink from "@/app/_components/CTALink";
import Hero from "@/app/_components/Hero";
import { cn } from "@/lib/utils";
import { theme } from "./theme";

type SdkLandingHeroProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  primaryPlacement: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  secondaryPlacement?: string;
  children?: React.ReactNode;
};

export default function SdkLandingHero({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  primaryPlacement,
  secondaryHref,
  secondaryLabel,
  secondaryPlacement,
  children,
}: SdkLandingHeroProps) {
  return (
    <Hero
      title={eyebrow}
      subTitle={title}
      mainHeadingAsH1
      withBanner={false}
      skipSeparator
      clsTitle="mx-auto max-w-2xl px-5 !text-4xl !leading-tight sm:!text-5xl lg:!text-[54px]"
    >
      <div className="mx-auto max-w-2xl px-5 text-center">
        <p
          data-reveal
          className={cn(
            "mx-auto mt-5 max-w-3xl text-lg sm:text-xl sm:leading-8",
            theme.colors.secondaryText,
          )}
        >
          {description}
        </p>
        <div data-reveal className="mt-10 flex flex-wrap justify-center gap-3">
          <CTALink
            href={primaryHref}
            data-ph-capture-attribute-placement={primaryPlacement}
            data-ph-capture-attribute-cta={primaryLabel}
          >
            {primaryLabel}
          </CTALink>
          {secondaryHref && secondaryLabel && (
            <CTALink
              href={secondaryHref}
              variant="tertiary"
              data-ph-capture-attribute-placement={
                secondaryPlacement ?? primaryPlacement
              }
              data-ph-capture-attribute-cta={secondaryLabel}
            >
              {secondaryLabel}
            </CTALink>
          )}
        </div>
        {children && (
          <div className="mt-5 text-sm text-white/55">{children}</div>
        )}
      </div>
    </Hero>
  );
}
