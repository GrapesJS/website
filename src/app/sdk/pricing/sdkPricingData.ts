import urls from "@/lib/urls";

export type BillingPeriod = "monthly" | "annual";
export type ComparisonValue = string | boolean;

export type ComparisonFeatureKey =
  | "sessions"
  | "extraSessionsPrice"
  | "storage"
  | "extraStoragePrice"
  | "domains"
  | "extraDomainPrice"
  | "wildcardDomains"
  | "apiCallPrice"
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
    tooltip?: string;
  } | null>;
  comparison: Record<ComparisonFeatureKey, ComparisonValue>;
}

export interface ComparisonRow {
  key: ComparisonFeatureKey;
  label: string;
  tooltip?: string;
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

// Seeded values mirror grapesjs-studio-platform/packages/studio-app/prisma/seed-function.ts
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
      { title: "Custom branding" },
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
  { key: "extraSessionsPrice", label: "Extra session pricing" },
  { key: "storage", label: "Storage" },
  { key: "extraStoragePrice", label: "Extra storage pricing" },
  { key: "domains", label: "Included domains", tooltip: multiDomainTooltip },
  { key: "extraDomainPrice", label: "Extra domain pricing" },
  // { key: "apiCallPrice", label: "API call pricing" },
  { key: "branding", label: "Branding" },
  { key: "support", label: "Support" },
  {
    key: "wildcardDomains",
    label: "Wildcard domains",
    tooltip: wildcardDomainsTooltip,
  },
  { key: "slackChannel", label: "Dedicated Slack channel" },
  { key: "pluginSupport", label: "Custom plugin support" },
  { key: "customDevelopment", label: "Custom development" },
];
