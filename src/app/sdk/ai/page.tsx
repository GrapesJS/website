import type { Metadata } from "next";
import { ArrowRight, Cloud, Server, SlidersHorizontal } from "lucide-react";
import Footer from "@/app/_components/Footer";
import ScrollReveal from "@/app/_components/ScrollReveal";
import HeroWindowShell from "@/app/_components/WindowShell/HeroWindowShell";
import EmbedBuilderWeb from "@/app/_components/layouts/EmbedBuilderWeb";
import SdkCustomerLogos from "@/app/_components/sdk/SdkCustomerLogos";
import SdkLandingFaq, {
  type SdkFaqItem,
} from "@/app/_components/sdk/SdkLandingFaq";
import SdkLandingFeature from "@/app/_components/sdk/SdkLandingFeature";
import SdkLandingHero from "@/app/_components/sdk/SdkLandingHero";
import {
  SdkAiCard,
  SdkDeveloperFoundations,
} from "@/app/_components/sdk/SdkFeatures";
import { sdkFeatureCardClass } from "@/app/_components/sdk/SdkFeatureCard";
import SdkStartBanner from "@/app/_components/sdk/SdkStartBanner";
import {
  AiBackendIllustration,
  AiChatIllustration,
  AiModelsIllustration,
  AiToolsIllustration,
} from "@/app/_components/sdk/SdkLandingIllustrations";
import { theme } from "@/app/_components/sdk/theme";
import { cn } from "@/lib/utils";
import urls from "@/lib/urls";

const aiMetadata = {
  title: "Embed an AI Visual Editor in Your SaaS | Studio SDK",
  description:
    "Give your users an AI assistant inside your visual editor. Customize the chat UI, choose models and prompts, and connect AI to your product's tools and data.",
};
const canonical = "/sdk/ai";
export const metadata: Metadata = {
  ...aiMetadata,
  alternates: { canonical },
  openGraph: { ...aiMetadata, url: canonical },
};

const docs = "https://app.grapesjs.com/docs-sdk/plugins/ai";
const faqs: SdkFaqItem[] = [
  {
    question: "Can I place and customize AI Chat inside my editor?",
    answer:
      "Yes. The plugin provides a chat panel you can place in your editor layout and lets you customize its built-in UI components, suggestions, inputs, messages, and language.",
  },
  {
    question: "Can I use my own AI models and provider credentials?",
    answer:
      "Yes. Configure provider credentials in AI Settings and select your workspace models for chat, code generation, or image generation. Calls to those models are billed by your provider; agents using Studio defaults and other Studio-powered features may use Studio AI credits.",
  },
  {
    question: "Can AI use my product data or call my own functions?",
    answer:
      "Yes. Add client-side tools for editor or browser actions, or server-side tools for your application services and data. Your backend can also shape the assistant's instructions and response flow.",
  },
  {
    question: "When do I need a custom AI backend?",
    answer:
      "Use Studio's hosted Chat Platform API for the standard setup. A custom backend is available for deployed apps on the Business plan; you can develop against a local custom endpoint before upgrading.",
  },
  {
    question: "Does Studio SDK store conversations or deliver emails?",
    answer:
      "The chat plugin exposes message loading and update callbacks so your app can persist conversation history. Studio SDK provides the editor and AI interface; your product controls user access, project storage, export, and email delivery.",
  },
];

export default function SdkAiPage() {
  return (
    <ScrollReveal>
      <main className="min-h-screen bg-[var(--backgroundColor)] text-white font-normal">
        <SdkLandingHero
          title="Embed an AI visual editor in your product"
          description={aiMetadata.description}
          primaryHref={urls.getSdkLicensesUrl({
            plan: "startup",
            ref: "sdkAiHero",
          })}
          primaryLabel="Embed the Editor"
          primaryPlacement="sdk-ai-hero"
          secondaryHref={urls.getPricingUrl()}
          secondaryLabel="Compare Plans"
        />

        <div className="mx-auto max-w-[1132px] p-5">
          <HeroWindowShell data-reveal>
            <EmbedBuilderWeb />
          </HeroWindowShell>
        </div>

        <SdkCustomerLogos />

        <section
          id="features"
          aria-labelledby="ai-features-heading"
          className="relative z-[1] mx-auto max-w-[1132px] px-4 pb-16 pt-16 md:pt-24"
        >
          <div
            data-reveal
            className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
          >
            <h2
              id="ai-features-heading"
              className={cn(
                "text-3xl font-semibold leading-tight tracking-tight md:text-[46px]",
                theme.colors.primaryText,
              )}
            >
              Add AI editing.
              <br />
              <span className={theme.colors.accentText}>
                Keep control of the experience.
              </span>
            </h2>
            <p
              className={cn(
                "mx-auto mt-6 max-w-3xl text-base leading-8 md:text-lg",
                theme.colors.mutedText,
              )}
            >
              Start with a visual editor and an AI assistant ready to adapt.
              Give users a head start on pages and emails, then let them refine
              every detail visually inside your product.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <SdkAiCard wide />

            <SdkLandingFeature
              eyebrow="Custom chat UI"
              title="Make the assistant feel like part of your product."
              description="Place AI Chat in your editor layout, adapt its labels and suggested prompts, and shape the input and message components around your users."
              href={`${docs}/ai-chat#customization`}
              linkLabel="Explore chat customization"
            >
              <AiChatIllustration />
            </SdkLandingFeature>

            <SdkLandingFeature
              eyebrow="Models & prompts"
              title="Choose the right model for each task."
              description="Configure workspace models for chat, code, and images. Bring your provider credentials through AI Settings and tailor the instructions while Studio handles the hosted backend."
              href={`${docs}/ai-chat#custom-models-and-prompts`}
              linkLabel="Configure models and prompts"
            >
              <AiModelsIllustration />
            </SdkLandingFeature>

            <SdkLandingFeature
              eyebrow="Custom tools"
              title="Let AI work with your product's data and actions."
              description="Connect server-side functions and client-side tools through a custom backend. Give the assistant access to your domain data and actions that work with the editor."
              href={`${docs}/ai-backend#tools`}
              linkLabel="Build custom AI tools"
            >
              <AiToolsIllustration />
            </SdkLandingFeature>

            <SdkLandingFeature
              eyebrow="Custom backend"
              title="Run the AI workflow on your infrastructure."
              description="Connect your own streaming endpoint, choose providers, and extend the assistant's tools and instructions. Use your application's authentication and services around the editor."
              href={`${docs}/ai-backend`}
              linkLabel="Explore custom backends"
            >
              <AiBackendIllustration />
            </SdkLandingFeature>
          </div>
        </section>

        <section
          aria-labelledby="ai-deployment-heading"
          className="mx-auto max-w-[1132px] px-4 py-16 md:py-20"
        >
          <div data-reveal className="mb-10 max-w-2xl">
            <h2
              id="ai-deployment-heading"
              className={cn(
                "text-3xl font-semibold leading-tight tracking-tight md:text-[38px]",
                theme.colors.primaryText,
              )}
            >
              Choose how your AI runs.
            </h2>
            <p
              className={cn(
                "mt-4 text-base leading-relaxed",
                theme.colors.mutedText,
              )}
            >
              Use Studio's hosted AI, bring your own models to the same backend,
              or operate a custom endpoint when you need more control.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Cloud,
                title: "Hosted AI Chat",
                body: "Use the Chat Platform API and Studio's default models with rechargeable AI credits. Connect your token route and let Studio handle AI responses.",
                href: `${docs}/ai-chat#chat-platform-api`,
                link: "Connect hosted AI",
              },
              {
                icon: SlidersHorizontal,
                title: "Your own models",
                body: "Keep the hosted backend and configure provider credentials in AI Settings. Calls to your selected models are billed by your provider.",
                href: `${docs}/ai-chat#custom-models-and-prompts`,
                link: "Bring your models",
              },
              {
                icon: Server,
                title: "Your own backend",
                body: "Develop a custom endpoint on localhost, then deploy it with a Business plan. Choose your providers, tools, and response flow.",
                href: `${docs}/ai-backend`,
                link: "Build your backend",
              },
            ].map(({ icon: Icon, title, body, href, link }) => (
              <article
                data-reveal
                key={title}
                className={cn(sdkFeatureCardClass, "flex flex-col p-6 md:p-7")}
              >
                <Icon
                  size={25}
                  strokeWidth={1.5}
                  className={cn("mb-5", theme.colors.icon)}
                  aria-hidden
                />
                <h3
                  className={cn(
                    "text-xl font-semibold tracking-tight",
                    theme.colors.primaryText,
                  )}
                >
                  {title}
                </h3>
                <p
                  className={cn(
                    "mb-5 mt-3 flex-1 text-sm leading-7",
                    theme.colors.mutedText,
                  )}
                >
                  {body}
                </p>
                <a
                  href={href}
                  className={cn(theme.links.base, theme.colors.linkText)}
                >
                  {link} <ArrowRight size={15} aria-hidden />
                </a>
              </article>
            ))}
          </div>
        </section>

        <SdkDeveloperFoundations />

        <SdkLandingFaq
          title="Questions about AI in Studio SDK"
          description="Understand the integration options, where your application stays in control, and which plan fits your deployment."
          faqs={faqs}
        />

        <SdkStartBanner
          title={
            <>
              Bring AI into your editor.
              <br />
              Make it yours.
            </>
          }
          description="Give users an AI assistant inside your product. Connect the models, tools, and workflows your team needs."
          primaryLabel="Embed the Editor"
          primaryHref={urls.getSdkLicensesUrl({
            plan: "startup",
            ref: "sdkAiFinalCta",
          })}
          secondaryLabel="Read the AI Docs"
          secondaryHref={`${docs}/overview`}
          placement="sdk-ai-final-cta"
        />
        <Footer />
      </main>
    </ScrollReveal>
  );
}
