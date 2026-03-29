interface BlogDetailContentProps {
  children: React.ReactNode;
}

export function BlogDetailContent({ children }: BlogDetailContentProps) {
  return (
    <div className="prose prose-lg max-w-3xl mx-auto px-4 prose-headings:text-[#323235] prose-headings:font-bold prose-p:text-[#323235]/80 prose-p:leading-relaxed prose-strong:text-[#323235] prose-a:text-[#777E65] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
      {children}
    </div>
  );
}
