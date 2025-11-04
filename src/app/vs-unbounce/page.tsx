import { Suspense } from "react";
import ComparisonLandingPage from "../_components/comparison/ComparisonLandingPage";
import { ComparisonConfig } from "../_components/comparison/ComparisonLandingPage";

const unbounceConfig: ComparisonConfig = {
  competitorName: "Unbounce",
  competitorSlug: "unbounce",
  hero: {
    title: "Build high-converting landing pages without Unbounce's limitations",
    subtitle: "Why marketers and developers choose Grapes Studio over Unbounce for landing pages with complete design control"
  },
  cta: {
    title: "Ready to create better landing pages?",
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
      title: "Complete Landing Page Design Control",
      description: "Unbounce limits you to their templates and drag-and-drop elements. Grapes Studio gives you unlimited creative control with custom CSS, advanced layouts, and pixel-perfect landing page designs.",
      icon: "🎨",
      imageUrl: "https://cdn.grapesjs.com/workspaces/cmddyhbh105af12ivgiyr7vui/assets/3bef7610-9c82-4d23-9db9-3583477a55a3__desktopretrofit.png",
      imageAlt: "Drag and drop landing page design",
      gradient: "bg-gradient-to-br from-purple-500/20 to-indigo-500/20",
      competitor: {
        label: "Unbounce",
        description: "Template limitations"
      },
      grapes: {
        label: "Grapes Studio",
        description: "Unlimited design freedom"
      }
    },
    {
      id: "code-access",
      title: "Full Code Ownership & Export",
      description: "Unbounce keeps your landing pages locked in their platform. Grapes Studio gives you complete code ownership, full export capabilities, and the freedom to host your landing pages anywhere.",
      icon: "💻",
      imageUrl: "/assets/images/codeeditor.png",
      imageAlt: "Full code access and export",
      gradient: "bg-gradient-to-br from-blue-500/20 to-teal-500/20",
      competitor: {
        label: "Unbounce",
        description: "Platform lock-in"
      },
      grapes: {
        label: "Grapes Studio",
        description: "Own your code"
      }
    },
    {
      id: "performance",
      title: "Faster Landing Page Performance",
      description: "Unbounce landing pages can load slowly due to heavy scripts and limited optimization. Grapes Studio generates clean, fast-loading code with built-in performance optimization for better conversion rates.",
      icon: "⚡",
      imageUrl: "/assets/blog/slow-website/website-builders-comparison.png",
      imageAlt: "Superior landing page performance",
      gradient: "bg-gradient-to-br from-green-500/20 to-lime-500/20",
      competitor: {
        label: "Unbounce",
        description: "Slow loading times"
      },
      grapes: {
        label: "Grapes Studio",
        description: "Lightning-fast performance"
      }
    },
    {
      id: "cost-effectiveness",
      title: "More Cost-Effective Solution",
      description: "Unbounce charges high monthly fees for landing pages. Grapes Studio offers a more affordable solution with the same professional features, unlimited pages, and no per-page limits.",
      icon: "💰",
      imageUrl: "/assets/blog/ai-beta/grapes_wordpress.webp",
      imageAlt: "Cost-effective landing page builder",
      gradient: "bg-gradient-to-br from-yellow-500/20 to-orange-500/20",
      competitor: {
        label: "Unbounce",
        description: "High monthly costs"
      },
      grapes: {
        label: "Grapes Studio",
        description: "Affordable pricing"
      }
    }
  ]
};

export default function VsUnbouncePage() {
  return (
    <Suspense>
      <ComparisonLandingPage config={unbounceConfig} />
    </Suspense>
  );
}

