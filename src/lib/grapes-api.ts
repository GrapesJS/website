import type { AuthUser, UserResponse } from '@/types/auth';

export type { AuthUser, UserResponse };

const isDev = process.env.NODE_ENV !== "production";
export const API_BASE = isDev
  ? process.env.NEXT_PUBLIC_API_APP_BASE || "http://localhost:3000"
  : "https://app.grapesjs.com";

export interface HomepageData {
  user?: AuthUser;
  templates: Array<{
    id: string;
    name: string;
    type: "web" | "email";
    description?: string;
    media?: string;
    author?: {
      name: string;
      link?: string;
    };
    editorUrl: string;
  }>;
  projects?: Array<{
    id: string;
    name: string;
    type: "web" | "email";
    updatedAt: Date;
  }>;
}

export async function fetchHomepageData(options?: {
  type?: "web" | "email" | "all";
  limit?: number;
  includeProjects?: boolean;
}): Promise<HomepageData> {
  const params = new URLSearchParams();

  if (options?.type && options.type !== "all") {
    params.append("type", options.type);
  }
  if (options?.limit) {
    params.append("limit", options.limit.toString());
  }

  const url = `${API_BASE}/api/public/templates?${params.toString()}`;

  try {
    const response = await fetch(url, {
      credentials:
        process.env.NODE_ENV === "production" ? "include" : undefined,
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Handle both direct response and wrapped response
    if (data.result) {
      return data.result;
    }

    return { templates: data };
  } catch (error) {
    console.error("Failed to fetch homepage data:", error);
    return { templates: [] };
  }
}

export function getTemplatePreviewUrl(media?: string): string {
  if (!media) return "/assets/images/grapesjs-front-page-m.jpg";

  return media;
}

export function getTemplateCreateUrl(editorUrl: string): string {
  return `${API_BASE}${editorUrl}`;
}

export async function checkAuthSession(): Promise<UserResponse> {
  try {
    const response = await fetch(`${API_BASE}/api/website-proxy`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return { isAuthenticated: false, user: null };
    }

    const data = await response.json() as UserResponse;

    if (data?.user && typeof data.user.id === 'string') {
      return {
        isAuthenticated: true,
        user: {
          id: data.user.id,
          email: data.user.email ?? null,
          name: data.user.name ?? null,
          role: data.user.role ?? null,
          image: data.user.image ?? null,
        }
      };
    }

    return { isAuthenticated: false, user: null };
  } catch (error) {
    return { isAuthenticated: false, user: null };
  }
}
