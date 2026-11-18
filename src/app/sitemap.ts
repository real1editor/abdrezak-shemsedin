import type { MetadataRoute } from "next";
import { portfolioData } from "@/data/projects";
import { domainOrder, siteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const domainRoutes: MetadataRoute.Sitemap = domainOrder.map((slug) => ({
    url: `${siteUrl}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const domainResumeRoutes: MetadataRoute.Sitemap = domainOrder.map((slug) => ({
    url: `${siteUrl}/${slug}/resume`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const seoRoutes: MetadataRoute.Sitemap = portfolioData.seoPages.map((page) => ({
    url: `${siteUrl}${page.href}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...domainRoutes,
    {
      url: `${siteUrl}/resume`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...domainResumeRoutes,
    ...seoRoutes,
  ];
}

export const revalidate = 3600;
