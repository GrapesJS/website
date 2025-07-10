"use client";
import urls from "@/lib/urls";
import { mdiClose, mdiMenu, mdiWeb, mdiEmailOutline } from "@mdi/js";
import Icon from "@mdi/react";
import cn from "classnames";
import Link from "next/link";
import { forwardRef, useState } from "react";
import { getCtaClassName } from "../CTALink";
import Logo from "../Logo";
import styles from "./styles.module.css";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface HeaderProps extends React.HTMLProps<HTMLElement> {
  isHome?: boolean;
}

const ref = "mainTopNav";
const urlProps = { ref };

const Header: React.FC<HeaderProps> = ({ isHome, className, ...rest }) => {
  const [open, setOpen] = useState(false);
  return (
    <header className={cn(styles.container, isHome && styles.home)} {...rest}>
      <div className={styles.navbar}>
        <div className={styles.content}>
          <div className={cn(styles.logo, "z-10")}>
            <Link href={urls.getHomeUrl()}>
              <Logo />
            </Link>
          </div>
          <MainNav />
          <button
            className={cn(styles.drawerButton, "z-10")}
            aria-label="Toggle menu"
            onClick={() => setOpen((open) => !open)}
          >
            <Icon path={open ? mdiClose : mdiMenu} size={1} />
          </button>
        </div>
      </div>
      <div className={cn(styles.drawer, open && styles.open)}>
        <MainNav onLinkClick={() => setOpen(false)} isVertical />
      </div>
    </header>
  );
};

export default Header;

function MainNav({
  isVertical,
  onLinkClick,
}: {
  isVertical?: boolean;
  onLinkClick?: () => void;
}) {
  const navLinks = [
    { content: "Features", href: urls.getFeaturesUrl() },
    { content: "Pricing", href: urls.getPricingUrl() },
    { content: "Embed", href: urls.getSDKHomeUrl() },
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
          content: "Studio Website Builder",
          icon: "M4.616 19q-.691 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h14.77q.69 0 1.152.463T21 6.616v10.769q0 .69-.463 1.153T19.385 19zm0-1H15v-3.884H4v3.269q0 .23.192.423t.423.192M16 18h3.385q.23 0 .423-.192t.192-.424V9.231h-4zM4 13.116h11V9.23H4z",
          description:
            "Design and export your websites with the free page builder.",
          target: "_blank",
          href: urls.getStudioDemoWeb(urlProps),
        },
        {
          content: "Studio Newsletter Builder",
          icon: "M4.616 19q-.691 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h14.77q.69 0 1.152.463T21 6.616v10.769q0 .69-.463 1.153T19.385 19zM12 12.116L4 6.885v10.5q0 .269.173.442t.443.173h14.769q.269 0 .442-.173t.173-.443v-10.5zM12 11l7.692-5H4.308zM4 6.885V6v11.385q0 .269.173.442t.443.173H4z",
          description:
            "Create and customize newsletters with the free email builder.",
          target: "_blank",
          href: urls.getStudioDemoEmail(urlProps),
        },
      ],
    },
    {
      content: "Sign In",
      className: "border-2 !px-4",
      href: urls.getSignInUrl(urlProps),
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
    <NavigationMenu
      className={cn(isVertical && "ml-auto")}
      isVertical={isVertical}
    >
      <NavigationMenuList className={cn(styles.links, isVertical && "!gap-4")}>
        {navLinks.map(({ href, target, content, className, items }) => (
          <NavigationMenuItem
            key={href || content}
            className={cn(isVertical && "flex flex-col items-end")}
          >
            {items ? (
              <>
                <NavigationMenuTrigger className={cn(styles.link)}>
                  {content}
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  className={cn(
                    isVertical
                      ? "text-right"
                      : cn(styles.navListLayer, "absolute w-auto")
                  )}
                >
                  <ul
                    className={cn("grid gap-2 p-4", !isVertical && "w-[400px]")}
                  >
                    {items.map((item) => (
                      <ListItem
                        key={item.href}
                        title={item.content}
                        href={item.href}
                        target={item.target}
                        icon={item.icon}
                        className={cn(className)}
                      >
                        {!isVertical && item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link href={href!} target={target} legacyBehavior passHref>
                <NavigationMenuLink
                  onClick={onLinkClick}
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
  );
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { isVertical?: boolean; icon?: string }
>(({ className, title, children, isVertical, target, icon, ...props }, ref) => {
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
          <div className="font-bold leading-none flex gap-2 items-center">
            {icon && <Icon path={icon} size={1} />}
            <span>{title}</span>
          </div>
          <p className="line-clamp-2 text-xs font-medium opacity-90 leading-snug text-gray-400">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
