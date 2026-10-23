import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grapes Studio AI Pricing",
  description:
    "Compare Grapes Studio AI plans for generating and visually editing websites and emails.",
  alternates: { canonical: "/pricing" },
};

export default function PricingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
