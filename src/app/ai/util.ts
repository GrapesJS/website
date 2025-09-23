export type ProjectType = "web" | "email";

export function openInStudioViaProxy(
  prompt: string,
  projectType: ProjectType = "web"
): void {
  const form = document.createElement("form");
  form.method = "GET";
  form.action = "https://app.grapesjs.com/ai-proxy";

  const promptInput = document.createElement("input");
  promptInput.type = "hidden";
  promptInput.name = "prompt";
  promptInput.value = encodeURIComponent(prompt);

  const projectTypeInput = document.createElement("input");
  projectTypeInput.type = "hidden";
  projectTypeInput.name = "projectType";
  projectTypeInput.value = encodeURIComponent(projectType);

  form.appendChild(promptInput);
  form.appendChild(projectTypeInput);

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}
