interface ProjectContentSection {
  title: string;
  content: string;
}

interface ProjectContentProps {
  challenge: ProjectContentSection;
  approach: ProjectContentSection;
  codeSnippet?: {
    code: string;
    language: string;
  };
}

export function ProjectContent({ challenge, approach, codeSnippet }: ProjectContentProps) {
  return (
    <div className="space-y-16">
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-[#323235]">
          {challenge.title}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
          {challenge.content}
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-[#323235]">
          {approach.title}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
          {approach.content}
        </p>
        
        {codeSnippet && (
          <div className="rounded-xl overflow-hidden shadow-2xl bg-[#000000]/5 p-0.5 border border-border/40">
            <div className="bg-[#f0f0f0] p-6 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre">
              {codeSnippet.code}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
