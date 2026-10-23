import { cn } from "@/lib/utils";
import urls from "@/lib/urls";
import CTALink from "../CTALink";
import { theme } from "./theme";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

export default function SdkStartBanner({
  title = "Build your first editor. Make it yours.",
  description = "Try Studio SDK in your app and explore the experience you can give your users. Start on the free plan.",
  primaryLabel = "Get started for free",
  primaryHref = urls.getSdkLicensesUrl({ ref: "homepageFeatures" }),
  secondaryLabel = "Read the Docs",
  secondaryHref = urls.getGettingStartedDocsUrl(),
  placement = "sdk-overview-final-cta",
}: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  placement?: string;
}) {
  return (
    <section className="relative z-[1] mx-auto w-full max-w-[1132px] px-4 pb-20 pt-12 md:pb-28">
      <div
        className={cn(
          "relative isolate overflow-hidden rounded-2xl px-6 py-12 text-center md:py-16",
          theme.cards.border,
          theme.cards.bg,
        )}
      >
        <DottedGlowBackground
          className="pointer-events-none [mask-image:radial-gradient(ellipse_at_top,black_0%,transparent_80%)] opacity-75"
          opacity={1}
          gap={10}
          radius={1.6}
          colorLightVar="--activeBaseColor"
          glowColorLightVar="--activeHighlightColor"
          colorDarkVar="--activeBaseColor"
          glowColorDarkVar="--activeHighlightColor"
          speedMin={0.1}
          speedMax={0.5}
          speedScale={1}
        />
        <div aria-hidden className={theme.cards.topGlow} />
        <div className="mx-auto max-w-lg relative">
          <h2
            className={cn(
              "text-3xl font-semibold leading-tight tracking-tight md:text-[50px]",
              theme.colors.primaryText,
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              "mb-8 mt-4 max-w-lg text-base leading-relaxed md:text-lg",
              theme.colors.ctaText,
            )}
          >
            {description}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <CTALink
            href={primaryHref}
            data-ph-capture-attribute-placement={placement}
            data-ph-capture-attribute-cta={primaryLabel}
          >
            {primaryLabel}
          </CTALink>
          <CTALink
            href={secondaryHref}
            variant="tertiary"
            data-ph-capture-attribute-placement={placement}
            data-ph-capture-attribute-cta={secondaryLabel}
          >
            {secondaryLabel}
          </CTALink>
        </div>
      </div>
    </section>
  );
}
