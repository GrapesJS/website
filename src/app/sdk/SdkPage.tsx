import urls from "@/lib/urls";
import { cn } from "@/lib/utils";
import Background from "../_components/Background";
import CTALink from "../_components/CTALink";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import HeroWindowShell from "../_components/WindowShell/HeroWindowShell";
import EmbedBuilderWeb from "../_components/layouts/EmbedBuilderWeb";
import SdkFeatures from "../_components/sdk/SdkFeatures";
import SdkCustomerLogos from "../_components/sdk/SdkCustomerLogos";
import ScrollReveal from "../_components/ScrollReveal";

const clsSection =
  "flex w-full flex-col items-center gap-6 px-4 pb-6 pt-[54px] [&>*]:max-w-[1100px]";

export default function SDKPage() {
  return (
    <ScrollReveal>
      <Background sticky />
      <main className="absolute flex w-full flex-col items-center [&_*]:scroll-mt-[136px] [&_*]:[scrollbar-color:#9e7ea3_#00000030] [&_*]:[scrollbar-width:thin]">
        <Header isHome />

        <section
          className={cn(
            clsSection,
            "relative mb-0 overflow-hidden pb-0 pt-[182px] before:absolute before:inset-0 before:z-[-1] before:bg-[radial-gradient(circle_at_top,#06040600_30.16%,#3d1844_71.62%,var(--activeBaseColor)_86.82%,var(--activeHighlightColor)_100%)] before:content-['']",
          )}
        >
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
          <h1 className="text-center text-[4rem] font-bold leading-[72px] text-[color:var(--highEmphasisTextColor)] max-[640px]:text-[3rem] max-[640px]:leading-[normal] max-[480px]:text-[2rem]">
            AI visual editor for SaaS
          </h1>
          <p
            data-reveal
            className="!max-w-[900px] text-center text-xl font-normal leading-normal text-[color:var(--textColor)] max-[480px]:text-[1.2rem]"
          >
            Embeddable drag-and-drop editor for building emails, landing pages,
            websites, and more. <br />
            Give your users AI-powered content creation tools directly from your
            app.
          </p>

          <div
            data-reveal
            className="flex flex-row flex-wrap items-center justify-center gap-4 py-[50px]"
          >
            <CTALink
              href={urls.getStudioEditorUrl()}
              data-ph-capture-attribute-placement="sdk-overview-hero"
              data-ph-capture-attribute-cta="Create your Editor"
            >
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

          <HeroWindowShell data-reveal>
            <EmbedBuilderWeb />
          </HeroWindowShell>

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

        <hr className="relative mt-[120px] h-0 w-full overflow-visible border-0 bg-none before:pointer-events-none before:absolute before:top-0 before:z-0 before:h-[1000px] before:w-full before:-translate-y-1/2 before:bg-[linear-gradient(180deg,var(--transparentColor)_20%,var(--backgroundColor)_40%,var(--backgroundColor)_50%,var(--transparentColor)_80%)] before:bg-no-repeat before:content-[''] max-[640px]:mt-0 max-[640px]:before:bg-[linear-gradient(180deg,var(--transparentColor)_35%,var(--backgroundColor)_50%,var(--transparentColor)_80%)]" />

        <SdkCustomerLogos />

        <SdkFeatures />

        <Footer />
      </main>
    </ScrollReveal>
  );
}
