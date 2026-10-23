import { APP_URL, SITE_URL } from "@/lib/site";

const toCapitalCase = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

interface UrlProps {
  plan?: "free" | "startup" | "business" | "enterprise";
  ref?: string;
}

const getRef = ({ ref, plan }: UrlProps = {}) =>
  [
    `ref=${encodeURIComponent(ref || (plan ? `ctaSdkPlan${toCapitalCase(plan)}` : "website"))}`,
    ...(plan ? [`plan=${encodeURIComponent(plan)}`] : []),
  ].join("&");

const urls = {
  getGettingStartedDocsUrl: () =>
    `${APP_URL}/docs-sdk/overview/getting-started?ref=docsHeader`,
  getChatGptAppUrl: () =>
    "https://chatgpt.com/plugins/plugin_asdk_app_69dd38930d64819196c02d0f9db061b5",
  getGrapesJsDocs: () => `${SITE_URL}/docs/`,
  getStudioEditorUrl: () => `${APP_URL}/playground?ref=tryEditor`,
  getSignInUrl: (props: UrlProps) =>
    `${APP_URL}/signin?${getRef(props)}&signupintent=sdk`,
  getSdkLicensesUrl: (props: UrlProps) =>
    `${APP_URL}/dashboard/sdk/licenses?${getRef(props)}&signupintent=sdk`,
  getAiLandingUrl: (ref = "") => `${APP_URL}/ai?${getRef({ ref })}`,
  getAiPageUrl: () => "/ai",
  getHomeUrl: () => "/",
  getFeaturesUrl: () => "/#features",
  getPricingUrl: () => "/sdk/pricing",
  getEmailBuilderUrl: () => "/sdk/embed-ai-email-builder",
  getCareersUrl: () => "/careers",
  getContactUrl: () => "mailto:sales@grapesjs.com",
  getBlogUrl: () => "/blog",
  getStudioDemoWeb: (props: UrlProps) => `${APP_URL}/studio?${getRef(props)}`,
  getStudioDemoEmail: (props: UrlProps) =>
    `${APP_URL}/studio/email?${getRef(props)}`,
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
