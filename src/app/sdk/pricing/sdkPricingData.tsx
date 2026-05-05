import type { ReactNode } from "react";
import urls from "@/lib/urls";

export type BillingPeriod = "monthly" | "annual";
export type ComparisonValue = string | boolean;
export type FeatureTooltipContent = ReactNode;

export type ComparisonFeatureKey =
  | "sessions"
  | "extraSessionsPrice"
  | "storage"
  | "extraStoragePrice"
  | "domains"
  | "extraDomainPrice"
  | "wildcardDomains"
  | "apiCallPrice"
  | "aiChat"
  | "premiumPlugins"
  | "branding"
  | "support"
  | "slackChannel"
  | "pluginSupport"
  | "customDevelopment";

export interface SdkPricingPlan {
  id: "free" | "startup" | "business" | "enterprise";
  name: string;
  icon: string;
  description: string;
  price: Record<BillingPeriod, string>;
  cta: {
    label: string;
    href: string;
  };
  priceSuffix?: Partial<Record<BillingPeriod, string>>;
  includes?: string;
  preList?: string;
  cardFeatures: Array<{
    title: string;
    note?: string;
    tooltip?: FeatureTooltipContent;
  } | null>;
  comparison: Record<ComparisonFeatureKey, ComparisonValue>;
}

export interface ComparisonRow {
  key: ComparisonFeatureKey;
  label: string;
  tooltip?: FeatureTooltipContent;
}

export interface PricingFaqItem {
  value: string;
  question: string;
  answer: ReactNode;
}

const tooltipLinkClassName =
  "text-sm font-medium text-[#d39cdd] underline decoration-white/25 underline-offset-4 transition-colors hover:text-white";

function PricingInfoLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={tooltipLinkClassName}
    >
      {children}
    </a>
  );
}

const sessionsTooltip =
  "A session is counted each time a user opens the editor. The session remains active as long as the editor stays open and isn't reloaded.";
const domainTooltip =
  "A domain is where the editor is loaded from, for example app.mydomain.com.";
const multiDomainTooltip = `${domainTooltip} Multiple domains let you reuse the same license across the available domains, for example for production and stage environments.`;
const studioBrandingTooltip =
  'A small "powered by" badge will be rendered in the editor.';
const customBrandingTooltip =
  'No "powered by" badge will be rendered in the editor.';
const wildcardDomainsTooltip =
  "Wildcard domains are useful for setups like user1.mydomain.com and user2.mydomain.com, allowing you to cover them with a single *.mydomain.com domain.";
const extraSessionsPricingTooltip =
  "If you go above the included session limit, the difference is billed at the end of the monthly cycle.";
const storageTooltip =
  "This is the included storage available when user-uploaded assets, like images and files, are stored on our cloud.";
const extraStoragePricingTooltip =
  "If you go above the included storage limit, the difference is billed at the end of the monthly cycle.";
const extraDomainPricingTooltip =
  "If you need more domains than the included limit, each additional domain is billed at the end of the monthly cycle.";
const aiChatTooltip = (
  <>
    <p>
      Startup includes the AI Chat frontend plugin with messages routed through
      our cloud backend, using our model choices and rechargeable credits.
      Business and Enterprise can connect a custom AI backend, so you control
      models, tools, and behavior.
    </p>
    <div className="flex flex-col gap-1">
      <PricingInfoLink href="https://app.grapesjs.com/docs-sdk/plugins/ai/overview">
        Overview
      </PricingInfoLink>
      <PricingInfoLink href="https://app.grapesjs.com/docs-sdk/plugins/ai/ai-chat">
        AI Chat frontend
      </PricingInfoLink>
      <PricingInfoLink href="https://app.grapesjs.com/docs-sdk/plugins/ai/ai-backend">
        Custom AI backend
      </PricingInfoLink>
    </div>
  </>
);
const premiumPluginsTooltip = (
  <>
    <p>Premium plugins are available starting from the Startup plan.</p>
    <PricingInfoLink href="https://app.grapesjs.com/docs-sdk/plugins/overview">
      View plugin list
    </PricingInfoLink>
  </>
);

export const sdkPricingPlans: SdkPricingPlan[] = [
  {
    id: "free",
    name: "Free",
    icon: "/assets/images/plans/free.png",
    price: { monthly: "$0", annual: "$0" },
    description: "Free access. Forever",
    preList: "All basic features",
    cta: {
      label: "Try Now",
      href: urls.getSdkLicensesUrl({ plan: "free" }),
    },
    cardFeatures: [
      {
        title: "1,000 sessions per month",
        note: "$50 per extra 1,000 sessions",
        tooltip: sessionsTooltip,
      },
      { title: "1 domain included", tooltip: domainTooltip },
      { title: "With Studio branding", tooltip: studioBrandingTooltip },
      { title: "Standard email support" },
    ],
    comparison: {
      sessions: "1,000 / month",
      extraSessionsPrice: "$50 / extra 1,000",
      storage: "100 MB",
      extraStoragePrice: "$20 / GB",
      domains: "1 included",
      extraDomainPrice: "N/A",
      wildcardDomains: false,
      apiCallPrice: "N/A",
      aiChat: false,
      premiumPlugins: false,
      branding: "With Studio branding",
      support: "Standard email",
      slackChannel: false,
      pluginSupport: false,
      customDevelopment: false,
    },
  },
  {
    id: "startup",
    name: "Startup",
    icon: "/assets/images/plans/startup.png",
    price: { monthly: "$200", annual: "$2,000" },
    description: "Best for small teams",
    priceSuffix: { monthly: "/month", annual: "/year" },
    includes: "free",
    cta: {
      label: "Get This Plan",
      href: urls.getSdkLicensesUrl({ plan: "startup" }),
    },
    cardFeatures: [
      {
        title: "20,000 sessions per month",
        note: "$20 per extra 1,000 sessions",
        tooltip: sessionsTooltip,
      },
      { title: "2 domains included", tooltip: multiDomainTooltip },
      { title: "Custom branding", tooltip: customBrandingTooltip },
      { title: "Priority email support" },
    ],
    comparison: {
      sessions: "20,000 / month",
      extraSessionsPrice: "$20 / extra 1,000",
      storage: "10 GB",
      extraStoragePrice: "$10 / GB",
      domains: "2 included",
      extraDomainPrice: "$150 / domain",
      wildcardDomains: false,
      apiCallPrice: "$0.01 / call",
      aiChat: "Frontend plugin",
      premiumPlugins: true,
      branding: "Custom branding",
      support: "Priority email",
      slackChannel: false,
      pluginSupport: false,
      customDevelopment: false,
    },
  },
  {
    id: "business",
    name: "Business",
    icon: "/assets/images/plans/business.png",
    price: { monthly: "$2,000", annual: "$20,000" },
    description: "Best for growing businesses",
    priceSuffix: { monthly: "/month", annual: "/year" },
    includes: "startup",
    cta: {
      label: "Get This Plan",
      href: urls.getSdkLicensesUrl({ plan: "business" }),
    },
    cardFeatures: [
      {
        title: "50,000 sessions per month",
        note: "$10 per extra 1,000 sessions",
        tooltip: sessionsTooltip,
      },
      { title: "2 domains included", tooltip: multiDomainTooltip },
      { title: "Wildcard domains", tooltip: wildcardDomainsTooltip },
      { title: "Dedicated Slack channel" },
    ],
    comparison: {
      sessions: "50,000 / month",
      extraSessionsPrice: "$10 / extra 1,000",
      storage: "100 GB",
      extraStoragePrice: "$5 / GB",
      domains: "2 included",
      extraDomainPrice: "$100 / domain",
      wildcardDomains: true,
      apiCallPrice: "$0.001 / call",
      aiChat: "Custom backend",
      premiumPlugins: true,
      branding: "Custom branding",
      support: "Dedicated Slack",
      slackChannel: true,
      pluginSupport: false,
      customDevelopment: false,
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: "/assets/images/plans/enterprise.png",
    price: { monthly: "Custom", annual: "Custom" },
    description: "Best for large organizations",
    includes: "business",
    cta: {
      label: "Contact sales",
      href: urls.getEnterpriseContactFormUrl(),
    },
    cardFeatures: [
      { title: "24x7 phone support" },
      { title: "Unlimited sessions" },
      { title: "Custom plugin support" },
      { title: "Multiple domains support" },
      { title: "Custom branding", tooltip: customBrandingTooltip },
      { title: "Custom development" },
    ],
    comparison: {
      sessions: "Unlimited",
      extraSessionsPrice: "Unlimited",
      storage: "Unlimited",
      extraStoragePrice: "Unlimited",
      domains: "Custom",
      extraDomainPrice: "Custom",
      wildcardDomains: true,
      apiCallPrice: "Custom",
      aiChat: "Custom backend",
      premiumPlugins: true,
      branding: "Custom branding",
      support: "24x7 phone support",
      slackChannel: true,
      pluginSupport: true,
      customDevelopment: true,
    },
  },
];

export const comparisonRows: ComparisonRow[] = [
  { key: "sessions", label: "Editor sessions", tooltip: sessionsTooltip },
  {
    key: "extraSessionsPrice",
    label: "Extra session pricing",
    tooltip: extraSessionsPricingTooltip,
  },
  { key: "storage", label: "Storage", tooltip: storageTooltip },
  {
    key: "extraStoragePrice",
    label: "Extra storage pricing",
    tooltip: extraStoragePricingTooltip,
  },
  { key: "domains", label: "Included domains", tooltip: multiDomainTooltip },
  {
    key: "extraDomainPrice",
    label: "Extra domain pricing",
    tooltip: extraDomainPricingTooltip,
  },
  { key: "branding", label: "Branding" },
  { key: "support", label: "Support" },
  { key: "aiChat", label: "AI Chat", tooltip: aiChatTooltip },
  {
    key: "premiumPlugins",
    label: "Premium plugins",
    tooltip: premiumPluginsTooltip,
  },
  {
    key: "wildcardDomains",
    label: "Wildcard domains",
    tooltip: wildcardDomainsTooltip,
  },
  { key: "slackChannel", label: "Dedicated Slack channel" },
  { key: "pluginSupport", label: "Custom plugin support" },
  { key: "customDevelopment", label: "Custom development" },
];

export const sdkPricingFaqs: PricingFaqItem[] = [
  {
    value: "sessions",
    question: "What are the sessions?",
    answer: (
      <p>
        A session is counted each time a user loads the editor. For example, if
        one user loads the editor in the morning and keeps it open while
        working, that is one session for the whole time until the editor is
        closed or reloaded.
      </p>
    ),
  },
  {
    value: "reload-session",
    question:
      "If a user reloads the page, will this count as an additional session?",
    answer: (
      <p>
        Yes, but there is a 1 minute cooldown period for each session to avoid
        counting fast refreshes as additional sessions.
      </p>
    ),
  },
  {
    value: "published-projects",
    question: "Are the published/hosted projects counted towards sessions?",
    answer: (
      <p>
        No, sessions are only related to the editor load, and we have no
        visibility on your exported or published projects.
      </p>
    ),
  },
  {
    value: "custom-storage",
    question: "Can I choose where to store my users' data?",
    answer: (
      <div className="flex flex-col gap-3">
        <p>
          Yes. You can configure custom storage for projects and uploaded
          assets, like images, instead of using our cloud storage.
        </p>
        <div className="flex flex-col gap-1">
          <PricingInfoLink href="https://app.grapesjs.com/docs-sdk/configuration/projects#self-hosted-storage">
            Project storage
          </PricingInfoLink>
          <PricingInfoLink href="https://app.grapesjs.com/docs-sdk/configuration/assets/overview#custom-storage">
            Asset storage
          </PricingInfoLink>
        </div>
      </div>
    ),
  },
  {
    value: "custom-plan",
    question: "Can I have a custom plan?",
    answer: (
      <p>
        Yes, it is possible. Please{" "}
        <PricingInfoLink href={urls.getContactUsUrl()}>
          reach out to us
        </PricingInfoLink>{" "}
        and we can discuss a custom plan setup.
      </p>
    ),
  },
];
