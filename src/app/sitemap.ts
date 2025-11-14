import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blogApi';
import fs from 'fs';
import { join } from 'path';

const SITE_URL = 'https://grapesjs.com';

function getAllDocFiles(dir: string = ''): string[] {
  const files: string[] = [];
  const fullPath = dir 
    ? join(process.cwd(), 'public', 'docs', dir)
    : join(process.cwd(), 'public', 'docs');
  
  if (!fs.existsSync(fullPath)) {
    return files;
  }

  const items = fs.readdirSync(fullPath);
  
  for (const item of items) {
    const itemPath = join(fullPath, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      const subDir = dir ? join(dir, item) : item;
      files.push(...getAllDocFiles(subDir));
    } else if (item.endsWith('.html') && !item.startsWith('404')) {
      const relativePath = dir ? join(dir, item) : item;
      files.push(relativePath);
    }
  }
  
  return files;
}

function getDocUrls(): MetadataRoute.Sitemap {
  const docFiles = getAllDocFiles('');
  
  return docFiles.map((file) => {
    let urlPath = file.replace(/\\/g, '/');
    
    if (urlPath === 'index.html') {
      urlPath = '';
    } else if (urlPath.endsWith('/index.html')) {
      urlPath = urlPath.replace('/index.html', '');
    } else {
      urlPath = urlPath.replace(/\.html$/, '');
    }
    
    const url = urlPath ? `${SITE_URL}/docs/${urlPath}` : `${SITE_URL}/docs`;
    
    return {
      url,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    };
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Get all blog posts
  const posts = getAllPosts();
  const blogUrls = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Static pages with priorities
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/ai`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/sdk`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/careers`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/libre-friends`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/es`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Comparison pages - important for SEO
  const comparisonPages = [
    'vs-wordpress',
    'vs-squarespace',
    'vs-wix',
    'vs-unbounce',
    'vs-cargo',
    'vs-lovable',
  ].map((page) => ({
    url: `${SITE_URL}/${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const docUrls = getDocUrls();

  return [...staticPages, ...comparisonPages, ...blogUrls, ...docUrls];
}
