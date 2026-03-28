import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";

export type ProjectType = "private" | "public" | "open-source";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  status: string;
  type: ProjectType;
  slug: string;
}

export function ProjectCard({ 
  title, 
  description, 
  image, 
  slug 
}: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden border-border/40 shadow-sm transition-all duration-500 bg-background flex flex-col h-full rounded-xl">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-2xl font-bold tracking-tight text-[#323235]">{title}</CardTitle>
        <CardDescription className="text-base leading-relaxed text-muted-foreground pt-2">
          {description}
        </CardDescription>
      </CardHeader>
      
      <div className="px-6 pb-6 mt-auto">
        <div className="h-px bg-border/40 w-full mb-6" />
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-auto p-0 gap-3 text-sm font-bold text-[#4A5568] hover:bg-transparent hover:text-foreground group/btn"
          asChild
        >
          <Link href={`/projects/${slug}`}>
            <span className="opacity-60 transition-transform group-hover/btn:scale-110">&lt;&gt;</span> 
            View Details
          </Link>
        </Button>
      </div>
    </Card>
  );
}
