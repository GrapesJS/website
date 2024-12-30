import urls from "@/lib/urls";
import { mdiPaletteSwatch } from "@mdi/js";
import Icon from "@mdi/react";
import cn from "classnames";
import Background from "./_components/Background";
import CTALink from "./_components/CTALink";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Pricing from "./_components/Pricing";
import StarOnGH from "./_components/StarOnGH";
import { Tabs } from "./_components/Tabs";
import "./home.css";
import styles from "./styles.module.css";

export default function HomePage() {
  return (
    <>
      <Background sticky />
      <main className={styles.home}>
        <Header isHome />

        <section className={cn(styles.heroSection, styles.section)}>
          <h1 className={cn(styles.h1)}>
            The embeddable drag-and-drop builder
          </h1>
          <p className={cn(styles.p)}>
            Seamlessly integrate and create within your application.
            <br />
            Open-source, customizable, white-label, no-code, visual editor for:
            <br />
            <b>Emails</b>, <b>Landing Pages</b>, and <b>Webpages</b>
          </p>

          <div className="flex flex-row gap-[16px] flex-wrap items-center justify-center pt-[50px] pb-[50px]">
            <CTALink href={urls.getStudioEditorUrl()}>Try the Editor</CTALink>
            <CTALink
              href={urls.getSdkLicensesUrl({ plan: "free" })}
              variant="tertiary"
            >
              Create Account
            </CTALink>
          </div>

          <StarOnGH />

          <Tabs
            tabs={[
              {
                id: "editorImage",
                label: "Webpages",
                // icon: <Icon path={mdiPaletteSwatch} />,
                content: (
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
                ),
              },
              {
                id: "editorImage2",
                label: "Landing Pages",
                content: (
                  <div className="flex flex-col w-full rounded-t-[16px] outline outline-4 outline-[#ffffff33] bg-[#b7b7b8]">
                    <div className="flex gap-[8px] h-[30px] items-center px-4">
                      <div className="w-[12px] h-[12px] rounded-full bg-[#ED6D60]"></div>
                      <div className="w-[12px] h-[12px] rounded-full bg-[#F6BF52]"></div>
                      <div className="w-[12px] h-[12px] rounded-full bg-[#64C556]"></div>
                    </div>
                    <img
                      className="w-full"
                      src="/assets/images/blog/grapesjs-studio-alpha.jpeg"
                      alt="GrapesJS Webpage Demo"
                    />
                  </div>
                ),
              },
              {
                id: "editorImage3",
                label: "Emails",
                content: (
                  <div className="flex flex-col w-full rounded-t-[16px] outline outline-4 outline-[#ffffff33] bg-[#b7b7b8]">
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
                ),
              },
              {
                id: "editorImage4",
                label: "PDFs & Files",
                content: (
                  <div className="flex flex-col w-full rounded-t-[16px] outline outline-4 outline-[#ffffff33] bg-[#252527]">
                    <div className="flex gap-[8px] h-[30px] items-center px-4">
                      <div className="w-[12px] h-[12px] rounded-full bg-[#ED6D60]"></div>
                      <div className="w-[12px] h-[12px] rounded-full bg-[#F6BF52]"></div>
                      <div className="w-[12px] h-[12px] rounded-full bg-[#64C556]"></div>
                    </div>
                    <img
                      className="w-full"
                      src="/assets/images/blog/grapesjs-studio-alpha.jpeg"
                      alt="GrapesJS Webpage Demo"
                    />
                  </div>
                ),
              },
            ]}
          />
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
              src="assets/images/external-logos/microsoft.png"
              alt="Microsoft"
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
              src="assets/images/external-logos/braze.png"
              alt="Braze"
            />
            <img
              className={styles.userLogo}
              src="assets/images/external-logos/phresia.png"
              alt="Phresia"
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
          <CTALink href={urls.getSdkLicensesUrl({ plan: "free" })}>
            Start Now<span className="font-[400]"> - It's free</span>
          </CTALink>

          <section className={styles.card}>
            <div className="flex flex-col gap-[8px] p-[32px] flex-1">
              <h4 className={styles.h4}>Built-in and Customizable UI</h4>
              <p className={cn(styles.p)}>
                Accessible and enhanced UX for seamless user experience.
              </p>
            </div>
            <img src="assets/images/sdk-features/1.png" alt="SDK UI" />
          </section>
          <section className={styles.card}>
            <div className="flex flex-col gap-[8px] p-[32px] flex-1">
              <h4 className={styles.h4}>Multi-Format Support</h4>
              <p className={cn(styles.p)}>
                Create landing pages, multipage websites, and newsletters.
              </p>
            </div>
            <img src="assets/images/sdk-features/2.png" alt="SDK UI" />
          </section>
          <section className={styles.card}>
            <div className="flex flex-col gap-[8px] p-[32px] flex-1">
              <h4 className={styles.h4}>White Label Solution</h4>
              <p className={cn(styles.p)}>
                Style and customize your editor as you see fit.
              </p>
            </div>
            <img
              src="assets/images/sdk-features/3.png"
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
              <img src="assets/images/sdk-features/4.png" alt="SDK UI" />
            </section>
            <section className={cn(styles.card, styles.verticalCard)}>
              <div className="flex flex-col gap-[8px] p-[32px] flex-1">
                <h4 className={styles.h4}>Full Team Support</h4>
                <p className={cn(styles.p)}>
                  GrapesJS team provides dedicated assistance.
                </p>
              </div>
              <img
                src="assets/images/sdk-features/5.png"
                alt="SDK support chat"
              />
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
              src="assets/images/sdk-features/6.png"
              alt="SDK UI"
              className="h-[360px] object-cover !w-auto"
            />
          </section>

          {/* Other SDK features */}
          <div className={styles.homeResponsiveColumns}>
            <section className={cn(styles.card, styles.verticalCard)}>
              <div className="flex flex-col gap-[8px] p-[32px] flex-1">
                <h4 className={styles.h4}>Flexible Data Hosting</h4>
                <p className={cn(styles.p)}>
                  No lock-in, choose between cloud or self-hosted options.
                </p>
              </div>
              <img src="assets/images/sdk-features/7.png" alt="SDK UI" />
            </section>
            <section className={cn(styles.card, styles.verticalCard)}>
              <div className="flex flex-col gap-[8px] p-[32px] flex-1">
                <h4 className={styles.h4}>Unlimited Access Features</h4>
                <p className={cn(styles.p)}>
                  Explore all SDK features at no cost.
                </p>
              </div>
              <img src="assets/images/sdk-features/8.png" alt="SDK UI" />
            </section>

            {/* Other Studio features */}
            <section className={cn(styles.card, styles.verticalCard)}>
              <div className="flex flex-col gap-[8px] p-[32px] flex-1">
                <h4 className={styles.h4}>Your Components</h4>
                <p className={cn(styles.p)}>
                  Create your custom components and allow your users drag & drop
                  them around.
                </p>
              </div>
              <img src="assets/images/studio-features/1.png" alt="SDK UI" />
            </section>
            <section className={cn(styles.card, styles.verticalCard)}>
              <div className="flex flex-col gap-[8px] p-[32px] flex-1">
                <h4 className={styles.h4}>Limitless styling</h4>
                <p className={cn(styles.p)}>
                  From simple to advanced and responsive styling. Configurable
                  for any CSS properties.
                </p>
              </div>
              <img src="assets/images/studio-features/2.png" alt="SDK UI" />
            </section>
            <section className={cn(styles.card, styles.verticalCard)}>
              <div className="flex flex-col gap-[8px] p-[32px] flex-1">
                <h4 className={styles.h4}>Responsive design</h4>
                <p className={cn(styles.p)}>
                  All the tools you need to allow your uses to create content
                  that looks great on any device.
                </p>
              </div>
              <img src="assets/images/studio-features/3.png" alt="SDK UI" />
            </section>
            <section className={cn(styles.card, styles.verticalCard)}>
              <div className="flex flex-col gap-[8px] p-[32px] flex-1">
                <h4 className={styles.h4}>Built-in Assets Manager</h4>
                <p className={cn(styles.p)}>
                  Keep track of your images, fonts, and other assets within the
                  editor.
                </p>
              </div>
              <img src="assets/images/studio-features/7.png" alt="SDK UI" />
            </section>
            <div className={cn(styles.verticalCard, "gap-[24px]")}>
              <section className={cn(styles.card, styles.verticalCard)}>
                <div className="flex flex-col gap-[8px] p-[32px] flex-1">
                  <h4 className={styles.h4}>Pages and Layers managers</h4>
                  <p className={cn(styles.p)}>
                    Organize your content with ease.
                  </p>
                </div>
                <img src="assets/images/studio-features/4.png" alt="SDK UI" />
              </section>
              <section className={cn(styles.card, styles.verticalCard)}>
                <div className="flex flex-col gap-[8px] p-[32px] flex-1">
                  <h4 className={styles.h4}>Symbols</h4>
                  <p className={cn(styles.p)}>
                    Create reusable components across pages.
                  </p>
                </div>
                <img src="assets/images/studio-features/5.png" alt="SDK UI" />
              </section>
            </div>
            <section className={cn(styles.card, styles.verticalCard)}>
              <div className="flex flex-col gap-[8px] p-[32px] flex-1">
                <h4 className={styles.h4}>
                  The code is there when you need it
                </h4>
                <p className={cn(styles.p)}>
                  GrapesJS outputs simple JSON and easily exports to any code
                  and project (HTML/CSS/JS export built-in).
                </p>
              </div>
              <img src="assets/images/studio-features/6.png" alt="SDK UI" />
            </section>
            <section className={cn(styles.card, styles.verticalCard)}>
              <div className="flex flex-col gap-[8px] p-[32px] flex-1">
                <h4 className={styles.h4}>
                  Extendable and customizable by design
                </h4>
                <p className={cn(styles.p)}>
                  Create custom plugins and modify the editor's UI to match your
                  specific requirements.
                </p>
              </div>
              <img src="assets/images/studio-features/8.png" alt="SDK UI" />
            </section>
            <section className={cn(styles.card, styles.verticalCard)}>
              <div className="flex flex-col gap-[8px] p-[32px] flex-1">
                <h4 className={styles.h4}>
                  Connect to External Data for Dynamic Content
                </h4>
                <p className={cn(styles.p)}>
                  Integrate your editor with external data sources to create
                  dynamic and engaging experiences.
                </p>
              </div>
              <img src="assets/images/studio-features/9.png" alt="SDK UI" />
            </section>
          </div>
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
          <CTALink href={urls.getSdkLicensesUrl({ plan: "free" })}>
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
