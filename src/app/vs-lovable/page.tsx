import ComparisonLandingPage from "../_components/comparison/ComparisonLandingPage";
import { ComparisonConfig } from "../_components/comparison/ComparisonLandingPage";

const lovableConfig: ComparisonConfig = {
  competitorName: "Lovable",
  competitorSlug: "lovable",
  hero: {
    title: "Beyond code generation: Build with AI that understands design",
    subtitle: "See why developers choose Grapes Studio over Lovable for production-ready applications"
  },
  cta: {
    title: "Ready to build something amazing?",
    subtitle: "Experience the power of AI-assisted development with complete design control and easy drag-and-drop editing.",
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
      id: "visual-design",
      title: "True Visual Design Control",
      description: "While Lovable generates code you can't easily modify, Grapes Studio gives you real-time visual editing with immediate feedback and complete design flexibility.",
      icon: "🎨",
      imageUrl: "https://cdn.grapesjs.com/workspaces/cmddyhbh105af12ivgiyr7vui/assets/3bef7610-9c82-4d23-9db9-3583477a55a3__desktopretrofit.png",
      imageAlt: "Drag and drop design in Grapes Studio",
      gradient: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
      competitor: {
        label: "Lovable",
        description: "Generated code only"
      },
      grapes: {
        label: "Grapes Studio",
        description: "Visual + code control"
      }
    },
    {
      id: "collaboration",
      title: "Drag and Drop Editing",
      description: "Grapes Studio's drag and drop editing makes it easy to make changes to your website without having to write any code, rather than needing to write code or chat with AI for each change.",
      icon: "👥",
      imageUrl: "/assets/images/email-newsletter-builder-editor.webp",
      imageAlt: "Drag and drop editing in Grapes Studio",
      gradient: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
      competitor: {
        label: "Lovable",
        description: "Code or AI only"
      },
      grapes: {
        label: "Grapes Studio",
        description: "Drag and drop, AI, or code editing"
      }
    },
    {
      id: "customization",
      title: "Better AI Context",
      description: "AI can have limitations, but Grapes Studio allows you to feed in specific context to best inform the AI to edit the website in the most meaningful way.",
      icon: "🔧",
      imageUrl: "/assets/images/codeeditor.png",
      imageAlt: "Custom code with Grapes Studio",
      gradient: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
      competitor: {
        label: "Lovable",
        description: "AI limitations"
      },
      grapes: {
        label: "Grapes Studio",
        description: "Click and drag context"
      }
    },
    {
      id: "production-ready",
      title: "Simple and Scalable",
      description: "Grapes Studio creates simple and scalable websites that don't over complicate the process of building a website, rather than adding more complexity and latency.",
      icon: "🚀",
      imageUrl: "/assets/images/website-builders-comparison.png",
      imageAlt: "Production-ready builder",
      gradient: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
      competitor: {
        label: "Lovable",
        description: "Complex and overcomplicated"
      },
      grapes: {
        label: "Grapes Studio",
        description: "Simple and scalable HTML"
      }
    }
  ]
};

export default function VsLovablePage() {
  return <ComparisonLandingPage config={lovableConfig} />;
}
