import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogCard } from "@/components/blog/BlogCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const ARTICLES = [
  {
    date: "October 24, 2024",
    tags: ["TypeScript", "Node.js", "Architectural"],
    title: "Mastering React Hooks: The Hidden Logic",
    slug: "mastering-react-hooks",
  },
  {
    date: "October 20, 2024",
    tags: ["Security", "Web3", "Infrastructure"],
    title: "Zero Trust Frontends in Modern Apps",
    slug: "zero-trust-frontends",
  },
  {
    date: "October 15, 2024",
    tags: ["Performance", "Backend", "Rust"],
    title: "Distributed System Patterns for 2024",
    slug: "distributed-system-patterns",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#FCF8F9]">
      <Navbar />
      
      <div className="pt-32 pb-24 container mx-auto px-4">
        <BlogHeader 
          title="Writing & Insights"
          subtitle="Exploring the intersection of architectural systems, high-performance computing, and the future of the web. Technical deep-dives for the modern engineer."
        />

        <div className="space-y-6">
          {ARTICLES.map((article) => (
            <BlogCard key={article.slug} {...article} />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
