interface AwardItemProps {
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export function AwardsSection({ 
  data, 
  title = "Awards & Recognitions" 
}: { 
  data: AwardItemProps[], 
  title?: string 
}) {
  return (
    <div className="mb-16">
      <h4 className="text-sm font-bold text-foreground mb-6">
        {title}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.map((award, index) => (
          <div key={index} className="space-y-3 p-6 rounded-xl border border-border-subtle bg-white/50">
            <div className="flex justify-between items-start gap-4">
              <h3 className="text-lg font-bold text-foreground leading-tight">{award.title}</h3>
              <span className="text-[11px] font-bold text-secondary whitespace-nowrap pt-1">
                {award.date}
              </span>
            </div>
            <p className="text-[11px] font-bold text-foreground opacity-60">
              Issued by {award.issuer}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {award.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
