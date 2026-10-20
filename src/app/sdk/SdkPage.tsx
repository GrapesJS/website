import urls from "@/lib/urls";
import cn from "classnames";
import Background from "../_components/Background";
import CTALink from "../_components/CTALink";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import WindowShell from "../_components/WindowShell";
import EmbedBuilderWeb from "../_components/layouts/EmbedBuilderWeb";
import SdkFeatures from "../_components/sdk/SdkFeatures";
import "../home.css";
import styles from "../styles.module.css";

const clsFullWhite = "!brightness-0 !invert";
const clsSmallLogo = "!h-[40px]";

const customers = [
  {
    src: "/assets/images/external-logos/gainsight.webp",
    alt: "Gainsight",
    className: cn(clsFullWhite, clsSmallLogo),
  },
  {
    src: "assets/images/external-logos/microsoft.webp",
    alt: "Microsoft",
    className: clsFullWhite,
  },
  {
    src: "/assets/images/external-logos/bytedance.webp",
    alt: "TikTok",
    className: cn(clsFullWhite, clsSmallLogo),
  },
  {
    src: "assets/images/external-logos/bbc.webp",
    alt: "BBC",
    className: clsFullWhite,
  },
  {
    src: "assets/images/external-logos/servicenow.webp",
    alt: "ServiceNow",
    className: cn(clsFullWhite, "!h-[30px]"),
  },
  {
    src: "assets/images/external-logos/braze.webp",
    alt: "Braze",
    className: clsFullWhite,
  },
  {
    src: "assets/images/external-logos/phresia.webp",
    alt: "Phresia",
    className: clsFullWhite,
  },
  {
    src: "assets/images/external-logos/france-gov.webp",
    alt: "France Government",
  },
];

export default function SDKPage() {
  return (
    <>
      <Background sticky />
      <main className={styles.home}>
        <Header isHome />

        <section className={cn(styles.heroSection, styles.section)}>
          {/* <BadgeLink href={urls.getAiLandingUrl("heroBanner")}>
            <div className="flex flex-col md:flex-row items-center text-center gap-2.5 font-medium">
              <Icon
                path={mdiCreation}
                size="16px"
                className="hidden md:block"
              />
              <span>
                New AI-Powered Web Creation: Build or Clone Any Site in Seconds.
              </span>
              <span className="text-[#d97de9]"> Try It Now!</span>
            </div>
          </BadgeLink> */}
          <h1 className={cn(styles.h1)}>AI visual editor for SaaS</h1>
          <p className={cn(styles.p, "!max-w-[900px]")}>
            Embeddable drag-and-drop editor for building emails, landing pages,
            websites, and more. <br />
            Give your users AI-powered content creation tools directly from your
            app.
          </p>

          <div className="flex flex-row gap-[16px] flex-wrap items-center justify-center pt-[50px] pb-[50px]">
            <CTALink href={urls.getStudioEditorUrl()}>
              Create your Editor
            </CTALink>
            {/* <CTALink
              href={urls.getSdkLicensesUrl({ ref: "heroAccount" })}
              variant="tertiary"
            >
              Get a License
            </CTALink> */}
          </div>

          {/* <StarOnGH /> */}

          <WindowShell>
            <EmbedBuilderWeb />
          </WindowShell>

          {/* <Tabs
            tabs={[
              {
                id: "editorImage3",
                label: "Newsletter Builder",
                content: (
                  <WindowShell>
                    <img
                      className="w-full"
                      src="/assets/images/newsletter.webp"
                      alt="GrapesJS Studio SDK Email/Newsletter Demo"
                      loading="eager"
                      fetchPriority="high"
                      decoding="sync"
                    />
                  </WindowShell>
                ),
              },
              {
                id: "editorImage",
                label: "Website Builder",
                content: (
                  <WindowShell>
                    <EmbedBuilderWeb />
                  </WindowShell>
                ),
              },
              {
                id: "editorImage2",
                label: "Document Builder",
                content: (
                  <WindowShell>
                    <img
                      className="w-full"
                      src="/assets/images/document.webp"
                      alt="GrapesJS Document Demo"
                      loading="lazy"
                      decoding="async"
                    />
                  </WindowShell>
                ),
              },
            ]}
          /> */}
        </section>

        <hr className={styles.shadowSeparator} />

        <section className={styles.section}>
          <div className={styles.specialHeadingContainer}>
            <div className="z-[1]">
              <h2 className={styles.h2}>POWERING SOLUTIONS FOR</h2>
              <hr className={styles.separator} />
            </div>
          </div>
          <div className={styles.logoMarquee}>
            <div className={styles.logoMarqueeTrack}>
              {[0, 1].map((copyIndex) => (
                <div
                  key={copyIndex}
                  className={styles.logoMarqueeGroup}
                  aria-hidden={copyIndex === 1}
                >
                  {customers.map(({ src, alt, className }) => (
                    <div
                      key={`${copyIndex}-${src}`}
                      className={styles.logoMarqueeItem}
                    >
                      <img
                        className={cn(styles.userLogo, className)}
                        src={src}
                        alt={alt}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <SdkFeatures />

        <Footer />
      </main>
    </>
  );
}
