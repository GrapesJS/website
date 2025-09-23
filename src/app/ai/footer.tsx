"use client";

import cn from "classnames";

interface FooterStandaloneProps {
  className?: string;
}

export default function FooterStandalone({ className }: FooterStandaloneProps) {
  return (
    <footer
      className={cn(
        "bg-black/95 text-gray-100 pt-20 pb-8 border-t border-gray-700 md:pt-16 max-sm:pt-12",
        className
      )}
    >
      <div className="mx-auto px-8 text-center max-w-screen-xl md:px-6 max-sm:px-4">
        <div className="grid grid-cols-[1fr_2fr] gap-16 mb-16 max-sm:grid-cols-1 max-sm:gap-12">
          <div className="flex flex-col gap-4 items-center">
            <img
              src="https://cdn.grapesjs.com/workspaces/cmddyhbh105af12ivgiyr7vui/assets/57483344-a73e-4e1f-abb2-f2df8058ef62__grapesblackandwhite.png"
              alt="Grapes Studio"
              className="w-[277px] h-[75px]"
            />
            <div className="text-lg text-gray-300 font-light leading-6 max-sm:text-base">
              The embeddable drag-and-drop builder. The open-source,
              customizable, white-label, no-code, visual editor for: emails,
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
  );
}
