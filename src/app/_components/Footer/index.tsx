import {
  getBlogUrl,
  getCareersUrl,
  getContactUrl,
  getFeaturesUrl,
  getGettingStartedDocsUrl,
  getHomeUrl,
  getPricingUrl,
  getPrivacyUrl,
  getTermsUrl,
} from "@/lib/urls";
import styles from "./styles.module.css";

interface FooterProps extends React.HTMLProps<HTMLElement> {}

const linkCategories: {
  category: string;
  links: { id: string; label: string; href: string; target?: string }[];
}[] = [
  {
    category: "Product",
    links: [
      {
        id: "Overview",
        label: "Overview",
        href: getHomeUrl(),
      },
      {
        id: "Features",
        label: "Features",
        href: getFeaturesUrl(),
      },
      {
        id: "Pricing",
        label: "Pricing",
        href: getPricingUrl(),
      },
    ],
  },
  {
    category: "Company",
    links: [
      {
        id: "Careers",
        label: "Careers",
        href: getCareersUrl(),
      },
      {
        id: "Contact",
        label: "Contact",
        href: getContactUrl(),
      },
    ],
  },
  {
    category: "Resources",
    links: [
      { id: "Blog", label: "Blog", href: getBlogUrl() },
      {
        id: "Docs",
        label: "Docs",
        href: getGettingStartedDocsUrl(),
        target: "_blank",
      },
    ],
  },
  {
    category: "Legal",
    links: [
      {
        id: "Terms",
        label: "Terms",
        href: getTermsUrl(),
      },
      {
        id: "Privacy",
        label: "Privacy",
        href: getPrivacyUrl(),
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
            {linkCategories.map((cat, i) => (
              <div key={i} className={styles.category}>
                <h3 className={styles.categoryName}>{cat.category}</h3>
                <div className={styles.links}>
                  {cat.links.map((link) => (
                    <a
                      key={link.id}
                      className={styles.link}
                      href={link.href}
                      target={link.target}
                    >
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
