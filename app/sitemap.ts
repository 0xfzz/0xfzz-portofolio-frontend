import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/utils';
import { getProjects, getArticles, getSiteConfig } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteConfig = await getSiteConfig();
  const baseUrl = getBaseUrl();

  // Base routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/experiences`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Add projects index if visible
  if (siteConfig.visibility?.projects !== false) {
    routes.push({
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    // Add individual projects
    const projects = await getProjects();
    projects.forEach((project) => {
      routes.push({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  }

  // Add blog index if visible
  if (siteConfig.visibility?.blog !== false) {
    routes.push({
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    // Add individual blog posts
    const articles = await getArticles();
    articles.forEach((article) => {
      routes.push({
        url: `${baseUrl}/blog/${article.slug}`,
        lastModified: article.date ? new Date(article.date) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  }

  return routes;
}
