import type { Metadata } from "next";
import Footer from "@/app/_components/Footer";
import WindowShell from "@/app/_components/WindowShell";
import EmbedBuilderWeb from "@/app/_components/layouts/EmbedBuilderWeb";
import SectionEyebrow from "@/app/_components/SectionEyebrow";
import SdkCustomerLogos from "@/app/_components/sdk/SdkCustomerLogos";
import SdkLandingFaq, {
  type SdkFaqItem,
} from "@/app/_components/sdk/SdkLandingFaq";
import SdkLandingHero from "@/app/_components/sdk/SdkLandingHero";
import {
  SdkAiCard,
  SdkCustomUiCard,
  SdkContentCards,
  SdkDetails,
  SdkDeveloperFoundations,
} from "@/app/_components/sdk/SdkFeatures";
import EmailTypesSection from "@/app/_components/sdk/EmailTypesSection";
import SdkStartBanner from "@/app/_components/sdk/SdkStartBanner";
import { theme } from "@/app/_components/sdk/theme";
import { cn } from "@/lib/utils";
import urls from "@/lib/urls";

const emailDocs = "https://app.grapesjs.com/docs-sdk/project-types/email";
const emailMetadata = {
  title: "Embed AI Email Builder in Your Product | Studio SDK",
  description:
    "Give your users a drag-and-drop, AI email editor that renders reliably across all email clients.",
};
const canonical = urls.getEmailBuilderUrl();

export const metadata: Metadata = {
  ...emailMetadata,
  alternates: { canonical },
  openGraph: { ...emailMetadata, url: canonical },
};

const faqs: SdkFaqItem[] = [
  {
    question: "Can I embed the email editor inside my SaaS product?",
    answer:
      "Yes. Studio SDK provides React and JavaScript integrations so you can place the email editing experience in your own application and configure its project type, interface, and plugins.",
  },
  {
    question: "Does Studio SDK manage campaigns or send emails?",
    answer:
      "No. Studio SDK provides the editor and lets your application save and export the resulting email. Your product keeps its existing audience, approvals, campaign management, and email delivery workflows.",
  },
  {
    question: "Can I customize and brand the editor?",
    answer:
      "Yes. You can configure the editor layout and theme, add components or plugins, and connect storage and product services through the SDK APIs.",
  },
  {
    question: "Can customers create emails with AI?",
    answer:
      "Yes. Add the AI Chat plugin to the editor, then choose the hosted Chat Platform API, models configured in AI Settings, or a custom backend. A custom backend for deployed apps requires the Business plan.",
  },
];

export default function EmbedAiEmailBuilderPage() {
  return (
    <main className="min-h-screen bg-[var(--backgroundColor)] text-white font-normal">
      <SdkLandingHero
        title="Embed AI email builder in your product"
        description={emailMetadata.description}
        primaryHref={urls.getSdkLicensesUrl({ ref: "emailHeroCta" })}
        primaryLabel="Embed the Builder"
        primaryPlacement="sdk-email-hero"
        secondaryHref={urls.getPricingUrl()}
        secondaryLabel="Compare Plans"
      />

      <div className="mx-auto max-w-[1132px] p-5">
        <WindowShell>
          <EmbedBuilderWeb isEmail />
        </WindowShell>
      </div>

      <SdkCustomerLogos />

      <section
        id="features"
        aria-labelledby="email-features-heading"
        className="relative z-[1] mx-auto max-w-[1132px] px-4 pb-16 pt-16 md:pt-24"
      >
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <SectionEyebrow className="mb-4">
            BUILT FOR YOUR PRODUCT
          </SectionEyebrow>
          <h2
            id="email-time-saving-heading"
            className={cn(
              "text-3xl font-semibold leading-tight tracking-tight md:text-[46px]",
              theme.colors.primaryText,
            )}
          >
            Skip years of editor development.
            <br />
            <span className={theme.colors.accentText}>Launch in hours.</span>
          </h2>
          <p
            className={cn(
              "mx-auto mt-6 max-w-3xl text-base leading-8 md:text-lg",
              theme.colors.mutedText,
            )}
          >
            Put an established email builder into your app, with the editor UI,
            AI, and reusable building blocks ready to adapt. Spend your
            engineering time on the product your customers choose you for.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <SdkAiCard isEmail />
          <SdkContentCards isEmail />
          <SdkCustomUiCard isEmail />
        </div>
      </section>

      <EmailTypesSection />
      <SdkDetails isEmail />
      <SdkDeveloperFoundations />

      <SdkLandingFaq
        title="Questions about the email editor"
        description="See how the embedded editor fits beside your existing product, marketing operations, and delivery stack."
        faqs={faqs}
      />

      <SdkStartBanner
        title={
          <>
            Build your email editor.
            <br />
            Make it yours.
          </>
        }
        description="Give your users an AI email builder inside your product. Start with Studio SDK, shape the experience, and keep building from there."
        primaryLabel="Embed the Builder"
        primaryHref={urls.getSdkLicensesUrl({ ref: "emailFinalCta" })}
        secondaryHref={emailDocs}
        placement="sdk-email-final-cta"
      />
      <Footer />
    </main>
  );
}
