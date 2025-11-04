"use client";

import cn from "classnames";
import { useEffect, useRef, useState, FormEvent } from "react";

export interface ComparisonPoint {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  imageUrl?: string;
  imageAlt?: string;
  competitor: {
    label: string;
    description: string;
  };
  grapes: {
    label: string;
    description: string;
  };
}

export interface ComparisonConfig {
  competitorName: string;
  competitorSlug: string;
  hero: {
    title: string;
    subtitle: string;
  };
  cta: {
    title: string;
    subtitle: string;
    primaryButton: {
      text: string;
      href: string;
    };
    secondaryButton: {
      text: string;
      href: string;
    };
  };
  points: ComparisonPoint[];
}

interface ComparisonLandingPageProps {
  config: ComparisonConfig;
  className?: string;
}

export default function ComparisonLandingPage({ config, className }: ComparisonLandingPageProps) {
  return (
    <div className={cn("min-h-screen flex flex-col bg-black text-white", className)}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-black/95 border-b border-gray-700">
        <nav className="px-8 py-4 flex items-center justify-between mx-auto max-lg:px-6 max-sm:px-4">
          <div className="text-2xl leading-8 font-bold tracking-wider">
            <a href="/">
              <img
                src="https://cdn.grapesjs.com/workspaces/cmddyhbh105af12ivgiyr7vui/assets/57483344-a73e-4e1f-abb2-f2df8058ef62__grapesblackandwhite.png"
                alt="Grapes Studio"
                className="w-[233px] h-[63px]"
              />
            </a>
          </div>

          <div className="flex items-center gap-6 flex-1 justify-end mr-8 max-lg:hidden">
            <a
              href="/pricing#comparison-section"
              className="text-gray-100 no-underline font-medium transition-colors duration-200 hover:text-white"
            >
              Features
            </a>
            <a
              href="/pricing#pricing-section"
              className="text-gray-100 no-underline font-medium transition-colors duration-200 hover:text-white"
            >
              Pricing
            </a>
            <a
              href="/blog"
              className="text-gray-100 no-underline font-medium transition-colors duration-200 hover:text-white"
            >
              Blog
            </a>
            <a
              href="/sdk"
              className="text-gray-100 no-underline font-medium transition-colors duration-200 hover:text-white"
            >
              Studio SDK
            </a>
          </div>

          <div className="flex items-center gap-4 md:gap-3 max-sm:gap-2">
            <a
              href="https://github.com/GrapesJS/grapesjs"
              className="flex items-center justify-center mr-4 text-gray-100 max-lg:hidden"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
            >
              <svg
                className="w-[22px] h-[22px] opacity-100"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.11 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.91.08 2.11.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
                />
              </svg>
            </a>
            <a
              href="https://app.grapesjs.com/dashboard"
              className="inline-block px-4 py-2 text-sm font-semibold leading-5 text-gray-100 no-underline bg-purple-600 border border-purple-600 rounded-lg cursor-pointer transition-all duration-200 hover:bg-opacity-90 sm:px-5 sm:py-2 lg:px-6 lg:py-2"
            >
              Get Started
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <div className="relative w-full bg-gradient-to-b from-gray-900 via-black to-black">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
          
          <div className="relative max-w-6xl mx-auto px-8 py-24 md:px-6 max-sm:px-4">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent leading-tight">
                {config.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
                {config.hero.subtitle}
              </p>
              
              <WebsiteCopyForm competitorName={config.competitorName} />
            </div>
          </div>
        </div>

        {/* Comparison Points Section */}
        <div className="max-w-5xl mx-auto px-8 py-20 md:px-6 max-sm:px-4">
          <div className="space-y-20">
            {config.points.map((point, index) => (
              <ComparisonRow
                key={point.id}
                point={point}
                index={index}
                competitorName={config.competitorName}
              />
            ))}
          </div>
        </div>

        {/* Reasons / Feature Matrix Section */}
        <div className="max-w-6xl mx-auto px-8 py-24 md:px-6 max-sm:px-4">
          <div className="text-center mb-12">
            <p className="uppercase tracking-widest text-sm text-emerald-300/80">Features</p>
            <h2 className="mt-2 text-4xl md:text-5xl font-bold text-white">
              Top reasons companies choose us over {config.competitorName}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 items-start">
            {/* Left bullets */}
            <div className="space-y-12">
              {(config.points.slice(0, 2) as ComparisonPoint[]).map((p) => (
                <div key={p.id} className="flex items-start gap-4">
                  <div className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full">
                    <img src="/assets/images/icons/check.svg" alt="check" className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-1">{p.title}</h3>
                    <p className="text-gray-300 leading-relaxed text-base">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right comparison table */}
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/5">
              <div className="grid grid-cols-[1fr_160px_160px] text-left text-sm">
                <div className="py-4 px-5 font-medium text-gray-300 bg-white/5">Capability</div>
                <div className="py-4 px-5 font-semibold text-emerald-300 bg-emerald-500/15 text-center">Grapes Studio</div>
                <div className="py-4 px-5 font-semibold text-gray-300 bg-white/5 text-center">{config.competitorName}</div>

                {(config.points.slice(0, 6) as ComparisonPoint[]).map((p, idx) => (
                  <div key={p.id} className="contents">
                    <div className={cn("py-4 px-5 text-gray-300", idx % 2 === 1 && "bg-white/5")}>{p.title}</div>
                    <div className={cn("py-4 px-5 flex items-center justify-center", idx % 2 === 1 && "bg-white/5")}>
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">✓</span>
                    </div>
                    <div className={cn("py-4 px-5 flex items-center justify-center", idx % 2 === 1 && "bg-white/5")}>
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/5 border border-white/20 text-gray-400">×</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-y border-gray-800">
          <div className="max-w-4xl mx-auto px-8 py-16 text-center md:px-6 max-sm:px-4">
            <h2 className="text-4xl font-bold mb-6 text-white">
              {config.cta.title}
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {config.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={config.cta.primaryButton.href}
                className="inline-block px-8 py-4 text-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors duration-200"
              >
                {config.cta.primaryButton.text}
              </a>
              <a
                href={config.cta.secondaryButton.href}
                className="inline-block px-8 py-4 text-lg font-semibold text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-colors duration-200"
              >
                {config.cta.secondaryButton.text}
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/95 text-gray-100 pt-20 pb-8 border-t border-gray-700 md:pt-16 max-sm:pt-12">
        <div className="mx-auto px-8 text-center max-w-screen-xl md:px-6 max-sm:px-4">
          <div className="grid grid-cols-[1fr_2fr] gap-16 mb-16 max-sm:grid-cols-1 max-sm:gap-12">
            <div className="flex flex-col gap-4 items-center">
              <img
                src="https://cdn.grapesjs.com/workspaces/cmddyhbh105af12ivgiyr7vui/assets/57483344-a73e-4e1f-abb2-f2df8058ef62__grapesblackandwhite.png"
                alt="Grapes Studio"
                className="w-[277px] h-[75px]"
              />
              <div className="text-lg text-gray-300 font-light leading-6 max-sm:text-base">
                The drag-and-drop, open-source, no-code
                visual editor with AI assistance for: emails,
                webpages, and landing pages.
              </div>
              <div className="flex gap-4 mt-2 justify-center">
                <a
                  href="https://x.com/grapesjs"
                  aria-label="X (Twitter)"
                  className="inline-flex items-center justify-center w-10 h-10 bg-white/5 rounded-lg transition-all duration-200 border border-white/10 hover:bg-lime-400/10 hover:border-purple-300 hover:-translate-y-0.5"
                >
                  <img
                    src="https://api.iconify.design/ri:twitter-x-fill.svg?color=%23d1d5db&width=24&height=24"
                    alt="X (Twitter)"
                    loading="lazy"
                    className="w-6 h-6"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/grapes-studio/"
                  aria-label="LinkedIn"
                  className="inline-flex items-center justify-center w-10 h-10 bg-white/5 rounded-lg transition-all duration-200 border border-white/10 hover:bg-lime-400/10 hover:border-purple-300 hover:-translate-y-0.5"
                >
                  <img
                    src="https://api.iconify.design/mdi:linkedin.svg?color=%23d1d5db&width=24&height=24"
                    alt="LinkedIn"
                    loading="lazy"
                    className="w-6 h-6"
                  />
                </a>
                <a
                  href="https://discord.com/invite/QAbgGXq"
                  aria-label="Discord"
                  className="inline-flex items-center justify-center w-10 h-10 bg-white/5 rounded-lg transition-all duration-200 border border-white/10 hover:bg-lime-400/10 hover:border-purple-300 hover:-translate-y-0.5"
                >
                  <img
                    src="https://api.iconify.design/ic:baseline-discord.svg?color=%23d1d5db&width=24&height=24"
                    alt="Discord"
                    loading="lazy"
                    className="w-6 h-6"
                  />
                </a>
                <a
                  href="https://github.com/GrapesJS/grapesjs"
                  aria-label="GitHub"
                  className="inline-flex items-center justify-center w-10 h-10 bg-white/5 rounded-lg transition-all duration-200 border border-white/10 hover:bg-lime-400/10 hover:border-purple-300 hover:-translate-y-0.5"
                >
                  <img
                    src="https://api.iconify.design/mdi:github.svg?color=%23d1d5db&width=24&height=24"
                    alt="GitHub"
                    loading="lazy"
                    className="w-6 h-6"
                  />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-8 md:gap-6 max-sm:grid-cols-1 max-sm:gap-8 max-sm:text-center">
              <div className="flex flex-col max-sm:items-center">
                <h4 className="text-lg font-semibold font-['Noto_Sans_Nag_Mundari',sans-serif] text-white mb-5 md:text-base md:mb-4">
                  Product
                </h4>
                <ul className="list-none p-0 m-0 flex flex-col gap-3">
                  <li>
                    <a
                      href="/pricing#comparison-section"
                      className="text-gray-300 no-underline text-[0.975rem] font-light transition-colors duration-200 inline-block hover:text-gray-300 md:text-[0.925rem]"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="/sdk"
                      className="text-gray-300 no-underline text-[0.975rem] font-light transition-colors duration-200 inline-block hover:text-gray-300 md:text-[0.925rem]"
                    >
                      SDK
                    </a>
                  </li>
                  <li>
                    <a
                      href="/pricing#pricing-section"
                      className="text-gray-300 no-underline text-[0.975rem] font-light transition-colors duration-200 inline-block hover:text-gray-300 md:text-[0.925rem]"
                    >
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col max-sm:items-center">
                <h4 className="text-lg font-semibold font-['Noto_Sans_Nag_Mundari',sans-serif] text-white mb-5 md:text-base md:mb-4">
                  Company
                </h4>
                <ul className="list-none p-0 m-0 flex flex-col gap-3">
                  <li>
                    <a
                      href="/careers"
                      className="text-gray-300 no-underline text-[0.975rem] font-light transition-colors duration-200 inline-block hover:text-gray-300 md:text-[0.925rem]"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:sales@grapesjs.com"
                      className="text-gray-300 no-underline text-[0.975rem] font-light transition-colors duration-200 inline-block hover:text-gray-300 md:text-[0.925rem]"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col max-sm:items-center">
                <h4 className="text-lg font-semibold font-['Noto_Sans_Nag_Mundari',sans-serif] text-white mb-5 md:text-base md:mb-4">
                  Resources
                </h4>
                <ul className="list-none p-0 m-0 flex flex-col gap-3">
                  <li>
                    <a
                      href="/blog"
                      className="text-gray-300 no-underline text-[0.975rem] font-light transition-colors duration-200 inline-block hover:text-gray-300 md:text-[0.925rem]"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://app.grapesjs.com/docs-sdk/overview/getting-started?utm_source=grapesai&utm_medium=docsHeader"
                      className="text-gray-300 no-underline text-[0.975rem] font-light transition-colors duration-200 inline-block hover:text-gray-300 md:text-[0.925rem]"
                    >
                      Studio SDK Docs
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.grapesjs.com/docs/?utm_source=grapesai"
                      className="text-gray-300 no-underline text-[0.975rem] font-light transition-colors duration-200 inline-block hover:text-gray-300 md:text-[0.925rem]"
                    >
                      GrapesJS Docs
                    </a>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col max-sm:items-center">
                <h4 className="text-lg font-semibold font-['Noto_Sans_Nag_Mundari',sans-serif] text-white mb-5 md:text-base md:mb-4">
                  Legal
                </h4>
                <ul className="list-none p-0 m-0 flex flex-col gap-3">
                  <li>
                    <a
                      href="https://app.grapesjs.com/terms"
                      className="text-gray-300 no-underline text-[0.975rem] font-light transition-colors duration-200 inline-block hover:text-gray-300 md:text-[0.925rem]"
                    >
                      Terms
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://app.grapesjs.com/privacy"
                      className="text-gray-300 no-underline text-[0.975rem] font-light transition-colors duration-200 inline-block hover:text-gray-300 md:text-[0.925rem]"
                    >
                      Privacy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center max-sm:pt-6">
            <p className="text-sm text-gray-400 font-light m-0 max-sm:text-xs">
              © 2025 Grapes Studio Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function useInViewOnce<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || inView) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      });
    }, options || { rootMargin: "0px 0px -20% 0px", threshold: 0.2 });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options, inView]);

  return { ref, inView } as const;
}

function ComparisonRow({
  point,
  index,
  competitorName,
}: {
  point: ComparisonPoint;
  index: number;
  competitorName: string;
}) {
  const { ref: imageRef, inView: imageInView } = useInViewOnce<HTMLDivElement>();
  const { ref: textRef, inView: textInView } = useInViewOnce<HTMLDivElement>();

  const isReversed = index % 2 === 1;

  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row items-center gap-12",
        isReversed && "lg:flex-row-reverse"
      )}
    >
      <div
        ref={imageRef}
        className={cn(
          "flex-shrink-0 transition-all duration-700 ease-out",
          imageInView
            ? "opacity-100 translate-x-0"
            : isReversed
            ? "opacity-0 translate-x-12"
            : "opacity-0 -translate-x-12"
        )}
      >
        <div
          className={cn(
            "w-80 h-80 rounded-3xl flex items-center justify-center overflow-hidden",
            point.gradient
          )}
        >
          {point.imageUrl ? (
            <img
              src={point.imageUrl}
              alt={point.imageAlt || point.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="text-8xl">{point.icon}</div>
          )}
        </div>
      </div>

      <div
        ref={textRef}
        className={cn(
          "flex-1 text-center transition-all duration-700 ease-out",
          isReversed ? "lg:text-right" : "lg:text-left",
          textInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <h3 className="text-4xl font-bold mb-6 text-white">{point.title}</h3>
        <p className="text-xl text-gray-300 leading-relaxed mb-8">{point.description}</p>
        <div
          className={cn(
            "flex flex-col sm:flex-row gap-6 justify-center",
            isReversed ? "lg:justify-end" : "lg:justify-start"
          )}
        >
          <div className="bg-red-300/10 border border-red-300/20 rounded-xl p-6">
            <div className="text-red-300/80 font-semibold mb-2 text-lg">{competitorName}</div>
            <div className="text-red-300/70">{point.competitor.description}</div>
          </div>
          <div className="bg-emerald-300/10 border border-emerald-300/20 rounded-xl p-6">
            <div className="text-emerald-300/80 font-semibold mb-2 text-lg">Grapes Studio</div>
            <div className="text-emerald-300/80">{point.grapes.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WebsiteCopyForm({ competitorName }: { competitorName: string }) {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate placeholder and hint text based on competitor name
  const getPlaceholder = () => {
    const competitorLower = competitorName.toLowerCase();
    if (competitorLower === "wordpress") {
      return "https://your-wordpress-site.com";
    } else if (competitorLower === "wix") {
      return "https://your-wix-site.com";
    } else {
      return `https://your-${competitorLower}-site.com`;
    }
  };

  const getHintText = () => {
    const competitorLower = competitorName.toLowerCase();
    if (competitorLower === "wordpress") {
      return `Paste your WordPress site URL and we'll recreate it in minutes`;
    } else if (competitorLower === "wix") {
      return `Paste your Wix site URL and we'll recreate it in minutes`;
    } else {
      return `Paste your ${competitorName} site URL and we'll recreate it in minutes`;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!websiteUrl.trim()) return;

    setIsSubmitting(true);

    // Build the prompt: "Copy this website for me: {url}"
    const prompt = `Copy this website for me: ${websiteUrl.trim()}`;
    
    // Double-encode the prompt for the URL parameter
    const encodedPrompt = encodeURIComponent(encodeURIComponent(prompt));
    
    // Build the redirect URL
    const redirectUrl = `https://app.grapesjs.com/ai-proxy?prompt=${encodedPrompt}&projectType=web`;
    
    // Redirect to the ai-proxy endpoint
    window.location.href = redirectUrl;
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="url"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          placeholder={getPlaceholder()}
          className="flex-1 px-6 py-4 text-lg rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          required
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting || !websiteUrl.trim()}
          className="px-8 py-4 text-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isSubmitting ? "Copying..." : "Copy Website"}
        </button>
      </div>
      <p className="text-sm text-gray-400 mt-4">
        {getHintText()}
      </p>
    </form>
  );
}
