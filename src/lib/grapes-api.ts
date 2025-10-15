const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://app.grapesjs.com' 
  : 'http://localhost:3001';

export interface HomepageData {
  user?: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  templates: Array<{
    id: string;
    name: string;
    type: 'web' | 'email';
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
    type: 'web' | 'email';
    updatedAt: Date;
  }>;
}

export async function fetchHomepageData(options?: {
  type?: 'web' | 'email' | 'all';
  limit?: number;
  includeProjects?: boolean;
}): Promise<HomepageData> {
  const params = new URLSearchParams();
  
  if (options?.type && options.type !== 'all') {
    params.append('type', options.type);
  }
  if (options?.limit) {
    params.append('limit', options.limit.toString());
  }
  
  const url = `${API_BASE}/api/public/templates?${params.toString()}`;
  
  try {
    const response = await fetch(url, {
      credentials: process.env.NODE_ENV === 'production' ? 'include' : undefined,
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Handle both direct response and wrapped response
    if (data.result) {
      return { templates: data.result };
    }
    
    return { templates: data };
  } catch (error) {
    console.error('Failed to fetch homepage data:', error);
    return { templates: [] };
  }
}

export function getTemplatePreviewUrl(media?: string): string {
  if (!media) return '/assets/images/grapesjs-front-page-m.jpg';
  
  return media;
}

export function getTemplateCreateUrl(editorUrl: string): string {
  return `${API_BASE}${editorUrl}`;
}

