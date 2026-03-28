import Image from "next/image";

interface ProjectGalleryProps {
  images: string[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  // We expect at least 3 images for the layout
  const [main, second, third] = images;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 aspect-[4/3] relative rounded-2xl overflow-hidden shadow-lg border border-border/40">
        <Image
          src={main || "https://picsum.photos/seed/main/1200/900"}
          alt="Main project visual"
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex-1 aspect-square relative rounded-2xl overflow-hidden shadow-md border border-border/40">
          <Image
            src={second || "https://picsum.photos/seed/detail1/600/600"}
            alt="Project detail 1"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
        <div className="flex-1 aspect-square relative rounded-2xl overflow-hidden shadow-md border border-border/40">
          <Image
            src={third || "https://picsum.photos/seed/detail2/600/600"}
            alt="Project detail 2"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
