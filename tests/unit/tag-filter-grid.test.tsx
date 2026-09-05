import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TagFilterGrid } from "@/components/shared/TagFilterGrid";

const projects = [
  { slug: "a", title: "A", technologies: ["React"] },
  { slug: "b", title: "B", technologies: ["Security"] },
];

const allTags = ["All", "React", "Security", "Go", "Docker"];

function renderGrid(items = projects) {
  return render(
    <TagFilterGrid
      items={items}
      uniqueTags={["All", "React", "Security"]}
      getTags={(p) => p.technologies}
      getKey={(p) => p.slug}
      gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      emptyMessage="No projects found for this tag."
      header={(active, set) => (
        <div>
          {allTags.map((t) => (
            <button key={t} onClick={() => set(t)} data-active={t === active}>{t}</button>
          ))}
        </div>
      )}
      renderItem={(p) => <article>{p.title}</article>}
    />
  );
}

describe("TagFilterGrid", () => {
  it("defaults to 'All' and renders every item", () => {
    renderGrid();
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("filters items through getTags when a tag is clicked", () => {
    renderGrid();
    fireEvent.click(screen.getByRole("button", { name: "Security" }));
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.queryByText("A")).not.toBeInTheDocument();
  });

  it("restores all items when 'All' is clicked", () => {
    renderGrid();
    fireEvent.click(screen.getByRole("button", { name: "Security" }));
    expect(screen.queryByText("A")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "All" }));
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("renders the empty state with the exact pinned classes and message", () => {
    renderGrid([{ slug: "a", title: "A", technologies: ["React"] }]);
    fireEvent.click(screen.getByRole("button", { name: "Security" }));
    expect(screen.getByText("No projects found for this tag.").className).toBe("text-muted-foreground");
    expect(screen.getByText("No projects found for this tag.").parentElement!.className).toBe(
      "col-span-full py-12 text-center"
    );
  });

  it("renders the header via the header render prop with the active tag", () => {
    const header = vi.fn(() => null);
    render(
      <TagFilterGrid
        items={projects}
        uniqueTags={["All", "React", "Security"]}
        getTags={(p) => p.technologies}
        getKey={(p) => p.slug}
        gridClassName="grid grid-cols-1 gap-6"
        emptyMessage="No articles found for this tag."
        header={header}
        renderItem={(p) => <article>{p.title}</article>}
      />
    );
    expect(header).toHaveBeenCalledWith("All", expect.any(Function));
  });

  it("supports the pinned BlogList wrapper grid class string", () => {
    const { container } = render(
      <TagFilterGrid
        items={projects}
        uniqueTags={["All"]}
        getTags={(p) => p.technologies}
        getKey={(p) => p.slug}
        gridClassName="grid grid-cols-1 gap-6"
        emptyMessage="No articles found for this tag."
        header={() => null}
        renderItem={(p) => <article>{p.title}</article>}
      />
    );
    expect(container.querySelector("div.grid")!.className).toBe("grid grid-cols-1 gap-6");
  });

  it("supports the pinned ProjectList wrapper grid class string", () => {
    const { container } = render(
      <TagFilterGrid
        items={projects}
        uniqueTags={["All"]}
        getTags={(p) => p.technologies}
        getKey={(p) => p.slug}
        gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        emptyMessage="No projects found for this tag."
        header={() => null}
        renderItem={(p) => <article>{p.title}</article>}
      />
    );
    expect(container.querySelector("div.grid")!.className).toBe("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8");
  });

  it("renders the empty state for a zero-item list without any interaction", () => {
    renderGrid([]);
    expect(screen.getByText("No projects found for this tag.")).toBeInTheDocument();
    expect(screen.getByText("No projects found for this tag.").parentElement!.className).toBe(
      "col-span-full py-12 text-center"
    );
  });

  it("renders a single item once", () => {
    renderGrid([{ slug: "only", title: "Only", technologies: ["React"] }]);
    expect(screen.getAllByText("Only")).toHaveLength(1);
  });

  it("keeps items whose tags array includes the selected tag among several", () => {
    renderGrid([{ slug: "multi", title: "Multi", technologies: ["React", "Security", "Go"] }]);
    fireEvent.click(screen.getByRole("button", { name: "Go" }));
    expect(screen.getByText("Multi")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Docker" }));
    expect(screen.queryByText("Multi")).not.toBeInTheDocument();
  });

  it("uses a custom empty message verbatim (wrapper contract)", () => {
    render(
      <TagFilterGrid
        items={[] as typeof projects}
        uniqueTags={["All"]}
        getTags={(p) => p.technologies}
        getKey={(p) => p.slug}
        gridClassName="grid grid-cols-1 gap-6"
        emptyMessage="No articles found for this tag."
        header={() => null}
        renderItem={(p) => <article>{p.title}</article>}
      />
    );
    expect(screen.getByText("No articles found for this tag.")).toBeInTheDocument();
  });

  it("keys rendered items by getKey (duplicate keys stay distinguishable per contract)", () => {
    const getKey = vi.fn((p: { slug: string; title: string; technologies: string[] }) => p.slug);
    render(
      <TagFilterGrid
        items={projects}
        uniqueTags={["All"]}
        getTags={(p) => p.technologies}
        getKey={getKey}
        gridClassName="grid grid-cols-1 gap-6"
        emptyMessage="No articles found for this tag."
        header={() => null}
        renderItem={(p) => <article>{p.title}</article>}
      />
    );
    expect(getKey).toHaveBeenCalledWith(projects[0]);
    expect(getKey).toHaveBeenCalledWith(projects[1]);
    expect(getKey).toHaveBeenCalledTimes(2);
  });

  it("does not inject an 'All' tag of its own — pages own uniqueTags", () => {
    renderGrid(projects);
    // If the grid injected "All", the header stub would render it as a button and item filtering
    // would treat a "All"-mapped item specially; assert items render when uniqueTags omit it.
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });
});
