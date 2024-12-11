import styles from "./styles.module.css";

interface FooterProps extends React.HTMLProps<HTMLElement> {}

const linkCategories: {
  category: string;
  links: { id: string; label: string; href: string }[];
}[] = [
  {
    category: "Product",
    links: [
      {
        id: "Overview",
        label: "Overview",
        href: "https://www.grapesjs.com/#overview",
      },
      {
        id: "Features",
        label: "Features",
        href: "https://www.grapesjs.com/#features",
      },
      {
        id: "Tutorials",
        label: "Tutorials",
        href: "https://www.grapesjs.com/#tutorials",
      },
      {
        id: "Pricing",
        label: "Pricing",
        href: "https://www.grapesjs.com/#pricing",
      },
      {
        id: "Releases",
        label: "Releases",
        href: "https://www.grapesjs.com/#releases",
      },
    ],
  },
  {
    category: "Company",
    links: [
      {
        id: "About us",
        label: "About us",
        href: "https://www.grapesjs.com/#about-us",
      },
      {
        id: "Careers",
        label: "Careers",
        href: "https://www.grapesjs.com/#careers",
      },
      { id: "Press", label: "Press", href: "https://www.grapesjs.com/#press" },
      { id: "News", label: "News", href: "https://www.grapesjs.com/#news" },
      {
        id: "Contact",
        label: "Contact",
        href: "https://www.grapesjs.com/#contact",
      },
    ],
  },
  {
    category: "Resources",
    links: [
      { id: "Blog", label: "Blog", href: "https://www.grapesjs.com/#blog" },
      {
        id: "Newsletter",
        label: "Newsletter",
        href: "https://www.grapesjs.com/#newsletter",
      },
      {
        id: "Events",
        label: "Events",
        href: "https://www.grapesjs.com/#events",
      },
      {
        id: "Help centre",
        label: "Help centre",
        href: "https://www.grapesjs.com/#help-centre",
      },
      {
        id: "Tutorials",
        label: "Tutorials",
        href: "https://www.grapesjs.com/#tutorials",
      },
      {
        id: "Support",
        label: "Support",
        href: "https://www.grapesjs.com/#support",
      },
    ],
  },
  {
    category: "Legal",
    links: [
      { id: "Terms", label: "Terms", href: "https://www.grapesjs.com/#terms" },
      {
        id: "Privacy",
        label: "Privacy",
        href: "https://www.grapesjs.com/#privacy",
      },
      {
        id: "Cookies",
        label: "Cookies",
        href: "https://www.grapesjs.com/#cookies",
      },
      {
        id: "Licenses",
        label: "Licenses",
        href: "https://www.grapesjs.com/#licenses",
      },
      {
        id: "Settings",
        label: "Settings",
        href: "https://www.grapesjs.com/#settings",
      },
      {
        id: "Contact",
        label: "Contact",
        href: "https://www.grapesjs.com/#contact",
      },
    ],
  },
] as const;

const Footer: React.FC<FooterProps> = ({ className, ...rest }) => {
  return (
    <footer className={styles.footer} {...rest}>
      <div>
        <section>
          <div className={styles.logoAndDescription}>
            <div className={styles.logo}>
              <img
                src="/assets/images/logos/grapesjs-logo-combination-white.svg"
                alt="GrapesJS"
              />
            </div>
            <p className={styles.description}>
              The leading open-source framework for building your visual web
              builders.
            </p>
          </div>
          <div className={styles.categories}>
            {linkCategories.map((cat) => (
              <div className={styles.category}>
                <h3 className={styles.categoryName}>{cat.category}</h3>
                <div className={styles.links}>
                  {cat.links.map((link) => (
                    <a key={link.id} className={styles.link} href={link.href}>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <p>© 2024 GrapesJS. All rights reserved.</p>
          <a href="https://x.com/grapesjs" target="_blank">
            <img src="/assets/images/icons/x.svg" />
          </a>
          <a
            href="https://www.linkedin.com/company/grapes-studio/"
            target="_blank"
          >
            <img src="/assets/images/icons/linkedin.svg" />
          </a>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
