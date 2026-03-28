interface TechnicalStackSectionProps {
  title?: string;
  data?: {
    skills: {
      hard: string[];
      soft: string[];
      tools: string[];
    };
  };
}

export function TechnicalStackSection({ 
  title = "Technical Stack", 
  data 
}: TechnicalStackSectionProps) {
  if (!data) return null;

  const stacks = [
    { category: "Hard Skills", skills: data.skills.hard.join(", ") },
    { category: "Soft Skills", skills: data.skills.soft.join(", ") },
    { category: "Tools", skills: data.skills.tools.join(", ") },
  ];

  return (
    <div className="mb-32">
      <h4 className="text-[0.75rem] font-extrabold tracking-widest text-[#323235] uppercase mb-10">
        {title}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-12">
        {stacks.map((item) => (
          <div key={item.category}>
            <h5 className="text-[0.6rem] font-bold text-[#323235] opacity-50 mb-3 tracking-widest uppercase">
              {item.category}
            </h5>
            <p className="text-sm font-medium text-[#323235] opacity-90 leading-loose">
              {item.skills}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
