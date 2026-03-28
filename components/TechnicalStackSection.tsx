const DEFAULT_STACKS = [
  { category: "FRONTEND", skills: "React, Next.js, Tailwind" },
  { category: "BACKEND", skills: "Node.js, Go, Python" },
  { category: "INFRASTRUCTURE", skills: "AWS, Docker, K8s" },
  { category: "DATA", skills: "PostgreSQL, Redis, Mongo" }
];

interface SkillGroup {
  category: string;
  skills: string;
}

interface TechnicalStackSectionProps {
  title?: string;
  stacks?: SkillGroup[];
}

export function TechnicalStackSection({ 
  title = "Technical Stack", 
  stacks = DEFAULT_STACKS 
}: TechnicalStackSectionProps) {
  return (
    <div className="mb-32">
      <h4 className="text-[0.65rem] font-extrabold tracking-[0.2em] text-[#323235] uppercase mb-10 opacity-70">
        {title}
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8">
        {stacks.map((item) => (
          <div key={item.category}>
            <h5 className="text-[0.6rem] font-bold text-[#323235] opacity-50 mb-3 tracking-widest uppercase">
              {item.category}
            </h5>
            <p className="text-sm font-medium text-[#323235] opacity-90">
              {item.skills}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
