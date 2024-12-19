import urls from "@/lib/urls";
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
        href: urls.getHomeUrl(),
      },
      {
        id: "Features",
        label: "Features",
        href: urls.getFeaturesUrl(),
      },
      {
        id: "Pricing",
        label: "Pricing",
        href: urls.getPricingUrl(),
      },
    ],
  },
  {
    category: "Company",
    links: [
      {
        id: "Careers",
        label: "Careers",
        href: urls.getCareersUrl(),
      },
      {
        id: "Contact",
        label: "Contact",
        href: urls.getContactUrl(),
      },
    ],
  },
  {
    category: "Resources",
    links: [
      { id: "Blog", label: "Blog", href: urls.getBlogUrl() },
      {
        id: "Docs",
        label: "Docs",
        href: urls.getGettingStartedDocsUrl(),
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
        href: urls.getTermsUrl(),
      },
      {
        id: "Privacy",
        label: "Privacy",
        href: urls.getPrivacyUrl(),
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
          <p>© {new Date().getFullYear()} GrapesJS. All rights reserved.</p>
          <a href={urls.getXUrl()} target="_blank">
            <img src="/assets/images/icons/x.svg" />
          </a>
          <a href={urls.getLinkedInUrl()} target="_blank">
            <img src="/assets/images/icons/linkedin.svg" />
          </a>
          <a href={urls.getDiscordUrl()} target="_blank">
            <img src="/assets/images/icons/discord.svg" />
          </a>
          <a href={urls.getGithubUrl()} target="_blank">
            <img src="/assets/images/icons/github.svg" />
          </a>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
