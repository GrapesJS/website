import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import SdkFeatureCard from "./SdkFeatureCard";
import { theme } from "./theme";

export default function SdkLandingFeature({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  children: React.ReactNode;
}) {
  return (
    <SdkFeatureCard
      label={eyebrow}
      title={title}
      description={description}
      links={
        <a
          href={href}
          className={cn(theme.links.base, theme.colors.linkText)}
          data-ph-capture-attribute-placement="sdk-feature"
          data-ph-capture-attribute-feature={eyebrow
            .toLowerCase()
            .replaceAll(" ", "-")}
        >
          {linkLabel} <ArrowRight size={15} aria-hidden />
        </a>
      }
    >
      {children}
    </SdkFeatureCard>
  );
}
