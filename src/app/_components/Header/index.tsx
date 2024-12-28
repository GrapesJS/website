"use client";
import urls from "@/lib/urls";
import { mdiClose, mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import cn from "classnames";
import Link from "next/link";
import { useState } from "react";
import styles from "./styles.module.css";
import CTALink from "../CTALink";

interface HeaderProps extends React.HTMLProps<HTMLElement> {
  isHome?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isHome, className, ...rest }) => {
  const [open, setOpen] = useState(false);
  const navLinks: { content: string; href: string; target?: string }[] = [
    { content: "Features", href: urls.getFeaturesUrl() },
    { content: "Pricing", href: urls.getPricingUrl() },
    { content: "Careers", href: urls.getCareersUrl() },
    { content: "Blog", href: urls.getBlogUrl() },
    {
      content: "Docs",
      href: urls.getGettingStartedDocsUrl(),
      target: "_blank",
    },
    { content: "Sign In", href: urls.getSdkDashboardUrl("free") },
  ];

  return (
    <header className={cn(styles.container, isHome && styles.home)} {...rest}>
      <div className={styles.navbar}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <Link href={urls.getHomeUrl()}>
              <img
                className="h-[40px]"
                src="/assets/images/logos/grapesjs-logo-combination-white.svg"
              />
            </Link>
          </div>
          <nav className={styles.links}>
            {navLinks.map(({ href, target, content }) => (
              <Link
                className={styles.link}
                href={href}
                target={target}
                key={href}
              >
                {content}
              </Link>
            ))}
          </nav>
          <button
            className={styles.drawerButton}
            onClick={() => setOpen((open) => !open)}
          >
            {open ? (
              <Icon path={mdiClose} size={1} />
            ) : (
              <Icon path={mdiMenu} size={1} />
            )}
          </button>
        </div>
      </div>
      <div className={cn(styles.drawer, open && styles.open)}>
        <nav className={styles.links}>
          {navLinks.map(({ href, target, content }) => (
            <Link
              className={styles.link}
              href={href}
              target={target}
              key={href}
              onClick={() => {
                setOpen(false);
              }}
            >
              {content}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
