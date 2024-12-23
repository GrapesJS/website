const toCapitalCase = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const urls = {
  getGettingStartedDocsUrl: () =>
    "https://app.grapesjs.com/docs-sdk/overview/getting-started",
  getGrapesJsDocs: () => "https://grapesjs.com/docs/",

  getStudioEditorUrl: () => "https://app.grapesjs.com/studio",

  getSdkDashboardUrl: (plan?: "free" | "startup" | "business" | "enterprise") =>
    `https://app.grapesjs.com/dashboard/sdk/licenses${
      plan && `?ref=ctaSdkPlan${toCapitalCase(plan)}`
    }`,

  getHomeUrl: () => "/",
  getFeaturesUrl: () => "/#features",
  getPricingUrl: () => "/#pricing",
  getCareersUrl: () => "/careers",
  getContactUrl: () => "mailto:sales@grapesjs.com",
  getBlogUrl: () => "/blog",
  getTermsUrl: () => "https://app.grapesjs.com/terms",
  getPrivacyUrl: () => "https://app.grapesjs.com/privacy",
  getEnterpriseContactFormUrl: () => "https://forms.gle/VUycp3rc8iCpbh9k8",
  getLinkedInUrl: () => "https://www.linkedin.com/company/grapes-studio/",
  getXUrl: () => "https://x.com/grapesjs",
  getDiscordUrl: () => "https://discord.gg/QAbgGXq",
  getGithubUrl: () => "https://github.com/GrapesJS/grapesjs",
  getPathBlog: (slug?: string) => `/blog${slug ? `/${slug}` : ""}`,
} as const;

export default urls;
