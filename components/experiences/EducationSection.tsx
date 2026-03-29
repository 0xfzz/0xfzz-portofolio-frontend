interface EducationItemProps {
  institution: string;
  degree: string;
  period: string;
  location: string;
}

export function EducationSection({ 
  data, 
  title = "Education" 
}: { 
  data: EducationItemProps[], 
  title?: string 
}) {
  return (
    <div className="mb-32">
      <h4 className="text-[13px] font-bold tracking-wider text-[#323235] uppercase mb-10">
        {title}
      </h4>
      <div className="space-y-12">
        {data.map((edu, index) => (
          <div key={index} className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
            <div>
              <h3 className="text-xl font-bold text-[#323235]">{edu.institution}</h3>
              <p className="text-muted-foreground font-medium text-sm">{edu.degree}</p>
            </div>
            <div className="text-right md:text-right">
              <p className="text-[#323235]/70 text-sm font-bold">{edu.period}</p>
              <p className="text-muted-foreground text-[12px] uppercase tracking-wider">{edu.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
