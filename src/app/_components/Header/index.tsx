import Link from "next/link";
import styles from "./styles.module.css";

const clsContainer = "container mx-auto px-5";
const clsHeadInner =
  "flex flex-wrap items-center md:justify-between gap-7 flex-col md:flex-row";

interface HeaderProps extends React.HTMLProps<HTMLElement> {
  isHome?: boolean;
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  isHome,
  className,
  transparent,
  ...rest
}) => {
  const navLinks: { content: string; href: string; target?: string }[] = [
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

  if (isHome) {
    navLinks.unshift(
      { content: "About", href: "#about" },
      { content: "Features", href: "#features" }
    );
  }

  // TODO: convert into drawer on small screens

  return (
    <header className={styles.container} {...rest}>
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
        </div>
      </div>
    </header>
  );
};

export default Header;