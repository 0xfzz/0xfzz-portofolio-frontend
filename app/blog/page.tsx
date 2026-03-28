import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { getArticles, getLandingPageData } from "@/lib/content";

export default async function BlogPage() {
  const articles = await getArticles();
  const landingData = await getLandingPageData();

  return (
    <main className="min-h-screen bg-[#FCF8F9]">
      <Navbar />
      
      <div className="pt-40 pb-24 container mx-auto px-4 max-w-7xl">
        <BlogHeader 
          title="Writing & Insights"
          subtitle="Deep dives into software architecture, security research, and the future of distributed systems."
        />

        <div className="grid grid-cols-1 gap-6">
          {articles.map((article) => (
            <BlogCard key={article.slug} {...article} />
          ))}
        </div>
      </div>

      <Footer data={{ copyright: "© {year} 0xfzz. Built with luvv.", tagline: "Architecting the future, one byte at a time." }} />
    </main>
  );
}
