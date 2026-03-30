import { BlogDetailHeader } from "@/components/blog/BlogDetailHeader";
import { BlogDetailContent } from "@/components/blog/BlogDetailContent";
import { getArticleBySlug, getSiteConfig } from "@/lib/content";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";

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
