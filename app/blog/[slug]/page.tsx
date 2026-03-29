import { BlogDetailHeader } from "@/components/blog/BlogDetailHeader";
import { BlogDetailContent } from "@/components/blog/BlogDetailContent";
import { getArticleBySlug, getSiteConfig } from "@/lib/content";
import { notFound } from "next/navigation";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const siteConfig = await getSiteConfig();

  if (!article || siteConfig.visibility?.blog === false) {
    notFound();
  }

  return (
    <article className="pt-32 pb-24">
      <BlogDetailHeader 
        title={article.title}
        date={article.date}
        tags={article.tags}
        image={article.image}
      />

      <div className="container mx-auto px-4 max-w-3xl">
        <BlogDetailContent>
          <div dangerouslySetInnerHTML={{ __html: article.contentHtml || "" }} className="prose prose-lg max-w-none" />
        </BlogDetailContent>
      </div>
    </article>
  );
}
