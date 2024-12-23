import urls from "@/lib/urls";
import cn from "classnames";
import Background from "./_components/Background";
import CTALink from "./_components/CTALink";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Pricing from "./_components/Pricing";
import StarOnGH from "./_components/StarOnGH";
import "./home.css";
import styles from "./styles.module.css";

export default function HomePage() {
  return (
    <>
      <Background />
      <main className={styles.home}>
        <Header isHome />

        <section className={cn(styles.heroSection, styles.section)}>
          <h1 className={cn(styles.h1)}>Design Without Code</h1>
          <p className={cn(styles.p)}>
            The customizable website and email builder that grows with your
            business.
          </p>

          <div className="flex flex-row gap-[16px] flex-wrap items-center justify-center">
            <CTALink href={urls.getStudioEditorUrl()}>
              Try the Studio Editor
            </CTALink>
            <CTALink href={urls.getGettingStartedDocsUrl()} variant="tertiary">
              Get Started with the Studio SDK
            </CTALink>
          </div>

          <StarOnGH />

          <div className="flex flex-col w-full rounded-t-[16px] outline outline-4 outline-[#ffffff33] bg-[#252527]">
            <div className="flex gap-[8px] h-[30px] items-center px-4">
              <div className="w-[12px] h-[12px] rounded-full bg-[#ED6D60]"></div>
              <div className="w-[12px] h-[12px] rounded-full bg-[#F6BF52]"></div>
              <div className="w-[12px] h-[12px] rounded-full bg-[#64C556]"></div>
            </div>
            <img
              className="w-full"
              src="/assets/images/studio-editor.jpg"
              alt="GrapesJS Webpage Demo"
            />
          </div>
        </section>

        <hr className={styles.shadowSeparator} />

        <section className={styles.section}>
          <div className={styles.specialHeadingContainer}>
            <div className="z-[1]">
              <h2 className={styles.h2}>POWERING SOLUTIONS FOR</h2>
              <hr className={styles.separator} />
            </div>
          </div>
          <div className={styles.logosContainer}>
            <img
              className={styles.userLogo}
              src="assets/images/external-logos/braze.png"
              alt="Braze"
            />
            <img
              className={styles.userLogo}
              src="assets/images/external-logos/france-gov.png"
              alt="Government of France"
            />
            <img
              className={styles.userLogo}
              src="assets/images/external-logos/pfizer.png"
              alt="Pfizer"
            />
            <img
              className={styles.userLogo}
              src="assets/images/external-logos/microsoft.png"
              alt="Microsoft"
            />
            <img
              className={styles.userLogo}
              src="assets/images/external-logos/volkswagen.png"
              alt="Volkswagen"
            />
            <img
              className={styles.userLogo}
              src="assets/images/external-logos/toyota.png"
              alt="Toyota"
            />
            <img
              className={styles.userLogo}
              src="assets/images/external-logos/phresia.png"
              alt="Phresia"
            />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.specialHeadingContainer}>
            <h2 className={styles.h2} id="features">
              FEATURES
            </h2>
            <hr className={styles.separator} />
          </div>
          <h3 className={cn(styles.h1)}>Create Your Perfect Visual Editor</h3>
          <p className={cn(styles.p)}>
            Build powerful, customizable visual editors with GrapesJS. Our
            versatile framework provides everything you need, from drag-and-drop
            editing to responsive design.
          </p>
          <CTALink href={urls.getSdkDashboardUrl("free")}>
            Start Now<span className="font-[400]"> - It's free</span>
          </CTALink>

          <section className={styles.card}>
            <div className="flex flex-col gap-[8px] p-[32px] flex-1">
              <h4 className={styles.h4}>Built-in and Customizable UI</h4>
              <p className={cn(styles.p)}>
                Accessible and enhanced UX for seamless user experience.
              </p>
            </div>
            <img src="assets/images/sdk/1.png" alt="SDK UI" />
          </section>
          <section className={styles.card}>
            <div className="flex flex-col gap-[8px] p-[32px] flex-1">
              <h4 className={styles.h4}>Multi-Format Support</h4>
              <p className={cn(styles.p)}>
                Create landing pages, multipage websites, and newsletters.
              </p>
            </div>
            <img src="assets/images/sdk/2.png" alt="SDK UI" />
          </section>
          <section className={styles.card}>
            <div className="flex flex-col gap-[8px] p-[32px] flex-1">
              <h4 className={styles.h4}>White Label Solution</h4>
              <p className={cn(styles.p)}>
                Style and customize your editor as you see fit.
              </p>
            </div>
            <img
              src="assets/images/sdk/3.png"
              alt="SDK UI"
              className="pt-[36px]"
            />
          </section>
          <div className={styles.homeResponsiveColumns}>
            <section className={cn(styles.card, styles.verticalCard)}>
              <div className="flex flex-col gap-[8px] p-[32px] flex-1">
                <h4 className={styles.h4}>Additional Panels</h4>
                <p className={cn(styles.p)}>
                  Includes Style Catalog and Template Manager.
                </p>
              </div>
              <img src="assets/images/sdk/4.png" alt="SDK UI" />
            </section>
            <section className={cn(styles.card, styles.verticalCard)}>
              <div className="flex flex-col gap-[8px] p-[32px] flex-1">
                <h4 className={styles.h4}>Full Team Support</h4>
                <p className={cn(styles.p)}>
                  GrapesJS team provides dedicated assistance.
                </p>
              </div>
              <img src="assets/images/sdk/5.png" alt="SDK support chat" />
            </section>
          </div>
          <section className={cn("flex !flex-col !items-stretch", styles.card)}>
            <div className="flex flex-col gap-[8px] p-[32px] flex-1">
              <div className="flex items-center gap-[8px]">
                <h4 className={styles.h4}>Ready to use elements</h4>
                <span className={styles.comingSoonTag}>Coming Soon</span>
              </div>
              <p className={cn(styles.p)}>
                Access pro components, templates, and prebuilt blocks.
              </p>
            </div>
            <img
              src="assets/images/sdk/6.png"
              alt="SDK UI"
              className="h-[360px] object-cover !w-auto"
            />
          </section>
        </section>

        <section className={cn(styles.section, "!px-0")}>
          <div className={styles.specialHeadingContainer}>
            <h2 className={styles.h2} id="pricing">
              PRICING
            </h2>
            <hr className={styles.separator} />
          </div>

          <h3 className={cn(styles.h1)}>Plans that fit your scale</h3>
          <p className={cn(styles.p)}>
            Simple, transparent pricing that grows with you. Try any plan free
            for 30 days.
          </p>

          <Pricing />
        </section>

        <section className={styles.section}>
          <h3 className={cn(styles.h1)}>Get started for free</h3>
          <p className={cn(styles.p)}>
            Join the thousands of companies & developers using Grapes today
          </p>
          <CTALink href={urls.getSdkDashboardUrl("free")}>
            Get Started for Free
          </CTALink>
        </section>

        <section className={cn("!py-20", styles.section)}>
          <div className={styles.specialHeadingContainer}>
            <h2 className={styles.h2} id="gold-sponsors">
              OUR GOLD SPONSORS
            </h2>
            <hr className={styles.separator} />
          </div>
          <div className={styles.logosContainer}>
            <a className={styles.sponsorLink} href="https://www.braze.com">
              <img
                className={cn(styles.sponsorLogo, styles.brazeLogo)}
                src="/assets/images/braze_logo.svg"
                alt="Braze logo"
              />
            </a>
            <a className={styles.sponsorLink} href="https://www.phreesia.com">
              <img
                className={cn(styles.sponsorLogo, styles.phreesiaLogo)}
                src="/assets/images/phreesia_logo.png"
                alt="Phreesia logo"
              />
            </a>
            <a
              className={styles.sponsorLink}
              href="https://veepn.com/vpn-apps/download-vpn-for-pc/"
            >
              <img
                className={cn(styles.sponsorLogo, styles.veepnLogo)}
                src="/assets/images/logo_veepn.png"
                alt="Download the Best Windows VPN for PC"
              />
            </a>
          </div>
          <div className={styles.specialHeadingContainer}>
            <h2 className={styles.h2} id="sponsors">
              OTHER SPONSORS
            </h2>
            <hr className={styles.separator} />
          </div>
          <div className={styles.scrollableContainer}>
            <object
              className={cn(styles.sponsorLogo, styles.openCollectiveLogo)}
              width="1035px"
              height="74px"
              type="image/svg+xml"
              data="https://opencollective.com/grapesjs/tiers/sponsors.svg?avatarHeight=64"
            >
              Open Collective
            </object>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
