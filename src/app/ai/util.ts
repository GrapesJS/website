import { API_BASE } from '@/lib/grapes-api';
import { useNewAuthFlow } from '@/lib/feature-flags';

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

interface ProxyResponse {
  success: boolean;
  projectUrl?: string;
}

export async function openInStudioViaAuthProxy(
  prompt: string,
  projectType: ProjectType = "web",
  uploadedFile?: File | null
): Promise<void> {
  const formData = new FormData();
  formData.append('prompt', prompt);
  formData.append('projectType', projectType);

  if (uploadedFile) {
    formData.append('file', uploadedFile);
    formData.append('hasFile', 'true');
  } else {
    formData.append('hasFile', 'false');
  }

  const response = await fetch(`${API_BASE}/api/website-proxy`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`API Request Failed: ${response.statusText}`);
  }

  const data = (await response.json()) as ProxyResponse;

  if (!data.success) {
    throw new Error('Unknown API Error');
  }

  let redirectUrl = data.projectUrl;

  if (!redirectUrl) {
    throw new Error('API returned success but no projectUrl');
  }

  globalThis.location.href = redirectUrl;
}

export async function openInStudio(
  prompt: string,
  projectType: ProjectType = "web",
  uploadedFile?: File | null
): Promise<void> {
  const useNewFlow = useNewAuthFlow();

  if (useNewFlow) {
    return openInStudioViaAuthProxy(prompt, projectType, uploadedFile);
  } else {
    if (uploadedFile) {
      console.warn('File upload is only supported with new auth flow. File will be ignored.');
    }
    openInStudioViaProxy(prompt, projectType);
  }
}
