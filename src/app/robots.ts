import { MetadataRoute } from "next";
import { APP_URL, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [],
    },
    sitemap: [
      `${SITE_URL}/sitemap-index.xml`,
      `${APP_URL}/sitemap-index.xml`,
    ],
  };
}
