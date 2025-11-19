import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blogApi';

const SITE_URL = 'https://grapesjs.com';
const DOCS_SITEMAP_URL = 'https://grapesjs.com/docs/sitemap-index.xml';

async function parseSitemapXml(xmlText: string): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [];
  
  const urlPattern = /<url>([\s\S]*?)<\/url>/g;
  let match;
  
  while ((match = urlPattern.exec(xmlText)) !== null) {
    const urlBlock = match[1];
    const locMatch = urlBlock.match(/<loc>(.*?)<\/loc>/);
    const lastmodMatch = urlBlock.match(/<lastmod>(.*?)<\/lastmod>/);
    
    if (locMatch) {
      const url = locMatch[1];
      const lastModified = lastmodMatch 
        ? new Date(lastmodMatch[1])
        : new Date();
      
      urls.push({
        url,
        lastModified,
        changeFrequency: 'daily' as const,
        priority: 0.6,
      });
    }
  }
  
  return urls;
}

async function getDocsUrls(): Promise<MetadataRoute.Sitemap> {
  try {
    const response = await fetch(DOCS_SITEMAP_URL, {
      next: { revalidate: 86400 },
    });
    
    if (!response.ok) {
      return [];
    }
    
    const xmlText = await response.text();
    
    const isSitemapIndex = xmlText.includes('<sitemapindex');
    
    if (isSitemapIndex) {
      const sitemapPattern = /<sitemap>([\s\S]*?)<\/sitemap>/g;
      const allUrls: MetadataRoute.Sitemap = [];
      let match;
      
      while ((match = sitemapPattern.exec(xmlText)) !== null) {
        const sitemapBlock = match[1];
        const locMatch = sitemapBlock.match(/<loc>(.*?)<\/loc>/);
        
        if (locMatch) {
          const sitemapUrl = locMatch[1];
          try {
            const sitemapResponse = await fetch(sitemapUrl, {
              next: { revalidate: 86400 },
            });
            
            if (sitemapResponse.ok) {
              const sitemapXml = await sitemapResponse.text();
              const urls = await parseSitemapXml(sitemapXml);
              allUrls.push(...urls);
            }
          } catch (error) {
            console.error(`Failed to fetch sitemap ${sitemapUrl}:`, error);
          }
        }
      }
      
      return allUrls;
    } else {
      return await parseSitemapXml(xmlText);
    }
  } catch (error) {
    console.error('Failed to fetch docs sitemap:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // Get docs URLs from the docs sitemap
  const docUrls = await getDocsUrls();

  return [...staticPages, ...comparisonPages, ...blogUrls, ...docUrls];
}
