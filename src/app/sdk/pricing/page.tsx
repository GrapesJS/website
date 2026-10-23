import Container from "@/app/_components/Container";
import Footer from "@/app/_components/Footer";
import Hero from "@/app/_components/Hero";
import ScrollReveal from "@/app/_components/ScrollReveal";
import SdkStartBanner from "@/app/_components/sdk/SdkStartBanner";
import urls from "@/lib/urls";
import PricingContent from "./PricingContent";
import type { Metadata } from "next";

const pricingMetadata = {
  title: "Studio SDK Pricing | GrapesJS",
  description:
    "Compare Studio SDK plans for embedding a customizable visual editor, email editing, and AI Chat in your product.",
};

export const metadata: Metadata = {
  ...pricingMetadata,
  alternates: { canonical: "/sdk/pricing" },
  openGraph: { ...pricingMetadata, url: "/sdk/pricing" },
};

export default function SdkPricingPage() {
  return (
    <ScrollReveal>
      <main className="min-h-screen bg-[var(--backgroundColor)] text-white">
        <Hero
          title="STUDIO SDK PRICING"
          subTitle={
            <span className="inline-block">Plans that fit your scale</span>
          }
        />

        <Container className="pb-16 md:pb-24">
          <PricingContent />
        </Container>

        <SdkStartBanner
          primaryHref={urls.getSdkLicensesUrl({ ref: "sdkPricingFinalCta" })}
          placement="sdk-pricing-final-cta"
        />
        <Footer />
      </main>
    </ScrollReveal>
  );
}
