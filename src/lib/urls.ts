const toCapitalCase = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const urls = {
  getGettingStartedDocsUrl: () =>
    "https://app.grapesjs.com/docs-sdk?utm_source=grapesjs&utm_medium=button",
  getGrapesJsDocs: () => "https://grapesjs.com/docs/?utm_source=grapesjs&utm_medium=button",

  getStudioEditorUrl: () => "https://app.grapesjs.com/studio?utm_source=grapesjs&utm_medium=button",

  getSdkDashboardUrl: (plan?: "free" | "startup" | "business" | "enterprise") =>
    `https://app.grapesjs.com/dashboard/sdk/licenses${
      plan && `?utm_source=grapesjs&utm_medium=button?ref=ctaSdkPlan${toCapitalCase(plan)}`
    }`,

  getHomeUrl: () => "/",
  getFeaturesUrl: () => "/#features",
  getPricingUrl: () => "/#pricing",
  getCareersUrl: () => "/careers",
  getContactUrl: () => "mailto:sales@grapesjs.com",
  getBlogUrl: () => "/blog",
  getContactUsUrl: () => "https://forms.gle/VUycp3rc8iCpbh9k8",
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
