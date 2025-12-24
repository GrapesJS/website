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

export async function openInStudioViaAuthProxy(
  prompt: string,
  projectType: ProjectType = "web",
  uploadedFile?: File | null
): Promise<void> {
  const formData = new FormData();
  
  formData.append('prompt', prompt);
  formData.append('projectType', projectType);
  formData.append('hasFile', uploadedFile ? 'true' : 'false');
  
  if (uploadedFile) {
    formData.append('file', uploadedFile);
  }
  
  const response = await fetch(`${API_BASE}/api/website-proxy`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  if (!response.ok) {
    let errorMessage = `API error: ${response.statusText}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch {
      const errorText = await response.text();
      console.error('API error:', response.status, errorText);
    }
    throw new Error(errorMessage);
  }

  const responseData = await response.json();
  const result = responseData.result || responseData;
  
  if (!result) {
    throw new Error('No result object in API response');
  }
  
  if (!result.success) {
    throw new Error(result.error || 'API request failed');
  }

  let redirectUrl = result.projectUrl;
  
  if (redirectUrl?.includes('localhost')) {
    redirectUrl = redirectUrl.replace(/https?:\/\/localhost:\d+/, API_BASE);
  }
  
  if (!redirectUrl) {
    throw new Error('No redirect URL returned from API');
  }
  
  // Redirect to the Studio editor with the AI-generated project
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
