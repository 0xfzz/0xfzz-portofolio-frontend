interface BlogDetailContentProps {
  children: React.ReactNode;
}

export function BlogDetailContent({ children }: BlogDetailContentProps) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:text-[#323235] prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-[#323235] first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-[#323235] first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]">
      {children}
    </div>
  );
}
