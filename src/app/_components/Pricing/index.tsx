"use client";
import { HTMLAttributes, useState } from "react";

import CTALink from "../CTALink";
import PillTabs, { Tab } from "../PillTabs";
import styles from "./styles.module.css";

interface Plan {
  id: string;
  name: string;
  icon: string;
  price: Record<"monthly" | "anual", string>;
  description: string;
  highlight?: boolean;
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
    price: { monthly: "$0", anual: "$0" },
    description: "Free access. Forever",
    cta: {
      label: "Try Now",
      variant: "tertiary",
      href: "#",
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
    price: { monthly: "$200", anual: "$2000" },
    description: "Best for small team",
    cta: {
      label: "Get This Plan",
      variant: "secondary",
      href: "#",
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
    price: { monthly: "$2000", anual: "$20000" },
    description: "Best for growing businesses",
    cta: {
      label: "Get This Plan",
      variant: "secondary",
      href: "#",
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
    price: { monthly: "Custom", anual: "Custom" },
    description: "Best for large organizations",
    highlight: true,
    cta: {
      label: "Contact sales",
      variant: "secondary",
      href: "#",
    },
    includes: "business",
    features: [
      "Access to basic features",
      "Basic reporting and analytics",
      "Up to 10 individual users",
    ],
  },
] as const;

const Pricing = ({ ...rest }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabs: Tab[] = [
    {
      id: "monthly",
      label: "Month billing",
      onClick: (tab, i) => setSelectedIndex(i),
    },
    {
      id: "anual",
      label: "Anual billing",
      onClick: (tab, i) => setSelectedIndex(i),
    },
  ] as const;
  const selectedPeriod = tabs[selectedIndex].id as "monthly" | "anual";
  return (
    <div {...rest} className={styles.container}>
      <PillTabs tabs={tabs} selectedIndex={selectedIndex}></PillTabs>
      <div className={styles.plans}>
        {plans.map((plan, i) => {
          return (
            <div className={styles.plan}>
              <div>
                <img src={plan.icon} />
                <h4>{plan.name}</h4>
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
              <div>
                <h5>FEATURES</h5>
                <ul>
                  {plan.features.map((f, i) => {
                    return <li key={i}>{f}</li>;
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pricing;
