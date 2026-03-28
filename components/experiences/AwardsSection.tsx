interface AwardItemProps {
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export function AwardsSection({ data }: { data: AwardItemProps[] }) {
  return (
    <div className="mb-32">
      <h4 className="text-[0.75rem] font-extrabold tracking-widest text-[#323235] uppercase mb-10">
        Awards & Recognitions
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {data.map((award, index) => (
          <div key={index} className="space-y-3 p-6 rounded-xl border border-border-subtle bg-white/50">
            <div className="flex justify-between items-start gap-4">
              <h3 className="text-lg font-bold text-[#323235] leading-tight">{award.title}</h3>
              <span className="text-[10px] font-extrabold text-[#777E65] uppercase tracking-widest whitespace-nowrap pt-1">
                {award.date}
              </span>
            </div>
            <p className="text-[0.65rem] font-bold text-[#323235] opacity-50 uppercase tracking-wider">
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
