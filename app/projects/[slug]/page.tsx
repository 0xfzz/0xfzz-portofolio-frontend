import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects, getSiteConfig } from "@/lib/content";
import { ProjectHeader } from "@/components/project-details/ProjectHeader";
import { ProjectSidebar } from "@/components/project-details/ProjectSidebar";
import { ProjectContent } from "@/components/project-details/ProjectContent";
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const siteConfig = await getSiteConfig();

  if (!project || siteConfig.visibility?.projects === false) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | ${siteConfig.metadata.name}`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      images: project.image ? [{ url: project.image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: project.image ? [project.image] : undefined,
    },
    alternates: {
      canonical: `https://www.0xfzz.my.id/projects/${slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const siteConfig = await getSiteConfig();

  if (!project || siteConfig.visibility?.projects === false) {
    notFound();
  }

  return (
    <div className="pt-20 md:pt-28">
      <ProjectHeader 
        title={project.title}
        technologies={project.technologies}
        description={project.description}
        image={project.image}
      />
      
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Actions */}
          <aside className="lg:col-span-3">
            <ProjectSidebar 
              sourceUrl={project.sourceUrl}
              liveUrl={project.liveUrl}
            />
          </aside>

          {/* Right Column: Main Content */}
          <div className="lg:col-span-9">
            <ProjectContent 
              technologies={project.technologies}
              content={project.body}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
