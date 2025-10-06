import ComparisonLandingPage from "../_components/comparison/ComparisonLandingPage";
import { ComparisonConfig } from "../_components/comparison/ComparisonLandingPage";

const wordpressConfig: ComparisonConfig = {
  competitorName: "WordPress",
  competitorSlug: "wordpress",
  hero: {
    title: "A modern, scalable WordPress alternative",
    subtitle: "Discover why leading agencies and organizations are switching from WordPress to Grapes Studio"
  },
  cta: {
    title: "Ready to make the switch?",
    subtitle: "Join thousands of developers, designers, and agencies who have already made the switch to Grapes Studio.",
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
      id: "development-speed",
      title: "10x Faster Development",
      description: "While WordPress requires plugins, themes, and complex setup, Grapes Studio delivers production-ready websites in minutes with our AI-powered visual editor and drag-and-drop interface.",
      icon: "🚀",
      imageUrl: "/assets/blog/ai-beta/grapes_wordpress.webp",
      imageAlt: "Drag and drop website builder",
      gradient: "bg-gradient-to-br from-purple-500/20 to-blue-500/20",
      competitor: {
        label: "WordPress",
        description: "Hours to days setup"
      },
      grapes: {
        label: "Grapes Studio",
        description: "Minutes to launch"
      }
    },
    {
      id: "code-ownership",
      title: "Full Code Ownership & Export",
      description: "In Grapes Studio you can easily edit the generated code and export it anywhere. WordPress locks you into its theme and plugin ecosystem, making custom code ownership and portability difficult.",
      icon: "💻",
      imageUrl: "/assets/images/codeeditor.png",
      imageAlt: "Own and export your code",
      gradient: "bg-gradient-to-br from-blue-500/20 to-teal-500/20",
      competitor: {
        label: "WordPress",
        description: "Vendor lock-in"
      },
      grapes: {
        label: "Grapes Studio",
        description: "Own your code, export anywhere"
      }
    },
    {
      id: "performance",
      title: "Lightning-Fast Performance",
      description: "WordPress sites often load slowly due to bloated themes and plugins. Grapes Studio generates clean, optimized code with 99.9% uptime and global CDN delivery.",
      icon: "⚡",
      imageUrl: "/assets/blog/slow-website/website-builders-comparison.png",
      imageAlt: "Lightning fast performance",
      gradient: "bg-gradient-to-br from-green-500/20 to-yellow-500/20",
      competitor: {
        label: "WordPress",
        description: "3-5 second load times"
      },
      grapes: {
        label: "Grapes Studio",
        description: "Sub-second load times"
      }
    },
    {
      id: "design-freedom",
      title: "No-Code Design Freedom",
      description: "WordPress limits you to pre-made themes and complex custom development. Grapes Studio gives you complete design control with AI assistance and real-time collaboration.",
      icon: "🎨",
      imageUrl: "https://cdn.grapesjs.com/workspaces/cmddyhbh105af12ivgiyr7vui/assets/3bef7610-9c82-4d23-9db9-3583477a55a3__desktopretrofit.png",
      imageAlt: "Design freedom",
      gradient: "bg-gradient-to-br from-yellow-500/20 to-purple-500/20",
      competitor: {
        label: "WordPress",
        description: "Theme limitations"
      },
      grapes: {
        label: "Grapes Studio",
        description: "Unlimited creativity"
      }
    }
  ]
};

export default function VsWordPressPage() {
  return <ComparisonLandingPage config={wordpressConfig} />;
}
