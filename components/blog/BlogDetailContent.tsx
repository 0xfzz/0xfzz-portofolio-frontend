import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";

interface BlogDetailContentProps {
  content: string;
}

export function BlogDetailContent({ content }: BlogDetailContentProps) {
  return (
    <div className="w-full">
      <MarkdownRenderer content={content} />
    </div>
  );
}
