import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";

interface BlogDetailContentProps {
  content: string;
}

export function BlogDetailContent({ content }: BlogDetailContentProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <MarkdownRenderer content={content} />
    </div>
  );
}
