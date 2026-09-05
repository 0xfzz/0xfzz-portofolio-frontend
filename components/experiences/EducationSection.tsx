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
    <div className="mb-16">
      <h4 className="text-sm font-bold text-foreground mb-6">
        {title}
      </h4>
      <div className="space-y-8">
        {data.map((edu, index) => (
          <div key={index} className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold leading-tight text-foreground">{edu.institution}</h3>
              <p className="text-muted-foreground font-medium text-sm">{edu.degree}</p>
            </div>
            <div className="text-right md:text-right">
              <p className="text-foreground/70 text-sm font-bold">{edu.period}</p>
              <p className="text-muted-foreground text-[12px]">{edu.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
