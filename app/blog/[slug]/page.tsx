import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogDetailHeader } from "@/components/blog/BlogDetailHeader";
import { BlogDetailContent } from "@/components/blog/BlogDetailContent";
import { getArticleBySlug, getLandingPageData } from "@/lib/content";
import { notFound } from "next/navigation";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const landingData = await getLandingPageData();

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FCF8F9]">
      <Navbar />
      
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

      <Footer data={{ copyright: "© {year} 0xfzz. Built with luvv.", tagline: "Architecting the future, one byte at a time." }} />
    </main>
  );
}
