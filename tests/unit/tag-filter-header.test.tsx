import { render, fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TagFilterHeader } from "@/components/shared/TagFilterHeader";

// Pinpoint class fragments of the pinned chip recipes (Phase-0 baseline, token-mapped — see
// badge-variants.test.tsx for the full effective strings): filter-active tail
// "…bg-secondary text-white", filter-inactive tail "…bg-chip/80 text-foreground hover:bg-chip".
describe("TagFilterHeader", () => {
  it("renders one chip per non-empty tag with the active variant's pinned classes", () => {
    const onClick = vi.fn();
    const { container } = render(
      <TagFilterHeader
        title="Projects"
        subtitle="sub"
        tags={["All", "React", ""]}
        activeTag="All"
        onTagClick={onClick}
      />
    );
    const chips = container.querySelectorAll(".cursor-pointer"); // or query all badge divs
    expect(chips).toHaveLength(2); // empty tag filtered out
    expect(chips[0].className).toContain("bg-secondary text-white"); // filter-active
    expect(chips[1].className).toContain("bg-chip/80 text-foreground hover:bg-chip"); // filter-inactive
  });

  it("fires onTagClick with the clicked tag", () => {
    const onClick = vi.fn();
    const { container } = render(
      <TagFilterHeader
        title="Projects"
        subtitle="sub"
        tags={["All", "React"]}
        activeTag="All"
        onTagClick={onClick}
      />
    );
    const chips = container.querySelectorAll(".cursor-pointer");
    fireEvent.click(chips[1]);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith("React");
  });

  it("filters out whitespace-only tags, not just empty strings", () => {
    const onClick = vi.fn();
    const { container } = render(
      <TagFilterHeader
        title="Projects"
        subtitle="sub"
        tags={["All", "   ", "React"]}
        activeTag="All"
        onTagClick={onClick}
      />
    );
    expect(container.querySelectorAll(".cursor-pointer")).toHaveLength(2);
    expect(container.textContent).not.toContain("   ");
  });

  it("keeps the pinned flex flex-wrap gap-4 chip row", () => {
    const { container } = render(
      <TagFilterHeader title="T" subtitle="s" tags={["All"]} activeTag="All" onTagClick={vi.fn()} />
    );
    expect(container.querySelector("div.flex.flex-wrap.gap-4")).not.toBeNull();
  });

  it("renders title/subtitle through PageHeader (heading + paragraph)", () => {
    render(
      <TagFilterHeader
        title="Blog Posts"
        subtitle="Some subtitle"
        tags={["All"]}
        activeTag="All"
        onTagClick={vi.fn()}
      />
    );
    expect(screen.getByRole("heading", { level: 1, name: "Blog Posts" })).toBeInTheDocument();
    expect(screen.getByText("Some subtitle")).toBeInTheDocument();
  });

  it("renders filter-inactive classes on every non-active chip", () => {
    const { container } = render(
      <TagFilterHeader
        title="Projects"
        subtitle="sub"
        tags={["All", "React", "Security"]}
        activeTag="React"
        onTagClick={vi.fn()}
      />
    );
    const chips = container.querySelectorAll(".cursor-pointer");
    expect(chips).toHaveLength(3);
    expect(chips[0].className).toContain("bg-chip/80 text-foreground hover:bg-chip"); // filter-inactive
    expect(chips[0].className).not.toContain("bg-secondary text-white");
    expect(chips[1].className).toContain("bg-secondary text-white"); // filter-active wins for active tag
    expect(chips[2].className).toContain("bg-chip/80 text-foreground hover:bg-chip");
  });
});
