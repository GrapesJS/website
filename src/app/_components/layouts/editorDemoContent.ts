/** Copy shared by the hero demo and the smaller AI workflow illustration. */
export function getEditorDemoCopy(isEmail = false) {
  return {
    prompt: isEmail
      ? "Create a welcome email using our brand design system."
      : "Create a landing page following our company’s brand design system.",
    companyPrompt: isEmail
      ? "Personalize it for new YourBrand customers and add a getting-started button."
      : "Fill it with content for YourBrand, a collaborative workspace for creative teams.",
    reply: isEmail
      ? "I’ll fetch your brand guidelines, then build a welcome email to match."
      : "I’ll fetch your brand guidelines, then build a page to match.",
    createTool: isEmail ? "Create welcome email" : "Create landing page",
    complete: isEmail
      ? "Your email is ready. Let’s make it yours."
      : "Your page is ready. Let’s make it yours.",
    updateTool: isEmail ? "Update email copy" : "Update page copy",
    visualEdit: isEmail
      ? "Done. You can edit any text directly in the email."
      : "Done. You can edit any text directly on the page.",
  };
}
