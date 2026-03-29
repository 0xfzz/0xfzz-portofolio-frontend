import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects, getSiteConfig } from "@/lib/content";
import { ProjectHeader } from "@/components/project-details/ProjectHeader";
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
  const siteConfig = await getSiteConfig();

  if (!project || siteConfig.visibility?.projects === false) {
    notFound();
  }

  return (
    <div className="pt-20">
      <ProjectHeader 
        title={project.title}
        technologies={project.technologies}
        description={project.description}
        image={project.image}
      />
      
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
  );
}
