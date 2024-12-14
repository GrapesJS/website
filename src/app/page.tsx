import { cx } from "@/lib/makeCls";
import {
  getGettingStartedDocsUrl,
  getSdkDashboardUrl,
  getStudioEditorUrl,
} from "@/lib/urls";
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
      <div className={styles.bg}></div>
      <main className={styles.home}>
        <Header isHome />
        <section>
          <h1>Design Without Code</h1>
          <p>
            The customizable website and email builder that grows with your
            business.
          </p>

          <div className="flex flex-row gap-[16px] flex-wrap items-center justify-center">
            <CTALink href={getStudioEditorUrl()}>Try the Studio Editor</CTALink>
            <CTALink href={getGettingStartedDocsUrl()} variant="tertiary">
              Get Started with the Studio SDK
            </CTALink>
          </div>

          <StarOnGH />

          <div className="flex flex-col w-full rounded-t-[16px] outline outline-8 outline-[#ffffff33] bg-[#252527]">
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

        <section>
          <div
            className={cx(
              "flex flex-col items-center",
              styles.specialHeadingContainer
            )}
          >
            <div className="z-[1]">
              <h2>POWERING SOLUTIONS FOR</h2>
              <hr />
            </div>
          </div>
          <div className={styles.logosContainer}>
            <img src="assets/images/external-logos/braze.png" alt="Braze" />
            <img
              src="assets/images/external-logos/france-gov.png"
              alt="Government of France"
            />
            <img src="assets/images/external-logos/pfizer.png" alt="Pfizer" />
            <img
              src="assets/images/external-logos/microsoft.png"
              alt="Microsoft"
            />
            <img
              src="assets/images/external-logos/volkswagen.png"
              alt="Volkswagen"
            />
            <img src="assets/images/external-logos/toyota.png" alt="Toyota" />
            <img src="assets/images/external-logos/phresia.png" alt="Phresia" />
          </div>
        </section>
        <section>
          <div
            className={cx(
              "flex flex-col items-center",
              styles.specialHeadingContainer
            )}
          >
            <h2 id="features">FEATURES</h2>
            <hr />
          </div>
          <h3>Create Your Perfect Visual Editor</h3>
          <p>
            Build powerful, customizable visual editors with GrapesJS. Our
            versatile framework provides everything you need, from drag-and-drop
            editing to responsive design.
          </p>
          <CTALink href={getSdkDashboardUrl("free")}>
            Start Now<span className="font-[400]"> - It's free</span>
          </CTALink>

          <section>
            <div className="flex flex-col gap-[8px] p-[32px] flex-1">
              <h4>Built-in and Customizable UI</h4>
              <p>Accessible and enhanced UX for seamless user experience.</p>
            </div>
            <img src="assets/images/sdk/1.png" alt="SDK UI" />
          </section>
          <section>
            <div className="flex flex-col gap-[8px] p-[32px] flex-1">
              <h4>Multi-Format Support</h4>
              <p>Create landing pages, multipage websites, and newsletters.</p>
            </div>
            <img src="assets/images/sdk/2.png" alt="SDK UI" />
          </section>
          <section>
            <div className="flex flex-col gap-[8px] p-[32px] flex-1">
              <h4>White Label Solution</h4>
              <p>Style and customize your editor as you see fit.</p>
            </div>
            <img
              src="assets/images/sdk/3.png"
              alt="SDK UI"
              className="pt-[36px]"
            />
          </section>
          <div className={styles.homeResponsiveColumns}>
            <section>
              <div className="flex flex-col gap-[8px] p-[32px] flex-1">
                <h4>Additional Panels</h4>
                <p>Includes Style Catalog and Template Manager.</p>
              </div>
              <img src="assets/images/sdk/4.png" alt="SDK UI" />
            </section>
            <section>
              <div className="flex flex-col gap-[8px] p-[32px] flex-1">
                <h4>Full Team Support</h4>
                <p>GrapesJS team provides dedicated assistance.</p>
              </div>
              <img src="assets/images/sdk/5.png" alt="SDK support chat" />
            </section>
          </div>
          <section className="flex !flex-col !items-stretch">
            <div className="flex flex-col gap-[8px] p-[32px] flex-1">
              <div className="flex items-center gap-[8px]">
                <h4>Ready to use elements</h4>
                <span className={styles.comingSoonTag}>Coming Soon</span>
              </div>
              <p>Access pro components, templates, and prebuilt blocks.</p>
            </div>
            <img
              src="assets/images/sdk/6.png"
              alt="SDK UI"
              className="h-[360px] object-cover !w-auto"
            />
          </section>
        </section>
        <section>
          <div
            className={cx(
              "flex flex-col items-center",
              styles.specialHeadingContainer
            )}
          >
            <h2 id="pricing">PRICING</h2>
            <hr />
          </div>

          <h3>Plans that fit your scale</h3>
          <p>
            Simple, transparent pricing that grows with you. Try any plan free
            for 30 days.
          </p>

          <Pricing />
        </section>
        <section className="!py-20">
          <h3>Get started for free</h3>
          <p>Join the thousands of companies & developers using Grapes today</p>
          <CTALink href={getSdkDashboardUrl("free")}>
            Get Started for Free
          </CTALink>
        </section>
        <Footer />
      </main>
    </>
  );
}
