"use client";

import cn from "classnames";
import HeaderStandalone from "../header";
import FooterStandalone from "../footer";

const clsFullWhite = "!brightness-0 !invert";

// Customer logos - Note: TikTok and Gainsight logos need to be added to /public/assets/images/external-logos/
const customers = [
  {
    src: "/assets/images/external-logos/bytedance.png", // TODO: Add TikTok logo
    alt: "TikTok",
    className: "",
  },
  {
    src: "/assets/images/external-logos/microsoft.png",
    alt: "Microsoft",
  },
  {
    src: "/assets/images/external-logos/gainsight.png", // TODO: Add Gainsight logo
    alt: "Gainsight",
    className: "",
  },
  {
    src: "/assets/images/external-logos/braze.png",
    alt: "Braze",
  },
  {
    src: "/assets/images/external-logos/pfizer.png",
    alt: "Pfizer",
  },
  {
    src: "/assets/images/external-logos/bbc.png",
    alt: "BBC",
    className: clsFullWhite,
  },
  {
    src: "/assets/images/external-logos/deloitte.png",
    alt: "Deloitte",
    className: cn(clsFullWhite, "!h-[25px]"),
  },
];

// Integration platforms
const integrations = [
  {
    name: "Mailchimp",
    logo: "/assets/images/external-logos/mailchimp.svg", // Placeholder path
    status: "available",
    description: "Send your design directly to Mailchimp campaigns with one click.",
    link: "/",
  },
  {
    name: "Constant Contact",
    logo: "/assets/images/external-logos/constantcontact.svg", // Placeholder path
    status: "coming-soon",
    description: "Export directly to Constant Contact campaigns. Coming soon.",
    link: "#",
  },
  {
    name: "Klaviyo",
    logo: "/assets/images/external-logos/klaviyo.svg", // Placeholder path
    status: "coming-soon",
    description: "Push your designs to Klaviyo campaigns. Coming soon.",
    link: "#",
  },
  {
    name: "Gmail",
    logo: "/assets/images/external-logos/gmail.svg", // Placeholder path
    status: "coming-soon",
    description: "Create and send beautiful emails using Gmail. Coming soon.",
    link: "#",
  },
  {
    name: "Outlook",
    logo: "/assets/images/external-logos/outlook.webp", // Placeholder path
    status: "coming-soon",
    description: "Design emails for Outlook Web. Coming soon.",
    link: "#",
  },
  {
    name: "Campaign Monitor",
    logo: "/assets/images/external-logos/campaignmonitor.svg", // Placeholder path
    status: "coming-soon",
    description: "Export to Campaign Monitor. Coming soon.",
    link: "#",
  },
  {
    name: "ActiveCampaign",
    logo: "/assets/images/external-logos/activecampaign.svg", // Placeholder path
    status: "coming-soon",
    description: "Integrate with ActiveCampaign for advanced email marketing. Coming soon.",
    link: "#",
  },
  {
    name: "Hubspot",
    logo: "/assets/images/external-logos/hubspot.svg", // Placeholder path
    status: "coming-soon",
    description: "Connect with Hubspot platform. Coming soon.",
    link: "#",
  },
  {
    name: "Brevo",
    logo: "/assets/images/external-logos/brevo.svg", // Placeholder path
    status: "coming-soon",
    description: "Export to Brevo. Coming soon.",
    link: "#",
  },
  {
    name: "SendGrid",
    logo: "/assets/images/external-logos/sendgrid.svg", // Placeholder path
    status: "coming-soon",
    description: "Send emails through Send Grid. Coming soon.",
    link: "#",
  },
];

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <HeaderStandalone showIntegrations={true} />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-8 max-sm:px-4 bg-gradient-to-b from-black via-black to-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Design once. Send anywhere.
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 font-light mb-12">
              Create beautiful emails with AI, then push them directly to Mailchimp, Klaviyo, or export the code. No copy-paste, no headaches.
            </h2>
            <div className="mt-12 max-w-6xl mx-auto">
              <img
                src="/assets/images/newsletterplain.webp"
                alt="Grapes Studio Email Builder"
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Customer Banner */}
        <section className="py-16 px-8 max-sm:px-4 bg-gray-900/50 border-y border-gray-700">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-2">
                POWERING SOLUTIONS FOR
              </h2>
              <hr className="w-24 h-0.5 bg-violet-500 mx-auto" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {customers.map(({ src, alt, className }) => (
                <div
                  key={alt}
                  className="flex items-center justify-center h-12 md:h-16 opacity-70 hover:opacity-100 transition-opacity grayscale"
                >
                  <img
                    src={src}
                    alt={alt}
                    onError={(e) => {
                      // Fallback if logo doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="text-gray-400 text-sm font-semibold">${alt}</div>`;
                      }
                    }}
                    className={cn("max-h-full max-w-[120px] object-contain", className)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-8 max-sm:px-4 bg-black">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-violet-600 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Create Your Design
                </h3>
                <p className="text-gray-400">
                  Use AI to generate beautiful email templates or design from scratch with our drag-and-drop editor.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-violet-600 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Choose Your Platform
                </h3>
                <p className="text-gray-400">
                  Select your email service provider or CRM from our list of integrations.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-violet-600 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Export & Send
                </h3>
                <p className="text-gray-400">
                  Push your design directly to your platform with one click and start sending. Or export the code directly for maximum flexibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Integrations Grid */}
        <section className="py-20 px-8 max-sm:px-4 bg-gray-900/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
              Email Platforms
            </h2>
            <p className="text-xl text-gray-400 text-center mb-16">
              Create and send beautiful emails using your favorite email platforms.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {integrations.map((integration) => (
                <div
                  key={integration.name}
                  className={cn(
                    "bg-white rounded-lg p-6 flex flex-col items-center justify-between",
                    "hover:shadow-xl transition-all duration-200",
                    "min-h-[220px]",
                    integration.status === "coming-soon" && "opacity-60"
                  )}
                >
                  <div className="flex-1 flex flex-col items-center justify-center mb-4 w-full">
                    {/* Logo image */}
                    <div className="w-20 h-20 mb-4 flex items-center justify-center">
                      <img
                        src={integration.logo}
                        alt={integration.name}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          // Fallback if logo doesn't exist - show initials
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<div class="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center"><span class="text-gray-500 text-xs font-bold">${integration.name.slice(0, 2).toUpperCase()}</span></div>`;
                          }
                        }}
                      />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 text-center mb-3">
                      {integration.name}
                    </h3>
                  </div>
                  {integration.status === "available" ? (
                    <a
                      href={integration.link}
                      className="text-violet-600 font-medium text-sm hover:text-violet-700 transition-colors"
                    >
                      Try now &gt;
                    </a>
                  ) : (
                    <span className="text-gray-400 font-medium text-sm">
                      Coming soon
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-8 max-sm:px-4 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Start creating beautiful emails with AI and export them to your favorite platform.
            </p>
            <a
              href="/?projectType=email"
              className="inline-block px-8 py-4 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition-colors duration-200"
            >
              Try It Now
            </a>
          </div>
        </section>
      </main>
      <FooterStandalone />
    </div>
  );
}

