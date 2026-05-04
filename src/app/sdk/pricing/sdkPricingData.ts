import urls from "@/lib/urls";

export type BillingPeriod = "monthly" | "annual";
export type ComparisonValue = string | boolean;

export type ComparisonFeatureKey =
  | "loads"
  | "extraLoadsPrice"
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
  cardFeatures: Array<string | null>;
  comparison: Record<ComparisonFeatureKey, ComparisonValue>;
}

export interface ComparisonRow {
  key: ComparisonFeatureKey;
  label: string;
}

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
      "1,000 loads per month",
      "$50 per extra 1,000 loads",
      "100 MB storage",
      "1 domain included",
      null,
      "GrapesJS branding",
      "Standard email support",
      null,
    ],
    comparison: {
      loads: "1,000 / month",
      extraLoadsPrice: "$50 / extra 1,000",
      storage: "100 MB",
      extraStoragePrice: "$20 / GB",
      domains: "1 included",
      extraDomainPrice: "N/A",
      wildcardDomains: false,
      apiCallPrice: "N/A",
      branding: "GrapesJS branding",
      support: "Standard email",
      slackChannel: false,
      pluginSupport: false,
      customDevelopment: false,
    },
  },
  {
    id: "startup",
    name: "Startup plan",
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
      "20,000 loads per month",
      "$20 per extra 1,000 loads",
      "10 GB storage",
      "2 domains included",
      "$0.01 per API call",
      "Custom branding",
      "Priority email support",
      null,
    ],
    comparison: {
      loads: "20,000 / month",
      extraLoadsPrice: "$20 / extra 1,000",
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
    name: "Business plan",
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
      "50,000 loads per month",
      "$10 per extra 1,000 loads",
      "100 GB storage",
      "2 domains included",
      "$0.001 per API call",
      "Wildcard domains",
      "Dedicated Slack channel",
      null,
    ],
    comparison: {
      loads: "50,000 / month",
      extraLoadsPrice: "$10 / extra 1,000",
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
    name: "Enterprise plan",
    icon: "/assets/images/plans/enterprise.png",
    price: { monthly: "Custom", annual: "Custom" },
    description: "Best for large organizations",
    includes: "business",
    cta: {
      label: "Contact sales",
      href: urls.getEnterpriseContactFormUrl(),
    },
    cardFeatures: [
      "24x7 Phone Support",
      "Unlimited Sessions",
      "Unlimited Cloud Storage",
      "Custom plugin support",
      "Multiple Domains Support",
      "Custom Branding",
      "Custom development",
    ],
    comparison: {
      loads: "Custom",
      extraLoadsPrice: "Custom",
      storage: "Custom",
      extraStoragePrice: "Custom",
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
  { key: "loads", label: "Editor loads" },
  { key: "extraLoadsPrice", label: "Extra loads pricing" },
  { key: "storage", label: "Storage" },
  { key: "extraStoragePrice", label: "Extra storage pricing" },
  { key: "domains", label: "Included domains" },
  { key: "extraDomainPrice", label: "Extra domain pricing" },
  { key: "wildcardDomains", label: "Wildcard domains" },
  { key: "apiCallPrice", label: "API call pricing" },
  { key: "branding", label: "Branding" },
  { key: "support", label: "Support" },
  { key: "slackChannel", label: "Dedicated Slack channel" },
  { key: "pluginSupport", label: "Custom plugin support" },
  { key: "customDevelopment", label: "Custom development" },
];
