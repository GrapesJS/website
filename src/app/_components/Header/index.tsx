import urls from "@/lib/urls";
import cn from "classnames";
import { WandSparkles } from "lucide-react";
import Link from "next/link";
import { getCtaClassName } from "../CTALink";
import Logo from "../Logo";
import MobileMenu, { type HeaderNavLink } from "./MobileMenu";
import styles from "./styles.module.css";

interface HeaderProps extends React.HTMLProps<HTMLElement> {
  isHome?: boolean;
}

const ref = "mainTopNav";
const urlProps = { ref };

const navLinks: HeaderNavLink[] = [
  {
    content: "Studio AI",
    href: urls.getAiPageUrl(),
    leadingIcon: <WandSparkles className="h-4 w-4" />,
  },
  { content: "Features", href: urls.getFeaturesUrl() },
  { content: "Pricing", href: urls.getPricingUrl() },
  { content: "Blog", href: urls.getBlogUrl() },
  {
    content: "Docs",
    href: urls.getGettingStartedDocsUrl(),
    target: "_blank",
  },
  {
    content: "Sign In",
    className: "border-2 !px-4",
    href: urls.getSignInUrl(urlProps),
    target: "_blank",
  },
  {
    content: "Contact Us",
    className: getCtaClassName({ variant: "primary" }),
    href: urls.getContactUsUrl(),
    isCta: true,
    target: "_blank",
  },
];

const Header: React.FC<HeaderProps> = ({ isHome, className, ...rest }) => {
  return (
    <>
      <div className="w-full border-b border-white/15 bg-gradient-to-r from-[#7b2d8e] via-[#973aa8] to-[#7b2d8e] text-white">
        <div className="mx-auto flex w-full max-w-[1150px] items-center justify-center gap-2 px-4 py-2.5 text-[12px] font-medium leading-5 sm:px-5 sm:text-sm">
          <span className="truncate">
            ✨ <b>AI Chat Plugin is here!</b> Build AI agents that edit your
            projects.
          </span>
          <a
            href="https://app.grapesjs.com/docs-sdk/plugins/ai/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 font-semibold text-purple-200 transition-colors hover:text-white"
          >
            View Docs -&gt;
          </a>
        </div>
      </div>

      <header className={cn(styles.container)} {...rest}>
        <div className={styles.navbar}>
          <div className={styles.content}>
            <div className={cn(styles.logo, "z-10")}>
              <Link href={urls.getHomeUrl()}>
                <Logo />
              </Link>
            </div>

            <div className={styles.desktopNav}>
              <nav
                aria-label="Main"
                className={cn(styles.desktopLinks, "pointer-events-auto")}
              >
                {navLinks.map(
                  ({
                    href,
                    target,
                    content,
                    className: linkClass,
                    leadingIcon,
                    isCta,
                  }) => (
                    <a
                      key={href}
                      href={href}
                      target={target}
                      rel={
                        target === "_blank" ? "noopener noreferrer" : undefined
                      }
                      className={cn(
                        styles.link,
                        isCta && styles.ctaLinkOverride,
                        linkClass,
                      )}
                    >
                      {leadingIcon ? (
                        <span className="inline-flex items-center gap-2">
                          {leadingIcon}
                          <span>{content}</span>
                        </span>
                      ) : (
                        content
                      )}
                    </a>
                  ),
                )}
              </nav>
            </div>
            <MobileMenu isHome={isHome} links={navLinks} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
