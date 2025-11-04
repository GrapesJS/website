import { Suspense } from "react";
import ComparisonLandingPage from "../_components/comparison/ComparisonLandingPage";
import { ComparisonConfig } from "../_components/comparison/ComparisonLandingPage";

const cargoConfig: ComparisonConfig = {
  competitorName: "Cargo",
  competitorSlug: "cargo",
  hero: {
    title: "Copy and transfer your Cargo site and save money",
    subtitle: "Discover why Cargo users are switching to Grapes Studio and saving money while gaining full code ownership and unlimited design flexibility"
  },
  cta: {
    title: "Ready to upgrade from Cargo?",
    subtitle: "Join thousands of professionals who've switched to Grapes Studio for unlimited design freedom and code ownership.",
    primaryButton: {
      text: "Start Building for Free",
      href: "https://app.grapesjs.com/dashboard"
    },
    secondaryButton: {
      text: "View Pricing",
      href: "/pricing"
    }
  },
  points: [
    {
      id: "design-flexibility",
      title: "True Design Freedom",
      description: "While Cargo offers creative templates, you're still limited by their design system. Grapes Studio gives you complete creative control with custom CSS, advanced layouts, and unlimited design possibilities.",
      icon: "🎨",
      imageUrl: "https://cdn.grapesjs.com/workspaces/cmddyhbh105af12ivgiyr7vui/assets/3bef7610-9c82-4d23-9db9-3583477a55a3__desktopretrofit.png",
      imageAlt: "Drag and drop design freedom",
      gradient: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
      competitor: {
        label: "Cargo",
        description: "Template constraints"
      },
      grapes: {
        label: "Grapes Studio",
        description: "Unlimited creativity"
      }
    },
    {
      id: "code-access",
      title: "Full Code Ownership",
      description: "Cargo keeps your code on their platform. Grapes Studio gives you complete code ownership, full export capabilities, and the freedom to host anywhere you want.",
      icon: "💻",
      imageUrl: "/assets/images/codeeditor.png",
      imageAlt: "Full code access and export",
      gradient: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
      competitor: {
        label: "Cargo",
        description: "Platform lock-in"
      },
      grapes: {
        label: "Grapes Studio",
        description: "Own your code"
      }
    },
    {
      id: "performance",
      title: "Optimized Performance",
      description: "Cargo sites can be slow due to heavy templates. Grapes Studio generates clean, optimized code with built-in performance optimization for lightning-fast load times.",
      icon: "⚡",
      imageUrl: "/assets/blog/slow-website/website-builders-comparison.png",
      imageAlt: "Superior performance",
      gradient: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
      competitor: {
        label: "Cargo",
        description: "Performance limitations"
      },
      grapes: {
        label: "Grapes Studio",
        description: "Lightning-fast performance"
      }
    },
    {
      id: "professional-features",
      title: "Advanced Development Tools",
      description: "Cargo focuses on design templates but lacks advanced development features. Grapes Studio provides professional tools including AI assistance, version control, and enterprise-ready features.",
      icon: "🛠️",
      imageUrl: "/assets/blog/ai-beta/grapes_wordpress.webp",
      imageAlt: "Professional development tools",
      gradient: "bg-gradient-to-br from-yellow-500/20 to-orange-500/20",
      competitor: {
        label: "Cargo",
        description: "Limited features"
      },
      grapes: {
        label: "Grapes Studio",
        description: "Enterprise-ready tools"
      }
    }
  ]
};

export default function VsCargoPage() {
  return (
    <Suspense>
      <ComparisonLandingPage config={cargoConfig} />
    </Suspense>
  );
}

