import { BlogDetailHeader } from "@/components/blog/BlogDetailHeader";
import { BlogDetailContent } from "@/components/blog/BlogDetailContent";
import { getArticleBySlug, getArticles, getSiteConfig } from "@/lib/content";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const siteConfig = await getSiteConfig();

  if (!article || siteConfig.visibility?.blog === false) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | ${siteConfig.metadata.name}`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      authors: [siteConfig.metadata.name],
      images: article.image ? [{ url: article.image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: article.image ? [article.image] : undefined,
    },
    alternates: {
      canonical: `https://www.0xfzz.my.id/blog/${slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const siteConfig = await getSiteConfig();

  if (!article || siteConfig.visibility?.blog === false) {
    notFound();
  }

  return (
    <PageContainer>
      <article>
        <BlogDetailHeader 
          title={article.title}
          date={article.date}
          tags={article.tags}
          image={article.image}
        />

        <BlogDetailContent content={article.body} />
      </article>
    </PageContainer>
  );
}
