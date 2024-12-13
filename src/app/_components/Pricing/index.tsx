"use client";
import { HTMLAttributes, useState } from "react";

import { cx } from "@/lib/makeCls";
import { getEnterpriseContactFormUrl, getSdkDashboardUrl } from "@/lib/urls";
import CTALink from "../CTALink";
import PillTabs, { Tab } from "../PillTabs";
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
      href: getSdkDashboardUrl("free"),
    },
    features: [
      "Access to basic features",
      "Basic reporting and analytics",
      "Up to 1 individual users",
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
      href: getSdkDashboardUrl("startup"),
    },
    includes: "free",
    features: [
      "Access to basic features",
      "Basic reporting and analytics",
      "Up to 10 individual users",
    ],
  },
  {
    id: "business",
    name: "Business plan",
    icon: "/assets/images/plans/business.png",
    price: { monthly: "$2000", annual: "$20000" },
    description: "Best for growing businesses",
    cta: {
      label: "Get This Plan",
      variant: "secondary",
      href: getSdkDashboardUrl("business"),
    },
    includes: "startup",
    features: [
      "Access to basic features",
      "Basic reporting and analytics",
      "Up to 10 individual users",
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
      href: getEnterpriseContactFormUrl(),
    },
    includes: "business",
    features: [
      "Access to basic features",
      "Basic reporting and analytics",
      "Up to 10 individual users",
      "Access to basic features",
      "Basic reporting and analytics",
      "Up to 10 individual users",
      "Access to basic features",
      "Basic reporting and analytics",
      "Up to 10 individual users",
      "Access to basic features",
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
  <div className={cx(styles.plan, className)}>
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
      <PillTabs tabs={tabs} selectedIndex={selectedIndex}></PillTabs>
      <div className={styles.plans}>
        <div className={styles.normalPlans}>
          {plans.slice(0, -1).map((plan, i) => (
            <PlanCard key={i} plan={plan} selectedPeriod={selectedPeriod} />
          ))}
        </div>
        <PlanCard
          className={styles.specialPlan}
          plan={plans[plans.length - 1]}
          selectedPeriod={selectedPeriod}
        />
      </div>
    </div>
  );
};

export default Pricing;
