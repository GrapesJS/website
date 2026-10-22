import Hero from "@/app/_components/Hero";
import CTALink from "@/app/_components/CTALink";

type SdkLandingHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  primaryPlacement: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  secondaryPlacement?: string;
  children?: React.ReactNode;
  preview?: React.ReactNode;
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
  preview,
}: SdkLandingHeroProps) {
  return (
    <Hero
      title={eyebrow}
      subTitle={title}
      mainHeadingAsH1
      withBanner={!preview}
      clsTitle="mx-auto max-w-[1000px] px-5 !text-4xl !leading-tight sm:!text-5xl lg:!text-[54px]"
    >
      <div className="mx-auto max-w-3xl px-5 text-center">
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-white/75 sm:text-xl">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
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
      {preview && (
        <div className="mx-auto mt-14 w-full max-w-[1132px] px-5">
          {preview}
        </div>
      )}
    </Hero>
  );
}
