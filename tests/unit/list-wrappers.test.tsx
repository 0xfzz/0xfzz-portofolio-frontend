import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BlogList } from "@/components/blog/BlogList";
import { ProjectList } from "@/components/projects/ProjectList";

// Renders the REAL wrappers (BlogList/ProjectList → TagFilterGrid → TagFilterHeader → Badge/PageHeader)
// to pin the contract's byte-exact wrapper wiring (contract §3.3): getTags/getKey field mapping, grid
// class strings, empty messages, and default title/subtitle. No submodule access; inline fixtures only.
// BlogCard/ProjectCard render fine in jsdom (next/image is mocked in tests/setup.tsx; next/link → <a>).

const articles = [
  {
    title: "Post One",
    date: "2026-01-01",
    tags: ["React"],
    slug: "post-one",
    description: "First post",
    body: "body",
  },
  {
    title: "Post Two",
    date: "2026-02-01",
    tags: ["Security"],
    slug: "post-two",
    description: "Second post",
    body: "body",
  },
];

const projects = [
  {
    title: "Proj One",
    description: "First project",
    slug: "proj-one",
    technologies: ["Next.js"],
    body: "body",
  },
  {
    title: "Proj Two",
    description: "Second project",
    slug: "proj-two",
    technologies: ["Security"],
    body: "body",
  },
];

// Card bodies also render tag text (meta-tag/overlay chips), so text queries are ambiguous.
// Header filter chips are the only Badges with the cursor-pointer class (filter-active/inactive).
function headerChip(label: string): HTMLElement {
  const chips = Array.from(document.querySelectorAll<HTMLElement>("div.cursor-pointer"));
  const chip = chips.find((c) => c.textContent === label);
  if (!chip) throw new Error(`header chip "${label}" not found`);
  return chip;
}

describe("BlogList wrapper wiring", () => {
  it("renders the TagFilterHeader with the default title/subtitle and all tags", () => {
    render(<BlogList articles={articles} uniqueTags={["All", "React", "Security"]} />);
    expect(screen.getByRole("heading", { level: 1, name: "Writing & Insights" })).toBeInTheDocument();
    expect(
      screen.getByText("Deep dives into software architecture, security research, and the future of distributed systems.")
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Post One" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Post Two" })).toBeInTheDocument();
  });

  it("renders the pinned grid class grid grid-cols-1 gap-6", () => {
    const { container } = render(<BlogList articles={articles} uniqueTags={["All", "React", "Security"]} />);
    expect(container.querySelector("div.grid")!.className).toBe("grid grid-cols-1 gap-6");
  });

  it("filters by article.tags through getTags", () => {
    render(<BlogList articles={articles} uniqueTags={["All", "React", "Security"]} />);
    fireEvent.click(headerChip("Security"));
    expect(screen.getByRole("heading", { name: "Post Two" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Post One" })).not.toBeInTheDocument();
  });

  it("restores all articles via the 'All' chip", () => {
    render(<BlogList articles={articles} uniqueTags={["All", "React", "Security"]} />);
    fireEvent.click(headerChip("Security"));
    expect(screen.queryByRole("heading", { name: "Post One" })).not.toBeInTheDocument();
    fireEvent.click(headerChip("All"));
    expect(screen.getByRole("heading", { name: "Post One" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Post Two" })).toBeInTheDocument();
  });

  it("renders the exact legacy empty message with pinned classes when no article matches", () => {
    render(<BlogList articles={[articles[0]]} uniqueTags={["All", "React", "Security"]} />);
    fireEvent.click(screen.getByText("Security"));
    const msg = screen.getByText("No articles found for this tag.");
    expect(msg).toBeInTheDocument();
    expect(msg.className).toBe("text-muted-foreground");
    expect(msg.parentElement!.className).toBe("col-span-full py-12 text-center");
  });
});

describe("ProjectList wrapper wiring", () => {
  it("renders the TagFilterHeader with the default title/subtitle and all tags", () => {
    render(<ProjectList projects={projects} uniqueTags={["All", "Next.js", "Security"]} />);
    expect(screen.getByRole("heading", { level: 1, name: "Projects That I've Made" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "A curated selection of technical challenges, experimental systems, and functional applications built with modern stacks."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Proj One")).toBeInTheDocument();
    expect(screen.getByText("Proj Two")).toBeInTheDocument();
  });

  it("renders the pinned grid class grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", () => {
    const { container } = render(<ProjectList projects={projects} uniqueTags={["All", "Next.js", "Security"]} />);
    expect(container.querySelector("div.grid")!.className).toBe(
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    );
  });

  it("filters by project.technologies through getTags", () => {
    render(<ProjectList projects={projects} uniqueTags={["All", "Next.js", "Security"]} />);
    fireEvent.click(headerChip("Security"));
    expect(screen.getByText("Proj Two")).toBeInTheDocument();
    expect(screen.queryByText("Proj One")).not.toBeInTheDocument();
  });

  it("renders the exact legacy empty message with pinned classes when no project matches", () => {
    render(<ProjectList projects={[projects[0]]} uniqueTags={["All", "Next.js", "Security"]} />);
    fireEvent.click(screen.getByText("Security"));
    const msg = screen.getByText("No projects found for this tag.");
    expect(msg).toBeInTheDocument();
    expect(msg.className).toBe("text-muted-foreground");
    expect(msg.parentElement!.className).toBe("col-span-full py-12 text-center");
  });
});
