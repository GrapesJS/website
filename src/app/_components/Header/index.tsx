"use client";
import urls from "@/lib/urls";
import { mdiClose, mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import cn from "classnames";
import Link from "next/link";
import { useState } from "react";
import styles from "./styles.module.css";
import { getCtaClassName } from "../CTALink";
import Logo from "../Logo";

interface HeaderProps extends React.HTMLProps<HTMLElement> {
  isHome?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isHome, className, ...rest }) => {
  const [open, setOpen] = useState(false);
  const navLinks = [
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
      className: "rounded-full border-2 !px-4",
      href: urls.getSignInUrl({ ref: "mainTopNav" }),
      target: "_blank",
    },
    {
      content: "Contact Us",
      className: getCtaClassName({ variant: "primary", className: "!px-4" }),
      href: urls.getContactUsUrl(),
      target: "_blank",
    },
  ];

  return (
    <header className={cn(styles.container, isHome && styles.home)} {...rest}>
      <div className={styles.navbar}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <Link href={urls.getHomeUrl()}>
              <Logo />
            </Link>
          </div>
          <nav className={styles.links}>
            {navLinks.map(({ href, target, content, className }) => (
              <Link
                className={cn(styles.link, className)}
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
            aria-label="Toggle menu"
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
          {navLinks.map(({ href, target, content, className }) => (
            <Link
              className={cn(styles.link, className)}
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
