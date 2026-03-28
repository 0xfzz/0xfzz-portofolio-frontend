import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/content";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectHeader } from "@/components/project-details/ProjectHeader";
import { ProjectGallery } from "@/components/project-details/ProjectGallery";
import { ProjectSidebar } from "@/components/project-details/ProjectSidebar";
import { ProjectContent } from "@/components/project-details/ProjectContent";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Use project-specific images if available, otherwise fallback to the single featured image
  const galleryImages = project.images && project.images.length >= 3 
    ? project.images 
    : [project.image, project.image, project.image];

  return (
    <main className="min-h-screen bg-[#FCF8F9]">
      <Navbar />
      
      <div className="pt-20">
        <ProjectHeader 
          title={project.title}
          category={project.category}
          description={project.description}
        />
        
        <ProjectGallery images={galleryImages} />

        <div className="container mx-auto px-4 max-w-7xl pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left Column: Actions */}
            <aside className="lg:col-span-3">
              <ProjectSidebar 
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
              />
            </aside>

            {/* Right Column: Main Content */}
            <div className="lg:col-span-9">
              <ProjectContent 
                technologies={project.technologies}
              >
                <div 
                  dangerouslySetInnerHTML={{ __html: project.contentHtml || "" }} 
                />
              </ProjectContent>
            </div>
          </div>
        </div>
      </div>

      <Footer data={{ copyright: "© {year} 0xfzz. Built with luvv.", tagline: "Architecting the future, one byte at a time." }} />
    </main>
  );
}
