"use client";
import urls from "@/lib/urls";
import { mdiChevronDown, mdiClose, mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import cn from "classnames";
import Link from "next/link";
import { forwardRef, useState } from "react";
import styles from "./styles.module.css";
import { getCtaClassName } from "../CTALink";
import Logo from "../Logo";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface HeaderProps extends React.HTMLProps<HTMLElement> {
  isHome?: boolean;
}

const ref = "mainTopNav";

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
      content: "Free Tools",
      items: [
        {
          content: "HTML/Website Builder",
          description:
            "Easily design and export your website with the free page builder.",
          target: "_blank",
          href: urls.getStudioDemoWeb({ ref }),
        },
        {
          content: "Email/Newsletter Builder",
          description:
            "Create and customize newsletters with the free email builder.",
          target: "_blank",
          href: urls.getStudioDemoEmail({ ref }),
        },
      ],
    },
    {
      content: "Sign In",
      className: "border-2 !px-4",
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

  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
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

          <NavigationMenu>
            <NavigationMenuList className={styles.links}>
              {navLinks.map(({ href, target, content, className, items }) => (
                <NavigationMenuItem key={href || content}>
                  {items ? (
                    <>
                      <NavigationMenuTrigger className={cn(styles.link)}>
                        {content}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className={styles.navListLayer}>
                        <ul className={cn("grid w-[400px] gap-2 p-4")}>
                          {items.map((item) => (
                            <ListItem
                              key={item.href}
                              title={item.content}
                              href={item.href}
                              target={item.target}
                              className={cn(className)}
                            >
                              {item.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={href!} target={target} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(styles.link, className)}
                      >
                        {content}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
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
              href={href! || "#"}
              target={target}
              key={href || content}
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

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, target, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          target={target}
          className={cn(
            "block select-none hover:bg-white/5 space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            className
          )}
          {...props}
        >
          <div className="font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-xs opacity-80 leading-snug text-gray-400">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
