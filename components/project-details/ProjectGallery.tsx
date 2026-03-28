import Image from "next/image";

interface ProjectGalleryProps {
  images: string[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  // We need at least 3 images for the layout seen in the design
  // Fallback to placeholders if not provided
  const displayImages = [
    images[0] || "https://picsum.photos/seed/project1/1200/800",
    images[1] || "https://picsum.photos/seed/project2/600/400",
    images[2] || "https://picsum.photos/seed/project3/600/400",
  ];

  return (
    <div className="container mx-auto px-4 max-w-7xl mb-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 aspect-[21/10]">
        {/* Left: Big Image (8 columns) */}
        <div className="md:col-span-8 relative rounded-[2rem] overflow-hidden border border-border-subtle">
          <Image
            src={displayImages[0]}
            alt="Project Featured"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right: Two Small Stacked Images (4 columns) */}
        <div className="md:col-span-4 grid grid-rows-2 gap-6">
          <div className="relative rounded-[1.5rem] overflow-hidden border border-border-subtle">
            <Image
              src={displayImages[1]}
              alt="Project Detail 1"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative rounded-[1.5rem] overflow-hidden border border-border-subtle">
            <Image
              src={displayImages[2]}
              alt="Project Detail 2"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
