"use client";
import { HTMLAttributes, useState } from "react";

import urls from "@/lib/urls";
import cn from "classnames";
import CTALink from "../CTALink";
import TabSelect, { Tab } from "../TabSelect";
import styles from "./styles.module.css";

interface Plan {
  id: string;
  name: string;
  icon: string;
  price: Record<"monthly" | "annual", string>;
  description: string;
  cta: {
    label: string;
    variant: "primary" | "secondary" | "tertiary";
    href: string;
  };
  includes?: string;
  features: string[];
}

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    icon: "/assets/images/plans/free.png",
    price: { monthly: "$0", annual: "$0" },
    description: "Free access. Forever",
    cta: {
      label: "Try Now",
      variant: "tertiary",
      href: urls.getSdkDashboardUrl("free"),
    },
    features: [
      "1,000 sessions per month",
      "Support for one domain",
      "Standard Email Support",
    ],
  },
  {
    id: "startup",
    name: "Startup plan",
    icon: "/assets/images/plans/startup.png",
    price: { monthly: "$200", annual: "$2000" },
    description: "Best for small team",
    cta: {
      label: "Get This Plan",
      variant: "secondary",
      href: urls.getSdkDashboardUrl("startup"),
    },
    includes: "free",
    features: [
      "20,000 sessions per month",
      "Custom Branding",
      "Priority Email Support",
    ],
  },
  {
    id: "business",
    name: "Business plan",
    icon: "/assets/images/plans/business.png",
    price: { monthly: "$2000", annual: "$20,000" },
    description: "Best for growing businesses",
    cta: {
      label: "Get This Plan",
      variant: "secondary",
      href: urls.getSdkDashboardUrl("business"),
    },
    includes: "startup",
    features: [
      "50,000 sessions per month",
      "Dedicated Slack Channel",
      "Multiple sub-domains support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise plan",
    icon: "/assets/images/plans/enterprise.png",
    price: { monthly: "Custom", annual: "Custom" },
    description: "Best for large organizations",
    cta: {
      label: "Contact sales",
      variant: "secondary",
      href: urls.getEnterpriseContactFormUrl(),
    },
    includes: "business",
    features: [
      "24x7 Phone Support",
      "Unlimited Cloud Storage",
      "Unlimited Sessions",
      "Unlimited Cloud Storage",
      "Custom Plugin Support",
      "Multiple domains Support",
      "Custom Branding",
      "Custom Development",


    ],
  },
] as const;

const PlanCard = ({
  className,
  plan,
  selectedPeriod,
}: {
  className?: string;
  plan: Plan;
  selectedPeriod: "monthly" | "annual";
}) => (
  <div className={cn(styles.plan, className)}>
    <div>
      <div className={styles.planTitle}>
        <div className={styles.icon}>
          <img src={plan.icon} />
        </div>
        <h4>{plan.name}</h4>
      </div>
      <p className={styles.price}>{plan.price[selectedPeriod]}</p>
      <p className={styles.description}>{plan.description}</p>
      <CTALink
        className={styles.cta}
        full
        variant={plan.cta.variant}
        href={plan.cta.href}
      >
        {plan.cta.label}
      </CTALink>
    </div>
    <hr />
    <div className={styles.features}>
      <h5>FEATURES</h5>
      {plan.includes && (
        <p>
          Everything in <strong>{plan.includes}</strong> plus...
        </p>
      )}
      <ul>
        {plan.features.map((f, i) => {
          return <li key={i}>{f}</li>;
        })}
      </ul>
    </div>
  </div>
);

const Pricing = ({ ...rest }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabs: Tab[] = [
    {
      id: "monthly",
      label: "Month billing",
      onClick: (tab, i) => setSelectedIndex(i),
    },
    {
      id: "annual",
      label: "Annual billing",
      onClick: (tab, i) => setSelectedIndex(i),
    },
  ] as const;
  const selectedPeriod = tabs[selectedIndex].id as "monthly" | "annual";
  return (
    <div {...rest} className={styles.pricing}>
      <TabSelect variant="pill" tabs={tabs} selectedIndex={selectedIndex} />
      <div className={styles.plans}>
        <div className={styles.normalPlans}>
          {plans.slice(0, -1).map((plan, i) => (
            <PlanCard key={i} plan={plan} selectedPeriod={selectedPeriod} />
          ))}
        </div>
        <div className={styles.specialPlanContainer}>
          <PlanCard
            className={styles.specialPlan}
            plan={plans[plans.length - 1]}
            selectedPeriod={selectedPeriod}
          />
        </div>
      </div>
    </div>
  );
};

export default Pricing;
