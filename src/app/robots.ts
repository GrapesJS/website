import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [],
    },
    sitemap: [
      'https://grapesjs.com/sitemap.xml',
      'https://app.grapesjs.com/sitemap.xml',
    ],
  };
}
