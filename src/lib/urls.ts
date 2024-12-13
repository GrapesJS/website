const toCapitalCase = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const getGettingStartedDocsUrl = () =>
  "https://app.grapesjs.com/docs-sdk/overview/getting-started";

export const getStudioEditorUrl = () => "https://app.grapesjs.com/studio";

export const getSdkDashboardUrl = (
  plan?: "free" | "startup" | "business" | "enterprise"
) =>
  `https://app.grapesjs.com/dashboard/sdk/licenses${
    plan && `?ref=ctaSdkPlan${toCapitalCase(plan)}`
  }`;

export const getHomeUrl = () => "/";
export const getFeaturesUrl = () => "/#features";
export const getPricingUrl = () => "/#pricing";
export const getCareersUrl = () => "/careers";
export const getContactUrl = () => "mailto:sales@grapesjs.com";
export const getBlogUrl = () => "/blog";
export const getTermsUrl = () => "https://app.grapesjs.com/terms";
export const getPrivacyUrl = () => "https://app.grapesjs.com/privacy";
export const getEnterpriseContactFormUrl = () =>
  "https://forms.gle/VUycp3rc8iCpbh9k8";
