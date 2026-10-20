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
import CTALink from "../CTALink";
import {
  AiWorkflowIllustration,
  EditorCompositionIllustration,
  ProjectTypesIllustration,
  StorageIllustration,
  ThemeIllustration,
} from "./SdkIllustrations";

const docs = "https://app.grapesjs.com/docs-sdk";
const linkClass =
  "inline-flex items-center gap-2 text-sm font-semibold text-[#deb2e8] transition-colors hover:text-white focus-visible:rounded-sm";
const cardClass =
  "overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-br from-[#1d1522] to-[#100d13]";

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
    detail: "TinyMCE integration",
    href: "rte/tinymce",
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
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#cd8cdb]">
            Built to become part of your product
          </p>
          <h2
            id="sdk-features-heading"
            className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-[46px] md:leading-[1.16]"
          >
            Your product. Your workflows.
            <br className="hidden sm:block" /> Your visual editor.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#aaa2b2] md:text-lg">
            Give your users the freedom to create. Keep control of how the
            editor looks, what it can do, and how it fits your application.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className={`${cardClass} md:col-span-2`}>
            <div className="flex flex-col gap-5 p-6 md:flex-row md:items-end md:justify-between md:p-9">
              <div className="max-w-[680px]">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[#b28dbd]">
                  Fully customizable UI
                </p>
                <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white md:text-[30px]">
                  Compose the editor your product needs.
                </h3>
                <p className="mt-4 text-base leading-relaxed text-[#b8afc0]">
                  Install Studio SDK in your codebase, without loading the
                  editor from an external domain. Arrange built-in panels,
                  replace toolbars, and bring your own UI components into the
                  same layout.
                </p>
              </div>
              <div className="shrink-0 md:pb-1">
                <DocsLink href="configuration/layout/overview#react-layout-components">
                  Explore React layouts
                </DocsLink>
              </div>
            </div>
            <div className="px-3 pb-3 md:px-5 md:pb-5">
              <EditorCompositionIllustration />
            </div>
          </article>

          <article className={`${cardClass} flex flex-col`}>
            <div className="flex-1 p-6 md:p-8">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[#b28dbd]">
                Built-in AI assistant
              </p>
              <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white md:text-[28px]">
                AI that works inside your workflow.
              </h3>
              <p className="mb-5 mt-4 text-base leading-relaxed text-[#b8afc0]">
                Let users create and edit content through conversation, then
                refine it visually. Customize the chat UI, instructions, and
                tools to connect AI to your product.
              </p>
              <DocsLink href="plugins/ai/overview">
                Explore AI integration
              </DocsLink>
              <p className="mt-3 text-xs leading-relaxed text-[#918699]">
                AI Chat on Startup and above. Custom AI backends on Business and
                above.
              </p>
            </div>
            <div className="px-3 pb-3 md:px-5 md:pb-5">
              <AiWorkflowIllustration />
            </div>
          </article>

          <article className={`${cardClass} flex flex-col`}>
            <div className="flex-1 p-6 md:p-8">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[#b28dbd]">
                White label & theming
              </p>
              <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white md:text-[28px]">
                Make it feel like it was always yours.
              </h3>
              <p className="mb-5 mt-4 text-base leading-relaxed text-[#b8afc0]">
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
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[#b28dbd]">
                One SDK, many editor experiences
              </p>
              <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white md:text-[30px]">
                Build beyond a single content format.
              </h3>
              <p className="mt-4 max-w-[760px] text-base leading-relaxed text-[#b8afc0]">
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
                <h4 className="mb-2 text-sm font-semibold text-white">
                  Websites & landing pages
                </h4>
                <p className="mb-3 text-sm leading-relaxed text-[#aaa2b2]">
                  Export HTML, CSS, and JavaScript for your own publishing
                  pipeline.
                </p>
                <DocsLink href="project-types/web">Web projects</DocsLink>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-white">
                  Emails & newsletters
                </h4>
                <p className="mb-3 text-sm leading-relaxed text-[#aaa2b2]">
                  Build with MJML and export responsive HTML for email clients.
                </p>
                <DocsLink href="project-types/email">Email projects</DocsLink>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-white">
                  Documents & custom output
                </h4>
                <p className="mb-3 text-sm leading-relaxed text-[#aaa2b2]">
                  Create document experiences and extend exports to fit your use
                  case.
                </p>
                <DocsLink href="project-types/document">
                  Document projects
                </DocsLink>
              </div>
            </div>
          </article>

          <article
            className={`${cardClass} grid md:col-span-2 md:grid-cols-[1fr_1.05fr]`}
          >
            <div className="flex flex-col justify-center p-6 md:p-9">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[#b28dbd]">
                Your content, your infrastructure
              </p>
              <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white md:text-[30px]">
                Keep control of the data you create.
              </h3>
              <p className="mb-5 mt-4 text-base leading-relaxed text-[#b8afc0]">
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
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#cd8cdb]">
            The details are built in
          </p>
          <h2
            id="sdk-toolkit-heading"
            className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-[38px]"
          >
            A complete toolkit for content creation.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#aaa2b2]">
            Start with the capabilities your users expect. Adapt them as your
            product grows.
          </p>
        </div>
        <div className="grid gap-x-9 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description, href }) => (
            <a
              key={title}
              href={`${docs}/${href}`}
              className="group rounded-lg border-t border-white/10 pt-6"
            >
              <Icon
                size={23}
                strokeWidth={1.5}
                className="mb-4 text-[#c68bd6]"
                aria-hidden
              />
              <h3 className="mb-2 flex items-center gap-2 text-base font-semibold text-[#eee8f1]">
                {title}
                <ArrowRight
                  size={14}
                  className="shrink-0 text-[#b28dbd] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden
                />
              </h3>
              <p className="text-sm leading-[1.8] text-[#a59bad]">
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
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#cd8cdb]">
              Keep building on top
            </p>
            <h2
              id="sdk-plugins-heading"
              className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-[38px]"
            >
              Extend it in every direction.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#aaa2b2]">
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
              className="group flex flex-col gap-4 rounded-xl border border-white/10 bg-[#17101c] p-5 transition-colors hover:border-[#b66bc4]/50 hover:bg-[#211529] sm:flex-row sm:items-center"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#ab6bbc]/20 bg-[#a45dbc]/10 text-[#d8a2e7]">
                <Icon size={21} strokeWidth={1.5} aria-hidden />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#eee8f1]">
                  {title}
                </h3>
                <p className="mt-1 text-xs text-[#998da4]">{detail}</p>
              </div>
              <ArrowRight
                size={15}
                className="ml-auto hidden text-[#b28dbd] transition-transform group-hover:translate-x-1 sm:block"
                aria-hidden
              />
            </a>
          ))}
        </div>
        <p className="mt-4 text-xs text-[#918699]">
          Plugin availability varies by plan.{" "}
          <a
            href={urls.getPricingUrl()}
            className="text-[#c9a0d4] underline underline-offset-4"
          >
            Compare plans
          </a>
        </p>
      </section>

      <section
        aria-label="Developer foundations"
        className="mx-auto grid max-w-[1132px] gap-8 px-4 py-12 md:grid-cols-2 md:gap-14 md:py-16"
      >
        <div className="border-t border-white/10 pt-7">
          <Braces
            size={25}
            strokeWidth={1.5}
            className="mb-4 text-[#c68bd6]"
            aria-hidden
          />
          <h2 className="text-xl font-semibold tracking-tight text-white">
            Fits the stack you already use.
          </h2>
          <p className="mb-4 mt-3 text-sm leading-[1.8] text-[#aaa2b2]">
            Use the React integration or the JavaScript SDK with your framework
            of choice. Connect the editor to your application through
            configuration, events, and APIs.
          </p>
          <DocsLink href="examples/overview">
            Explore integration examples
          </DocsLink>
        </div>
        <div className="border-t border-white/10 pt-7">
          <Github
            size={25}
            strokeWidth={1.5}
            className="mb-4 text-[#c68bd6]"
            aria-hidden
          />
          <h2 className="text-xl font-semibold tracking-tight text-white">
            An open-source core. A product-ready SDK.
          </h2>
          <p className="mb-4 mt-3 text-sm leading-[1.8] text-[#aaa2b2]">
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
        <div className="rounded-2xl border border-[#c06cce]/25 bg-[radial-gradient(ellipse_at_top,#48234e_0%,#1c1121_65%,#130d17_100%)] px-6 py-12 text-center md:py-16">
          <h2
            id="sdk-start-heading"
            className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-[40px]"
          >
            Build your first editor. Make it yours.
          </h2>
          <p className="mx-auto mb-8 mt-4 max-w-lg text-base leading-relaxed text-[#c0b2c6]">
            Try Studio SDK in your app and explore the experience you can give
            your users. Start on the free plan.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <CTALink href={urls.getSdkLicensesUrl({ ref: "homepageFeatures" })}>
              Get started for free
            </CTALink>
            <CTALink href={urls.getGettingStartedDocsUrl()} variant="tertiary">
              Read the integration docs
            </CTALink>
          </div>
        </div>
      </section>
    </div>
  );
}
