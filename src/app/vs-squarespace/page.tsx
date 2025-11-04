import { Suspense } from "react";
import ComparisonLandingPage from "../_components/comparison/ComparisonLandingPage";
import { ComparisonConfig } from "../_components/comparison/ComparisonLandingPage";

const squarespaceConfig: ComparisonConfig = {
  competitorName: "Squarespace",
  competitorSlug: "squarespace",
  hero: {
    title: "Copy and transfer your Squarespace site with unlimited customization",
    subtitle: "Discover why Squarespace users are switching to Grapes Studio and gaining full code control, unlimited customization, and the freedom to host anywhere"
  },
  cta: {
    title: "Ready to break free from Squarespace?",
    subtitle: "Join thousands of professionals who've upgraded to Grapes Studio for unlimited design freedom and professional results.",
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
      title: "Complete Design Freedom",
      description: "Squarespace locks you into their templates and design constraints. Grapes Studio gives you unlimited creative control with custom CSS, advanced layouts, and pixel-perfect designs.",
      icon: "🎨",
      imageUrl: "https://cdn.grapesjs.com/workspaces/cmddyhbh105af12ivgiyr7vui/assets/3bef7610-9c82-4d23-9db9-3583477a55a3__desktopretrofit.png",
      imageAlt: "Drag and drop design freedom",
      gradient: "bg-gradient-to-br from-purple-500/20 to-indigo-500/20",
      competitor: {
        label: "Squarespace",
        description: "Template limitations"
      },
      grapes: {
        label: "Grapes Studio",
        description: "Unlimited creativity"
      }
    },
    {
      id: "code-access",
      title: "Full Code Access & Export",
      description: "Squarespace keeps your code locked in their platform. Grapes Studio gives you complete code ownership, export capabilities, and the freedom to host anywhere.",
      icon: "💻",
      imageUrl: "/assets/images/codeeditor.png",
      imageAlt: "Full code access and export",
      gradient: "bg-gradient-to-br from-blue-500/20 to-teal-500/20",
      competitor: {
        label: "Squarespace",
        description: "Locked-in platform"
      },
      grapes: {
        label: "Grapes Studio",
        description: "Code ownership"
      }
    },
    {
      id: "performance",
      title: "Superior Performance",
      description: "Squarespace sites often load slowly due to heavy templates and limited optimization. Grapes Studio generates clean, fast-loading code with built-in performance optimization.",
      icon: "⚡",
      imageUrl: "/assets/blog/slow-website/website-builders-comparison.png",
      imageAlt: "Superior performance",
      gradient: "bg-gradient-to-br from-green-500/20 to-lime-500/20",
      competitor: {
        label: "Squarespace",
        description: "Slow loading times"
      },
      grapes: {
        label: "Grapes Studio",
        description: "Lightning-fast performance"
      }
    },
    {
      id: "professional-features",
      title: "Professional Development Tools",
      description: "Squarespace is designed for beginners, limiting advanced functionality. Grapes Studio provides professional tools for agencies, developers, and businesses that need enterprise features.",
      icon: "🛠️",
      imageUrl: "/assets/blog/ai-beta/grapes_wordpress.webp",
      imageAlt: "Professional development tools",
      gradient: "bg-gradient-to-br from-yellow-500/20 to-orange-500/20",
      competitor: {
        label: "Squarespace",
        description: "Basic features only"
      },
      grapes: {
        label: "Grapes Studio",
        description: "Professional tools"
      }
    }
  ]
};

export default function VsSquarespacePage() {
  return (
    <Suspense>
      <ComparisonLandingPage config={squarespaceConfig} />
    </Suspense>
  );
}

