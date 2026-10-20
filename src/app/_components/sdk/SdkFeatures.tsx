import {
  ArrowRight,
  Blocks,
  Braces,
  Database,
  FileStack,
  GalleryVerticalEnd,
  Github,
  Image,
  Layers,
  LayoutTemplate,
  MonitorSmartphone,
  Palette,
  SlidersHorizontal,
  Type,
} from "lucide-react";
import urls from "@/lib/urls";
import { cn } from "@/lib/utils";
import CTALink from "../CTALink";
import SectionEyebrow from "../SectionEyebrow";
import {
  AiWorkflowIllustration,
  EditorCompositionIllustration,
  ProjectTypesIllustration,
  StorageIllustration,
  ThemeIllustration,
} from "./SdkIllustrations";
import { theme } from "./theme";
import {
  CustomBlocksIllustration,
  DataSourcesIllustration,
  GlobalStylesIllustration,
} from "./SdkContentIllustrations";

const docs = "https://app.grapesjs.com/docs-sdk";
const linkClass = cn(theme.links.base, theme.colors.linkText);
const cardClass = cn(
  "overflow-hidden rounded-2xl",
  theme.cards.border,
  theme.cards.bg,
);

function DocsLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={`${docs}/${href}`} className={linkClass}>
      {children} <ArrowRight size={15} aria-hidden />
    </a>
  );
}

function IllustratedFeatureCard({
  label,
  title,
  description,
  links,
  children,
  wide = false,
}: {
  label: string;
  title: string;
  description: string;
  links: React.ReactNode;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <article
      className={cn(cardClass, "flex flex-col", wide && "md:col-span-2")}
    >
      <div className="flex-1 p-6 md:p-8">
        <p
          className={cn("mb-3", theme.cards.eyebrow, theme.colors.eyebrowText)}
        >
          {label}
        </p>
        <h3
          className={cn(
            "text-2xl font-semibold leading-tight tracking-tight",
            wide ? "md:text-[30px]" : "md:text-[28px]",
            theme.colors.primaryText,
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "mb-5 mt-4 max-w-[760px] text-base leading-relaxed",
            theme.colors.secondaryText,
          )}
        >
          {description}
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-3">{links}</div>
      </div>
      <div className="px-3 pb-3 md:px-5 md:pb-5">{children}</div>
    </article>
  );
}

const features = [
  {
    icon: Blocks,
    title: "Blocks built for your users",
    description:
      "Offer ready-to-use blocks, add your own components, and curate exactly what users can drag into a design.",
    href: "configuration/blocks",
  },
  {
    icon: FileStack,
    title: "Multiple pages, SEO included",
    description:
      "Manage pages in one project, with built-in settings for titles, SEO metadata, and social sharing tags.",
    href: "configuration/pages#settings",
  },
  {
    icon: MonitorSmartphone,
    title: "Design for every screen",
    description:
      "Give users device previews and responsive styling controls to refine layouts across desktop, tablet, and mobile.",
    href: "configuration/layout/components#devices",
  },
  {
    icon: Database,
    title: "Content connected to your data",
    description:
      "Use merge tags, conditions, and collections to turn application data into personalized, repeatable content.",
    href: "configuration/datasources/overview",
  },
  {
    icon: Braces,
    title: "Your template syntax, too",
    description:
      "Configure import and export for your template engine, so visual editing fits your existing rendering workflow.",
    href: "configuration/datasources/template-engines",
  },
  {
    icon: Image,
    title: "An asset manager that connects",
    description:
      "Connect your media library through asset providers, customize uploads, or bring your own asset manager UI.",
    href: "configuration/assets/overview",
  },
  {
    icon: LayoutTemplate,
    title: "A head start with templates",
    description:
      "Let users start from your designs or the built-in catalog. Manage templates in the editor and access the catalog through the API.",
    href: "configuration/templates",
  },
  {
    icon: Palette,
    title: "A design system in every project",
    description:
      "Define shared colors, typography, and styles so users can manage the brand consistently across their content.",
    href: "configuration/global-styles",
  },
  {
    icon: Layers,
    title: "Reuse the work that matters",
    description:
      "Turn repeated elements into symbols and manage the structure of each page with the layers panel.",
    href: "configuration/components",
  },
];

const plugins = [
  {
    icon: GalleryVerticalEnd,
    title: "Sliders & carousels",
    detail: "Swiper",
    href: "components/swiper",
  },
  {
    icon: LayoutTemplate,
    title: "Interactive sections",
    detail: "Accordion",
    href: "components/accordion",
  },
  {
    icon: SlidersHorizontal,
    title: "Motion & effects",
    detail: "Animation",
    href: "components/animation",
  },
  {
    icon: Type,
    title: "Rich text editing",
    detail: "ProseMirror integration",
    href: "rte/prosemirror",
  },
  {
    icon: Image,
    title: "Media integrations",
    detail: "YouTube asset provider",
    href: "asset-providers/youtube-asset-provider",
  },
  {
    icon: Blocks,
    title: "More building blocks",
    detail: "Tables, icons & more",
    href: "overview",
  },
];

export default function SdkFeatures() {
  return (
    <div className="relative z-[1] w-full">
      <section
        id="features"
        aria-labelledby="sdk-features-heading"
        className="mx-auto max-w-[1132px] px-4 pb-16 pt-16 md:pt-24"
      >
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <SectionEyebrow className="mb-4">
            Built to become part of your product
          </SectionEyebrow>
          <h2
            id="sdk-features-heading"
            className={cn(
              "text-3xl font-semibold leading-tight tracking-tight md:text-[46px] md:leading-[1.16]",
              theme.colors.primaryText,
            )}
          >
            Your product. Your workflows.
            <br className="hidden sm:block" /> Your visual editor.
          </h2>
          <p
            className={cn(
              "mx-auto mt-5 max-w-2xl text-base leading-relaxed md:text-lg",
              theme.colors.mutedText,
            )}
          >
            Give your users the freedom to create. Keep control of how the
            editor looks, what it can do, and how it fits your application.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className={`${cardClass} md:col-span-2`}>
            <div className="flex flex-col gap-5 p-6 md:flex-row md:items-end md:justify-between md:p-9">
              <div className="max-w-[680px]">
                <p
                  className={cn(
                    "mb-3",
                    theme.cards.eyebrow,
                    theme.colors.eyebrowText,
                  )}
                >
                  Fully customizable UI
                </p>
                <h3
                  className={cn(
                    "text-2xl font-semibold leading-tight tracking-tight md:text-[30px]",
                    theme.colors.primaryText,
                  )}
                >
                  Start with our UI. Make it your own.
                </h3>
                <p
                  className={cn(
                    "mt-4 text-base leading-relaxed",
                    theme.colors.secondaryText,
                  )}
                >
                  Arrange built-in panels, adjust the layout, and add your own
                  components. The editor runs inside your application, so it can
                  work alongside the UI you already have.
                </p>
              </div>
              <div className="shrink-0 md:pb-1">
                <DocsLink href="configuration/layout/overview">
                  Explore Layout Components
                </DocsLink>
              </div>
            </div>
            <div className="px-3 pb-3 md:px-5 md:pb-5">
              <EditorCompositionIllustration />
            </div>
          </article>

          <article className={`${cardClass} flex flex-col`}>
            <div className="flex-1 p-6 md:p-8">
              <p
                className={cn(
                  "mb-3",
                  theme.cards.eyebrow,
                  theme.colors.eyebrowText,
                )}
              >
                Built-in AI assistant
              </p>
              <h3
                className={cn(
                  "text-2xl font-semibold leading-tight tracking-tight md:text-[28px]",
                  theme.colors.primaryText,
                )}
              >
                AI that works inside your workflow.
              </h3>
              <p
                className={cn(
                  "mb-5 mt-4 text-base leading-relaxed",
                  theme.colors.secondaryText,
                )}
              >
                Let users create and edit content through conversation, then
                refine it visually. Customize the chat UI, instructions, and
                tools to connect AI to your product.
              </p>
              <DocsLink href="plugins/ai/overview">
                Explore AI integration
              </DocsLink>
            </div>
            <div className="px-3 pb-3 md:px-5 md:pb-5">
              <AiWorkflowIllustration />
            </div>
          </article>

          <article className={`${cardClass} flex flex-col`}>
            <div className="flex-1 p-6 md:p-8">
              <p
                className={cn(
                  "mb-3",
                  theme.cards.eyebrow,
                  theme.colors.eyebrowText,
                )}
              >
                White label & theming
              </p>
              <h3
                className={cn(
                  "text-2xl font-semibold leading-tight tracking-tight md:text-[28px]",
                  theme.colors.primaryText,
                )}
              >
                An editor that matches your brand.
              </h3>
              <p
                className={cn(
                  "mb-5 mt-4 text-base leading-relaxed",
                  theme.colors.secondaryText,
                )}
              >
                Match your application with light or dark themes, custom colors,
                and your own icons. Carry your brand through the entire editing
                experience.
              </p>
              <DocsLink href="configuration/themes">
                Explore editor theming
              </DocsLink>
            </div>
            <div className="px-3 pb-3 md:px-5 md:pb-5">
              <ThemeIllustration />
            </div>
          </article>

          <article className={`${cardClass} md:col-span-2`}>
            <div className="p-6 md:p-9">
              <p
                className={cn(
                  "mb-3",
                  theme.cards.eyebrow,
                  theme.colors.eyebrowText,
                )}
              >
                One SDK, many editor experiences
              </p>
              <h3
                className={cn(
                  "text-2xl font-semibold leading-tight tracking-tight md:text-[30px]",
                  theme.colors.primaryText,
                )}
              >
                Build beyond a single content format.
              </h3>
              <p
                className={cn(
                  "mt-4 max-w-[760px] text-base leading-relaxed",
                  theme.colors.secondaryText,
                )}
              >
                Create a landing page builder, a newsletter designer, or a
                document editor on the same foundation. Structured project JSON
                keeps content editable; project-specific exports turn it into
                the output your application needs.
              </p>
            </div>
            <div className="px-3 md:px-5">
              <ProjectTypesIllustration />
            </div>
            <div className="grid gap-6 px-6 py-7 md:grid-cols-3 md:px-9 md:pb-9">
              <div>
                <h4
                  className={cn(
                    "mb-2 text-sm font-semibold",
                    theme.colors.primaryText,
                  )}
                >
                  Websites & landing pages
                </h4>
                <p
                  className={cn(
                    "mb-3 text-sm leading-relaxed",
                    theme.colors.mutedText,
                  )}
                >
                  Export HTML, CSS, and JavaScript for your own publishing
                  pipeline.
                </p>
                <DocsLink href="project-types/web">Web projects</DocsLink>
              </div>
              <div>
                <h4
                  className={cn(
                    "mb-2 text-sm font-semibold",
                    theme.colors.primaryText,
                  )}
                >
                  Emails & newsletters
                </h4>
                <p
                  className={cn(
                    "mb-3 text-sm leading-relaxed",
                    theme.colors.mutedText,
                  )}
                >
                  Build with MJML and export responsive HTML for email clients.
                </p>
                <DocsLink href="project-types/email">Email projects</DocsLink>
              </div>
              <div>
                <h4
                  className={cn(
                    "mb-2 text-sm font-semibold",
                    theme.colors.primaryText,
                  )}
                >
                  Documents & custom output
                </h4>
                <p
                  className={cn(
                    "mb-3 text-sm leading-relaxed",
                    theme.colors.mutedText,
                  )}
                >
                  Create document experiences and extend exports to fit your use
                  case.
                </p>
                <DocsLink href="project-types/document">
                  Document projects
                </DocsLink>
              </div>
            </div>
          </article>

          <IllustratedFeatureCard
            label="Custom blocks & components"
            title="Give users building blocks made for your product."
            description="Combine built-in blocks with your own components, from product cards to branded sections. Choose what users can add and how each block behaves."
            links={
              <DocsLink href="configuration/blocks">
                Explore custom blocks
              </DocsLink>
            }
          >
            <CustomBlocksIllustration />
          </IllustratedFeatureCard>

          <IllustratedFeatureCard
            label="Global styles"
            title="Start every project with your design system."
            description="Define shared colors, typography, and styles in your templates. Give users one place to manage their brand and update the elements that use it."
            links={
              <DocsLink href="configuration/global-styles">
                Explore global styles
              </DocsLink>
            }
          >
            <GlobalStylesIllustration />
          </IllustratedFeatureCard>

          <IllustratedFeatureCard
            wide
            label="Data sources & template engines"
            title="One template. A personal preview for every customer."
            description="Connect content to your application data, then preview different records on the canvas. Configure import and export for your template syntax to keep personalized newsletters editable."
            links={
              <>
                <DocsLink href="configuration/datasources/overview">
                  Explore data sources
                </DocsLink>
                <DocsLink href="configuration/datasources/template-engines">
                  Template engine integration
                </DocsLink>
              </>
            }
          >
            <DataSourcesIllustration />
          </IllustratedFeatureCard>

          <article
            className={`${cardClass} grid md:col-span-2 md:grid-cols-[1fr_1.05fr]`}
          >
            <div className="flex flex-col justify-center p-6 md:p-9">
              <p
                className={cn(
                  "mb-3",
                  theme.cards.eyebrow,
                  theme.colors.eyebrowText,
                )}
              >
                Your content, your infrastructure
              </p>
              <h3
                className={cn(
                  "text-2xl font-semibold leading-tight tracking-tight md:text-[30px]",
                  theme.colors.primaryText,
                )}
              >
                Keep control of the data you create.
              </h3>
              <p
                className={cn(
                  "mb-5 mt-4 text-base leading-relaxed",
                  theme.colors.secondaryText,
                )}
              >
                Save project JSON to your backend, store assets in your own
                media infrastructure, and publish exported content wherever you
                choose. Your storage and delivery stay in your hands.
              </p>
              <DocsLink href="configuration/projects#self-hosted-storage">
                Explore custom storage
              </DocsLink>
            </div>
            <div className="p-3 md:py-5 md:pr-5">
              <StorageIllustration />
            </div>
          </article>
        </div>
      </section>

      <section
        aria-labelledby="sdk-toolkit-heading"
        className="mx-auto max-w-[1132px] px-4 py-16 md:py-20"
      >
        <div className="mb-10 max-w-2xl">
          <SectionEyebrow className="mb-4">
            The details are built in
          </SectionEyebrow>
          <h2
            id="sdk-toolkit-heading"
            className={cn(
              "text-3xl font-semibold leading-tight tracking-tight md:text-[38px]",
              theme.colors.primaryText,
            )}
          >
            A complete toolkit for content creation.
          </h2>
          <p
            className={cn(
              "mt-4 text-base leading-relaxed",
              theme.colors.mutedText,
            )}
          >
            Start with the capabilities your users expect. Adapt them as your
            product grows.
          </p>
        </div>
        <div className="grid gap-x-9 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description, href }) => (
            <a
              key={title}
              href={`${docs}/${href}`}
              className={cn(
                "group rounded-lg p-6",
                theme.cards.border,
                theme.cards.bg,
                theme.cards.hover,
              )}
            >
              <Icon
                size={23}
                strokeWidth={1.5}
                className={cn("mb-4", theme.colors.icon)}
                aria-hidden
              />
              <h3
                className={cn(
                  "mb-2 flex items-center gap-2 text-base font-semibold",
                  theme.colors.headingText,
                )}
              >
                {title}
                <ArrowRight
                  size={14}
                  className={cn(
                    "shrink-0 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100",
                    theme.colors.eyebrowText,
                  )}
                  aria-hidden
                />
              </h3>
              <p
                className={cn("text-sm leading-[1.8]", theme.colors.subtleText)}
              >
                {description}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="sdk-plugins-heading"
        className="mx-auto max-w-[1132px] px-4 py-12 md:py-20"
      >
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-xl">
            <SectionEyebrow className="mb-4">
              Keep building on top
            </SectionEyebrow>
            <h2
              id="sdk-plugins-heading"
              className={cn(
                "text-3xl font-semibold leading-tight tracking-tight md:text-[38px]",
                theme.colors.primaryText,
              )}
            >
              Extend it in every direction.
            </h2>
            <p
              className={cn(
                "mt-4 text-base leading-relaxed",
                theme.colors.mutedText,
              )}
            >
              Add Studio plugins for richer content and integrations, or build
              your own with the editor API.
            </p>
          </div>
          <DocsLink href="plugins/overview">Browse all plugins</DocsLink>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {plugins.map(({ icon: Icon, title, detail, href }) => (
            <a
              key={title}
              href={`${docs}/plugins/${href}`}
              className={cn(
                "group flex flex-col gap-4 rounded-xl p-5 sm:flex-row sm:items-center",
                theme.cards.border,
                theme.cards.bg,
                theme.cards.hover,
              )}
            >
              <div
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                  theme.cards.iconBadge,
                )}
              >
                <Icon size={21} strokeWidth={1.5} aria-hidden />
              </div>
              <div>
                <h3
                  className={cn(
                    "text-sm font-semibold",
                    theme.colors.headingText,
                  )}
                >
                  {title}
                </h3>
                <p
                  className={cn("mt-1 text-xs", theme.colors.pluginDetailText)}
                >
                  {detail}
                </p>
              </div>
              <ArrowRight
                size={15}
                className={cn(
                  "ml-auto hidden transition-transform group-hover:translate-x-1 sm:block",
                  theme.colors.eyebrowText,
                )}
                aria-hidden
              />
            </a>
          ))}
        </div>
      </section>

      <section
        aria-label="Developer foundations"
        className="mx-auto grid max-w-[1132px] gap-8 px-4 py-12 md:grid-cols-2 md:gap-14 md:py-16"
      >
        <div className={cn(cardClass, "p-6 md:p-8")}>
          <Braces
            size={25}
            strokeWidth={1.5}
            className={cn("mb-4", theme.colors.icon)}
            aria-hidden
          />
          <h2
            className={cn(
              "text-xl font-semibold tracking-tight",
              theme.colors.primaryText,
            )}
          >
            Fits the stack you already use.
          </h2>
          <p
            className={cn(
              "mb-4 mt-3 text-sm leading-[1.8]",
              theme.colors.mutedText,
            )}
          >
            Use the React integration or the JavaScript SDK with your framework
            of choice. Connect the editor to your application through
            configuration, events, and APIs.
          </p>
          <DocsLink href="examples/overview">
            Explore integration examples
          </DocsLink>
        </div>
        <div className={cn(cardClass, "p-6 md:p-8")}>
          <Github
            size={25}
            strokeWidth={1.5}
            className={cn("mb-4", theme.colors.icon)}
            aria-hidden
          />
          <h2
            className={cn(
              "text-xl font-semibold tracking-tight",
              theme.colors.primaryText,
            )}
          >
            An open-source core. A product-ready SDK.
          </h2>
          <p
            className={cn(
              "mb-4 mt-3 text-sm leading-[1.8]",
              theme.colors.mutedText,
            )}
          >
            Studio SDK builds on the open-source GrapesJS framework, adding a
            polished editor UI, Studio plugins, and support from the team behind
            the core.
          </p>
          <a href={urls.getGithubUrl()} className={linkClass}>
            Explore GrapesJS on GitHub <ArrowRight size={15} aria-hidden />
          </a>
        </div>
      </section>

      <section
        aria-labelledby="sdk-start-heading"
        className="mx-auto max-w-[1132px] px-4 pb-20 pt-12 md:pb-28"
      >
        <div
          className={cn(
            "relative isolate overflow-hidden rounded-2xl px-6 py-12 text-center md:py-16",
            theme.cards.border,
            theme.cards.bg,
          )}
        >
          <div aria-hidden className={theme.cards.topGlow} />
          <h2
            id="sdk-start-heading"
            className={cn(
              "text-3xl font-semibold leading-tight tracking-tight md:text-[40px]",
              theme.colors.primaryText,
            )}
          >
            Build your first editor. Make it yours.
          </h2>
          <p
            className={cn(
              "mx-auto mb-8 mt-4 max-w-lg text-base leading-relaxed",
              theme.colors.ctaText,
            )}
          >
            Try Studio SDK in your app and explore the experience you can give
            your users. Start on the free plan.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <CTALink href={urls.getSdkLicensesUrl({ ref: "homepageFeatures" })}>
              Get started for free
            </CTALink>
            <CTALink href={urls.getGettingStartedDocsUrl()} variant="tertiary">
              Read the Docs
            </CTALink>
          </div>
        </div>
      </section>
    </div>
  );
}
