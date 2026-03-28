interface BlogDetailContentProps {
  content: string;
}

export function BlogDetailContent({ content }: BlogDetailContentProps) {
  // Simple logic to extract first letter for Drop Cap
  const firstLetter = content.charAt(0);
  const remainingContent = content.slice(1);

  return (
    <div className="prose prose-lg max-w-none prose-headings:text-[#323235] prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed">
      <p className="text-xl md:text-2xl leading-relaxed first-line:tracking-normal">
        <span className="float-left text-7xl font-bold text-[#323235] mr-3 mt-2 leading-[0.8]">
          {firstLetter}
        </span>
        {remainingContent.split('\n')[0]}
      </p>
      
      <div className="mt-8 space-y-8 whitespace-pre-line text-lg text-muted-foreground leading-relaxed">
        {content.split('\n').slice(1).join('\n')}
      </div>
    </div>
  );
}
