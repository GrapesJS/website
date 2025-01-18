const toCapitalCase = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

interface UrlProps {
  plan?: "free" | "startup" | "business" | "enterprise";
  ref?: string;
}

const APP_URL = "https://app.grapesjs.com";
const WEBSITE_URL = "https://grapesjs.com";
const UTM_PARAMS = `utm_source=grapesjs&utm_medium=button`;

const getRef = ({ ref, plan }: UrlProps) =>
  ref ? `&ref=${ref}` : plan ? `&ref=ctaSdkPlan${toCapitalCase(plan)}` : "";

const urls = {
  getGettingStartedDocsUrl: () =>
    `${APP_URL}/docs-sdk/overview/getting-started?${UTM_PARAMS}`,
  getGrapesJsDocs: () => `${WEBSITE_URL}/docs/?${UTM_PARAMS}`,
  getStudioEditorUrl: () => `${APP_URL}/studio?${UTM_PARAMS}`,
  getSignInUrl: (props: UrlProps) =>
    `${APP_URL}/signin?${UTM_PARAMS}${getRef(props)}`,
  getSdkLicensesUrl: (props: UrlProps) =>
    `${APP_URL}/dashboard/sdk/licenses?${UTM_PARAMS}${getRef(props)}`,
  getHomeUrl: () => "/",
  getFeaturesUrl: () => "/#features",
  getPricingUrl: () => "/#pricing",
  getCareersUrl: () => "/careers",
  getContactUrl: () => "mailto:sales@grapesjs.com",
  getBlogUrl: () => "/blog",
  getContactUsUrl: () => "https://forms.gle/VUycp3rc8iCpbh9k8",
  getTermsUrl: () => `${APP_URL}/terms`,
  getPrivacyUrl: () => `${APP_URL}/privacy`,
  getEnterpriseContactFormUrl: () => "mailto:sdk-enterprise@grapesjs.com",
  getLinkedInUrl: () => "https://www.linkedin.com/company/grapes-studio/",
  getXUrl: () => "https://x.com/grapesjs",
  getDiscordUrl: () => "https://discord.gg/QAbgGXq",
  getGithubUrl: () => "https://github.com/GrapesJS/grapesjs",
  getPathBlog: (slug?: string) => `/blog${slug ? `/${slug}` : ""}`,
} as const;

export default urls;
