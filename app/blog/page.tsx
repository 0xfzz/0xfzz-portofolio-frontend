import { BlogList } from "@/components/blog/BlogList";
import { getArticles, getSiteConfig } from "@/lib/content";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  return {
    title: `Blog | ${siteConfig.metadata.name}`,
    description: siteConfig.pages?.blog?.subtitle || `Technical articles and insights from ${siteConfig.metadata.name}.`,
    alternates: {
      canonical: 'https://www.0xfzz.my.id/blog',
    },
  };
}

export default async function BlogPage() {
  const siteConfig = await getSiteConfig();

  if (siteConfig.visibility?.blog === false) {
    notFound();
  }

  const articles = await getArticles();

  // Extract unique tags and sort them
  const allTags = articles.flatMap(article => article.tags);
  const uniqueTags = ["All", ...Array.from(new Set(allTags)).sort()];

  return (
    <PageContainer>
      <BlogList 
        articles={articles} 
        uniqueTags={uniqueTags} 
        title={siteConfig.pages?.blog?.title}
        subtitle={siteConfig.pages?.blog?.subtitle}
      />
    </PageContainer>
  );
}
