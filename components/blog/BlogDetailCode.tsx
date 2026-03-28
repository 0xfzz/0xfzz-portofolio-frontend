interface BlogDetailCodeProps {
  code: string;
  language: string;
}

export function BlogDetailCode({ code, language }: BlogDetailCodeProps) {
  return (
    <div className="my-12 rounded-xl overflow-hidden shadow-2xl bg-[#0F1117] border border-white/5">
      <div className="px-4 py-2 bg-[#161B22] border-b border-white/5 flex items-center justify-between">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          {language}
        </span>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>
      </div>
      <div className="p-8 font-mono text-sm leading-relaxed overflow-x-auto text-[#E6EDF3] whitespace-pre">
        {/* Simple highlighted style simulation */}
        {code.split('\n').map((line, i) => (
          <div key={i} className="flex gap-4">
            <span className="text-white/20 select-none text-right w-4">{i + 1}</span>
            <span>{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
