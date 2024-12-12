"use client";
import { cx } from "@/lib/makeCls";
import { mdiClose, mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { useState } from "react";
import styles from "./styles.module.css";

const clsContainer = "container mx-auto px-5";
const clsHeadInner =
  "flex flex-wrap items-center md:justify-between gap-7 flex-col md:flex-row";

interface HeaderProps extends React.HTMLProps<HTMLElement> {
  isHome?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isHome, className, ...rest }) => {
  const [open, setOpen] = useState(false);
  const navLinks: { content: string; href: string; target?: string }[] = [
    { content: "Features", href: "/#features" },
    { content: "Pricing", href: "/#pricing" },
    { content: "Careers", href: "/careers" },
    { content: "Blog", href: "/blog" },
    { content: "Docs", href: "/docs" },
    // { content: 'Blog', href: '/blog' },
    // {
    //   content: <Icon path={mdiGithub} size={1} />,
    //   href: GRAPESJS_REPO,
    //   target: "_blank",
    // },
    // {
    //   content: <span className="text-xl">𝕏</span>,
    //   href: GRAPESJS_X,
    //   target: "_blank",
    // },
  ];

  return (
    <header className={cx(styles.container, isHome && styles.home)} {...rest}>
      <div className={styles.navbar}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <Link
              href="/"
              // className="select-none flex gap-3 items-center"
            >
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
      <div className={cx(styles.drawer, open && styles.open)}>
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
