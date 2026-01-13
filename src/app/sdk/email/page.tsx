"use client";

import cn from "classnames";
import HeaderStandalone from "../../ai/header";
import FooterStandalone from "../../ai/footer";
import urls from "@/lib/urls";

const clsFullWhite = "!brightness-0 !invert";
const clsSmallLogo = "!h-[40px]";

const customers = [
  {
    src: "/assets/images/external-logos/bytedance.png",
    alt: "ByteDance",
    className: cn(clsFullWhite, clsSmallLogo),
  },
  {
    src: "/assets/images/external-logos/microsoft.png",
    alt: "Microsoft",
    className: clsFullWhite,
  },
  {
    src: "/assets/images/external-logos/gainsight.png",
    alt: "Gainsight",
    className: cn(clsFullWhite, clsSmallLogo),
  },
  {
    src: "/assets/images/external-logos/bbc.png",
    alt: "BBC",
    className: clsFullWhite,
  },
  {
    src: "/assets/images/external-logos/braze.png",
    alt: "Braze",
    className: clsFullWhite,
  },
  {
    src: "/assets/images/external-logos/phresia.png",
    alt: "Phresia",
    className: clsFullWhite,
  },
];

const benefits = [
  {
    title: "Security First",
    description: "Keep all email data in-house. No third-party database access. No vendor lock-in. Complete control over sensitive information.",
    details: [
      "Self-hosted data and assets",
      "No external service dependencies",
      "Compliance-ready architecture",
      "Zero vendor security risks"
    ]
  },
  {
    title: "Unlimited Scalability",
    description: "Front-end architecture means no backend bottlenecks. Scale to millions of users without infrastructure constraints.",
    details: [
      "Client-side processing",
      "Horizontal scaling built-in",
      "No email service provider limits",
      "Global performance"
    ]
  },
  {
    title: "Complete Flexibility",
    description: "GrapesJS is a framework, not a platform. Customize every aspect to match your brand and workflows.",
    details: [
      "Full UI customization",
      "Custom components and plugins",
      "Framework API access",
      "Integrate with any backend"
    ]
  }
];

const problems = [
  {
    title: "Vendor Lock-In",
    description: "Traditional email platforms like Mailchimp, Klaviyo, and Constant Contact require you to store all your email content, customer data, and templates on their servers. This creates dependency and limits your flexibility."
  },
  {
    title: "Data Security Risks",
    description: "Sending sensitive email content through third-party services means your data passes through external infrastructure. This raises compliance concerns and security risks."
  },
  {
    title: "Limited Customization",
    description: "Closed platforms force you into their UI, workflows, and limitations. You can't fully customize the experience to match your brand or integrate with your existing systems."
  },
  {
    title: "Scaling Constraints",
    description: "Third-party email services have usage limits, API rate limits, and infrastructure constraints that can limit your growth and increase costs as you scale."
  }
];

export default function EmailSDKPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <HeaderStandalone />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-8 max-sm:px-4 bg-gradient-to-b from-black via-black to-gray-900">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Build Secure Email Editors
              <br />
              <span className="text-violet-400">Without Vendor Lock-In</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 font-light mb-8 max-w-3xl mx-auto">
              Keep your email data in-house. Scale without limits. Customize everything. 
              The Grapes Studio SDK gives you enterprise-grade email editing without sharing sensitive data with third parties.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <a
                href={urls.getSdkLicensesUrl({ ref: "emailHeroCta" })}
                className="inline-block px-8 py-4 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition-colors duration-200 text-lg"
              >
                Get Started for Free
              </a>
              <a
                href={urls.getGettingStartedDocsUrl()}
                className="inline-block px-8 py-4 border-2 border-gray-600 text-gray-100 font-semibold rounded-lg hover:border-gray-500 hover:bg-gray-900 transition-colors duration-200 text-lg"
              >
                View Documentation
              </a>
            </div>
            <div className="mt-16 max-w-6xl mx-auto">
              <img
                src="/assets/images/newsletterplain.webp"
                alt="Grapes Studio SDK Email Editor"
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
                  className="flex items-center justify-center h-12 md:h-16 opacity-70 hover:opacity-100 transition-opacity"
                >
                  <img
                    src={src}
                    alt={alt}
                    onError={(e) => {
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

        {/* Use Case Section */}
        <section className="py-20 px-8 max-sm:px-4 bg-black">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Trusted by Enterprise Leaders
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Companies like ByteDance use the Studio SDK 
                for internal email creation to maintain complete control over their data.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-2xl p-8 md:p-12 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-4">
                ByteDance: Internal Email Creation Without Compromise
              </h3>
              <p className="text-gray-300 leading-relaxed">
                ByteDance chose the Grapes Studio SDK for their internal email creation workflow 
                because it allows them to keep sensitive data completely in-house. Instead of routing 
                email content through third-party services that require database access, their teams 
                can create professional emails directly within their own infrastructure. They handle 
                email delivery through their own backend systems, maintaining full control over the 
                entire email pipeline while avoiding the security risks that come with third-party integrations.
              </p>
            </div>
          </div>
        </section>

        {/* Problems Section */}
        <section className="py-20 px-8 max-sm:px-4 bg-gray-900/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                The Problem with Traditional Email Platforms
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Mailchimp, Klaviyo, and other email service providers require you to share 
                your data and lock you into their ecosystem.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {problems.map((problem, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <h3 className="text-xl font-bold text-white mb-3">
                    {problem.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-8 max-sm:px-4 bg-black">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Why Choose the Studio SDK for Email?
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Three core benefits that make the SDK ideal for enterprise email creation
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-xl p-8 border border-gray-800"
                >
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {benefit.description}
                  </p>
                  <ul className="space-y-2">
                    {benefit.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2 text-gray-400">
                        <span className="text-violet-400 mt-1">✓</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-8 max-sm:px-4 bg-gray-900/30">
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
                  Embed the SDK
                </h3>
                <p className="text-gray-400">
                  Integrate the Studio SDK into your application. It runs entirely on the front-end, 
                  so all email creation happens in your users' browsers.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-violet-600 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Customize & Brand
                </h3>
                <p className="text-gray-400">
                  Customize the editor UI to match your brand. Add custom components, integrate with 
                  your data sources, and configure workflows.
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
                  Export email HTML/MJML and send through your own backend. No third-party services. 
                  Complete control over delivery and data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-20 px-8 max-sm:px-4 bg-black">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
              Studio SDK vs. Traditional Email Platforms
            </h2>
            <div className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800">
              <div className="grid grid-cols-3 gap-4 p-6 bg-gray-800/50 border-b border-gray-700">
                <div className="font-semibold text-gray-300">Feature</div>
                <div className="font-semibold text-gray-300 text-center">Mailchimp/Klaviyo</div>
                <div className="font-semibold text-violet-400 text-center">Studio SDK</div>
              </div>
              {[
                { feature: "Data Storage", traditional: "On vendor servers", sdk: "Your infrastructure" },
                { feature: "Database Access", traditional: "Required by vendor", sdk: "Not required" },
                { feature: "Vendor Lock-In", traditional: "Yes", sdk: "No" },
                { feature: "Customization", traditional: "Limited", sdk: "Complete" },
                { feature: "Scaling Limits", traditional: "Usage-based limits", sdk: "Unlimited" },
                { feature: "Backend Control", traditional: "Vendor-managed", sdk: "Your control" },
                { feature: "Compliance", traditional: "Vendor-dependent", sdk: "Your control" },
                { feature: "Cost at Scale", traditional: "Increases with usage", sdk: "Fixed infrastructure" },
              ].map((row, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 p-6 border-b border-gray-800 last:border-b-0">
                  <div className="text-gray-300">{row.feature}</div>
                  <div className="text-gray-500 text-center">{row.traditional}</div>
                  <div className="text-violet-400 text-center font-medium">{row.sdk}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-8 max-sm:px-4 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Build Secure Email Editors?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join companies like ByteDance and Microsoft who trust the Studio SDK 
              for enterprise-grade email creation without vendor lock-in.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={urls.getSdkLicensesUrl({ ref: "emailCta" })}
                className="inline-block px-8 py-4 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition-colors duration-200 text-lg"
              >
                Get Started for Free
              </a>
              <a
                href={urls.getContactUsUrl()}
                className="inline-block px-8 py-4 border-2 border-gray-600 text-gray-100 font-semibold rounded-lg hover:border-gray-500 hover:bg-gray-900 transition-colors duration-200 text-lg"
              >
                Contact Sales
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              No credit card required. Start building today.
            </p>
          </div>
        </section>
      </main>
      <FooterStandalone />
    </div>
  );
}

