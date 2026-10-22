import type { Metadata } from "next";
import Footer from "@/app/_components/Footer";
import SdkCustomerLogos from "@/app/_components/sdk/SdkCustomerLogos";
import SdkLandingFaq, {
  type SdkFaqItem,
} from "@/app/_components/sdk/SdkLandingFaq";
import SdkLandingFeature from "@/app/_components/sdk/SdkLandingFeature";
import SdkLandingHero from "@/app/_components/sdk/SdkLandingHero";
import {
  AiBackendIllustration,
  AiChatIllustration,
  AiModelsIllustration,
  AiToolsIllustration,
} from "@/app/_components/sdk/SdkLandingIllustrations";
import urls from "@/lib/urls";

const pageTitle = "Embed an AI Visual Editor in Your SaaS | Studio SDK";
const pageDescription =
  "Add an AI assistant to an embeddable visual editor. Customize the chat UI, choose models and prompts, connect product tools, or run a custom backend.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/sdk/ai" },
  openGraph: { title: pageTitle, description: pageDescription, url: "/sdk/ai" },
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
    <main className="min-h-screen bg-[var(--backgroundColor)] text-white">
      <SdkLandingHero
        eyebrow="STUDIO SDK · AI"
        title="An AI editor your product can make its own"
        description="Give customers an AI assistant inside the visual editor in your SaaS. Adapt the interface, choose how models run, and connect AI to the tools and data that make your product useful."
        primaryHref={urls.getSdkLicensesUrl({
          plan: "startup",
          ref: "sdkAiHero",
        })}
        primaryLabel="Start with Studio SDK"
        primaryPlacement="sdk-ai-hero"
        secondaryHref={`${docs}/ai-chat`}
        secondaryLabel="Read the AI Chat guide"
      >
        Supports web and email editors. Your application keeps control of users,
        projects, and product workflows.
      </SdkLandingHero>

      <SdkCustomerLogos />

      <div className="mx-auto max-w-6xl px-5 pb-5 pt-14 text-center sm:pb-10 sm:pt-20">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d39cdd]">
          BUILT TO FIT YOUR PRODUCT
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-5xl">
          Start with a ready-to-use chat. Shape everything around it.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
          AI Chat is an editor plugin with a customizable frontend and a choice
          of hosted or self-managed AI infrastructure.
        </p>
      </div>

      <SdkLandingFeature
        eyebrow="CUSTOM UI"
        title="Make AI feel native in your editor"
        description="Place the AI Chat panel where it works for your users, customize its components and suggested prompts, and load or persist conversation history through your own application."
        href={`${docs}/ai-chat#customization`}
        linkLabel="Explore chat customization"
      >
        <AiChatIllustration />
      </SdkLandingFeature>

      <SdkLandingFeature
        eyebrow="MODELS & PROMPTS"
        title="Choose how each AI task behaves"
        description="Select workspace models independently for chat, code generation, and image generation. Bring provider credentials through AI Settings, then tailor the assistant's instructions to your product and users."
        href={`${docs}/ai-chat#custom-models-and-prompts`}
        linkLabel="Configure models and prompts"
        reverse
      >
        <AiModelsIllustration />
      </SdkLandingFeature>

      <SdkLandingFeature
        eyebrow="CUSTOM TOOLS"
        title="Connect AI to product data and actions"
        description="Extend the assistant with functions in your backend or client-side tools that interact with the editor. This lets AI work with your domain data and carry out product-specific actions."
        href={`${docs}/ai-backend#tools`}
        linkLabel="Build custom AI tools"
      >
        <AiToolsIllustration />
      </SdkLandingFeature>

      <SdkLandingFeature
        eyebrow="CUSTOM BACKEND"
        title="Run AI on infrastructure you control"
        description="Build a streaming endpoint with your preferred AI SDK and providers. Use your own models, tools, and system instructions while keeping application secrets on your server. A custom backend is available for deployed apps on Business; localhost development is supported."
        href={`${docs}/ai-backend`}
        linkLabel="Read the custom backend guide"
        reverse
      >
        <AiBackendIllustration />
      </SdkLandingFeature>

      <section className="border-t border-white/[0.07] px-5 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {[
            {
              title: "Hosted AI Chat",
              body: "Startup and higher plans can use Studio's hosted Chat Platform API with rechargeable Studio AI credits.",
            },
            {
              title: "Your own models",
              body: "Connect provider keys through AI Settings and choose models per AI task. Calls using your provider keys are billed by that provider.",
            },
            {
              title: "Your own backend",
              body: "Develop locally, then deploy a custom AI backend on Business or Enterprise when you need full control.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.025] p-6"
            >
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/60">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <SdkLandingFaq
        title="Questions about AI in Studio SDK"
        description="Understand the integration options, where your application stays in control, and which plan fits your deployment."
        faqs={faqs}
      />

      <section className="border-t border-white/[0.07] px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-[#d39cdd]/20 bg-[radial-gradient(ellipse_at_top,rgba(151,58,168,.18),rgba(18,9,20,.5)_55%)] px-6 py-10 text-center sm:px-12 sm:py-14">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Bring AI editing into your product
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/65">
            Try the SDK editor, review the integration docs, and choose the plan
            that supports your launch.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={urls.getStudioEditorUrl()}
              className="rounded-full bg-[#d39cdd] px-6 py-3 text-sm font-semibold text-[#1b131b] transition hover:bg-[#e4b9eb]"
              data-ph-capture-attribute-placement="sdk-ai-final-cta"
              data-ph-capture-attribute-cta="Try the editor"
            >
              Try the editor
            </a>
            <a
              href={urls.getPricingUrl()}
              className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
              data-ph-capture-attribute-placement="sdk-ai-final-cta"
              data-ph-capture-attribute-cta="Compare SDK plans"
            >
              Compare SDK plans
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
