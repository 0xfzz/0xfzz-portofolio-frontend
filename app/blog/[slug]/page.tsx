import Image from "next/image";
import { BlogDetailHeader } from "@/components/blog/BlogDetailHeader";
import { BlogDetailContent } from "@/components/blog/BlogDetailContent";
import { BlogDetailCode } from "@/components/blog/BlogDetailCode";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Dummy content fetch
const getArticleData = (slug: string) => {
  return {
    title: "Mastering React Hooks: The Hidden Logic",
    category: "PERFORMANCE",
    date: "October 24, 2024",
    image: "https://picsum.photos/seed/hooks-detail/1600/900",
    content: `React Hooks transformed how we build interfaces, but beneath the simple API of ‘useState’ and ‘useEffect’ lies a complex orchestration of fiber nodes and dispatcher logic. To truly master Hooks, one must look beyond the syntax and understand the execution lifecycle that governs state synchronization.

The Closure Trap
One of the most frequent hurdles for developers is the “stale closure.” When a hook is defined, it captures the variables from its surrounding scope. If those variables change, but the hook’s dependency array doesn’t reflect that change, the hook continues to operate on the old data.

This is particularly evident in asynchronous operations. Let’s look at how we can abstract this complexity into a robust, reusable custom hook for handling API states without the common pitfalls of race conditions.`,
    code: `const useAsyncState = (asyncFunction) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    let isMounted = true;
    
    asyncFunction()
      .then(res => {
        if (isMounted) setState({ data: res, loading: false, error: null });
      })
      .catch(err => {
        if (isMounted) setState({ data: null, loading: false, error: err });
      });
      
    return () => { isMounted = false };
  }, [asyncFunction]);

  return state;
};`,
    language: "javascript",
    secondaryContent: `Mental Models for Optimization
Efficiency in React isn’t about reducing the number of renders; it’s about making each render as “cheap” as possible. Use ‘useMemo’ sparingly. The overhead of the dependency comparison can sometimes outweigh the cost of re-calculating a simple derived value.

The “Hidden Logic” is simply this: React doesn’t track *what* changed, only that *something* might have changed. Your job as an engineer is to provide the hints that make that detection instantaneous.`,
  };
};

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const article = getArticleData(params.slug);

  return (
    <main className="min-h-screen bg-[#FCF8F9]">
      <Navbar />
      
      <div className="pt-32 pb-24 container mx-auto px-4 max-w-4xl">
        <BlogDetailHeader 
          category={article.category}
          date={article.date}
          title={article.title}
        />

        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl mb-16 border border-border/40">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <BlogDetailContent content={article.content} />
        
        <BlogDetailCode 
          code={article.code}
          language={article.language}
        />

        <div className="prose prose-lg max-w-none prose-headings:text-[#323235] prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed whitespace-pre-line text-lg text-muted-foreground">
          {article.secondaryContent}
        </div>
      </div>

      <Footer />
    </main>
  );
}
