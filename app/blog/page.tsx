import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogList } from "@/components/blog/BlogList";
import { getArticles, getLandingPageData } from "@/lib/content";

export default async function BlogPage() {
  const articles = await getArticles();
  const landingData = await getLandingPageData();

  // Extract unique tags and sort them
  const allTags = articles.flatMap(article => article.tags);
  const uniqueTags = ["All", ...Array.from(new Set(allTags)).sort()];

  return (
    <main className="min-h-screen bg-[#FCF8F9]">
      <Navbar />
      
      <div className="pt-40 pb-24 container mx-auto px-4 max-w-7xl">
        <BlogList articles={articles} uniqueTags={uniqueTags} />
      </div>

      <Footer data={landingData.footer} />
    </main>
  );
}
