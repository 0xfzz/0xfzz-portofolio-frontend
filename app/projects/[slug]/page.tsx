import { ProjectHeader } from "@/components/project-details/ProjectHeader";
import { ProjectGallery } from "@/components/project-details/ProjectGallery";
import { ProjectSidebar } from "@/components/project-details/ProjectSidebar";
import { ProjectContent } from "@/components/project-details/ProjectContent";
import { ProjectTechnologies } from "@/components/project-details/ProjectTechnologies";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// This is a dummy fetch for demonstration. In a real app, you'd fetch based on params.slug.
const getProjectData = (slug: string) => {
  return {
    title: slug === "quantum-api-engine" ? "Quantum API Engine" : 
           slug === "nexus-crm-platform" ? "Nexus CRM Platform" : 
           "Lumina Core Engine",
    category: "INFRASTRUCTURE DESIGN",
    description: "A high-concurrency distributed processing engine built for real-time observability in hybrid cloud environments.",
    images: [
      "https://picsum.photos/seed/lumina1/1200/900",
      "https://picsum.photos/seed/lumina2/600/600",
      "https://picsum.photos/seed/lumina3/600/600",
    ],
    liveUrl: "#",
    githubUrl: "#",
    challenge: {
      title: "The Challenge",
      content: "Legacy monitoring tools struggled with the exponential growth of telemetry data. Lumina was conceived to solve the latency bottleneck between data ingestion and visual representation. The goal was simple but ambitious: achieve sub-second global observability for multi-region Kubernetes clusters without sacrificing data integrity.",
    },
    approach: {
      title: "Engineering Approach",
      content: "The architecture leverages a custom-built Go-based ingestion layer that utilizes eBPF for zero-overhead kernel-level monitoring. We implemented a decoupled stream-processing pipeline using Apache Kafka to ensure fault tolerance and high throughput.",
    },
    codeSnippet: {
      language: "go",
      code: `// Core Processing Logic (Simplified)
func ProcessStream(batch []Telemetry) error {
    var wg sync.WaitGroup
    for _, data := range batch {
        wg.Add(1)
        go func(t Telemetry) {
            defer wg.Done()
            ValidateMetadata(t)
            PushToSink(t)
        }(data)
    }
    wg.Wait()
    return nil
}`,
    },
    technologies: ["Go / Golang", "TypeScript", "React", "Docker", "Kubernetes", "Apache Kafka", "gRPC", "Prometheus"],
  };
};

export default function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  const project = getProjectData(params.slug);

  return (
    <main className="min-h-screen bg-[#FCF8F9]">
      <Navbar />
      
      <div className="pt-32 pb-24 container mx-auto px-4">
        <ProjectHeader 
          title={project.title}
          category={project.category}
          description={project.description}
        />

        <div className="mt-12">
          <ProjectGallery images={project.images} />
        </div>

        <div className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-3">
            <ProjectSidebar 
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
            />
          </div>
          
          <div className="lg:col-span-9">
            <ProjectContent 
              challenge={project.challenge}
              approach={project.approach}
              codeSnippet={project.codeSnippet}
            />
            
            <ProjectTechnologies technologies={project.technologies} />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
