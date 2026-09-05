import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BlogDetailHeader } from "@/components/blog/BlogDetailHeader";
import { BlogDetailContent } from "@/components/blog/BlogDetailContent";

// MarkdownRenderer internals are out of unit scope by suite convention (type-scale.test.tsx
// established the passthrough mock); the W1 layout contract is locked at the BlogDetail*
// surface — wrapper widths, meta row, h1 scale, back-link, image frame.
vi.mock("@/components/ui/MarkdownRenderer", () => ({
  MarkdownRenderer: (props: { content: string }) => (
    <div data-testid="markdown-body">{props.content}</div>
  ),
}));

const HEADER_BASE = {
  tags: ["Next.js", "Go"],
  date: "Jul 4, 2026",
  title: "First blog content",
};

describe("BlogDetailHeader (W1 — blog article layout contract)", () => {
  it("keeps a flat root grouping with no nested width/padding constraint (max-w-4xl/px-4 removed)", () => {
    const { container } = render(<BlogDetailHeader {...HEADER_BASE} />);
    const root = container.firstElementChild!;
    expect(root.className).toBe("space-y-8 mb-10");
    expect(root.className).not.toContain("max-w-4xl");
    expect(root.className).not.toContain("px-4");
  });

  it("keeps the back-link to /blog with a leading caret icon", () => {
    const { container } = render(<BlogDetailHeader {...HEADER_BASE} />);
    const link = screen.getByRole("link", { name: /Back to Blog/ });
    expect(link).toHaveAttribute("href", "/blog");
    const caret = link.querySelector("svg");
    expect(caret).not.toBeNull();
    expect(caret).toHaveClass("w-4", "h-4");
    expect(container.textContent).toContain("Back to Blog");
  });

  it("renders a wrapping meta row whose date is icon-anchored, not bare floating text", () => {
    const { container } = render(<BlogDetailHeader {...HEADER_BASE} />);
    const dateSpan = screen.getByText("Jul 4, 2026");
    expect(dateSpan.tagName).toBe("SPAN");
    expect(dateSpan.className).toBe(
      "inline-flex items-center gap-1.5 text-sm font-bold text-foreground/60 whitespace-nowrap"
    );
    // The date text sits inside the same inline-flex element as the calendar icon.
    const calendar = dateSpan.querySelector("svg");
    expect(calendar).not.toBeNull();
    expect(calendar).toHaveClass("w-4", "h-4");
    // The meta row wraps safely on mobile (flex-wrap on both row and tag cluster).
    const metaRow = dateSpan.parentElement!;
    expect(metaRow.className).toBe("flex flex-wrap items-center gap-x-4 gap-y-2");
    expect(metaRow.querySelector("div")!.className).toContain("flex flex-wrap");
    // User-directed override (20260904-233104): byline sits BELOW the h1 —
    // sibling order is pinned as back-link → h1 → meta row.
    const root = container.firstElementChild!;
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(root.children[0].tagName).toBe("A");
    expect(root.children[1]).toBe(h1);
    expect(root.children[2]).toBe(metaRow);
  });

  it("pins the article h1 scale (text-3xl md:text-5xl) with text-balance, not the hero-detail scale", () => {
    render(<BlogDetailHeader {...HEADER_BASE} />);
    const h1 = screen.getByRole("heading", { level: 1, name: "First blog content" });
    expect(h1.className).toBe(
      "text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight text-balance"
    );
    expect(h1.className).not.toContain("text-4xl");
    expect(h1.className).not.toContain("md:text-6xl");
  });

  it("renders the 21/9 rounded-border image frame directly under the root (no nested max-w-4xl/px-4 wrapper) when image is set", () => {
    const { container } = render(<BlogDetailHeader {...HEADER_BASE} image="/cover.png" />);
    const root = container.firstElementChild!;
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(img).toHaveAttribute("src", "/cover.png");
    expect(img).toHaveAttribute("alt", "First blog content");
    const frame = img!.parentElement!;
    expect(frame.className).toBe(
      "relative aspect-[21/9] rounded-2xl overflow-hidden border border-border/40"
    );
    // Frame is a direct child of the flat root — the old wrapper div is gone,
    // and nothing renders after the image (byline stays above it).
    expect(frame.parentElement).toBe(root);
    expect(root.lastElementChild).toBe(frame);
  });

  it("renders no image block when image is absent (conditional edge)", () => {
    const { container } = render(<BlogDetailHeader {...HEADER_BASE} image={undefined} />);
    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(container.querySelector("div[class*='aspect-[21/9]']")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "First blog content" })).toBeInTheDocument();
  });

  it("filters empty and whitespace-only tags and renders no badges for an empty array", () => {
    const { container, rerender } = render(
      <BlogDetailHeader {...HEADER_BASE} tags={["Next.js", "", "   "]} />
    );
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    const badges = Array.from(container.querySelectorAll("div")).filter((d) =>
      d.className.includes("bg-chip/40")
    );
    expect(badges).toHaveLength(1); // chip="tag" badge look survives
    expect(badges[0].className).toContain("text-[13px] font-bold rounded-sm");

    rerender(<BlogDetailHeader {...HEADER_BASE} tags={[]} />);
    expect(container.querySelectorAll("div[class*='bg-chip/40']")).toHaveLength(0);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("survives rerender with new date/title (idempotent remount, no stale text)", () => {
    const { rerender } = render(<BlogDetailHeader {...HEADER_BASE} />);
    rerender(
      <BlogDetailHeader tags={["Go"]} date="Aug 20, 2026" title="Second post" />
    );
    expect(screen.queryByText("Jul 4, 2026")).not.toBeInTheDocument();
    expect(screen.getByText("Aug 20, 2026")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Second post" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "First blog content" })).not.toBeInTheDocument();
  });
});

describe("BlogDetailContent (W1 — prose measure contract)", () => {
  it("pins the full-width prose column aligned with the navbar container edges (no max-w-2xl, no max-w-4xl, no px-4)", () => {
    const { container } = render(<BlogDetailContent content="# Body" />);
    const wrapper = container.firstElementChild!;
    expect(wrapper.className).toBe("w-full");
    expect(wrapper.className).not.toContain("max-w-2xl");
    expect(wrapper.className).not.toContain("max-w-4xl");
    expect(wrapper.className).not.toContain("px-4");
  });

  it("delegates content verbatim to MarkdownRenderer, including the empty-string edge", () => {
    const { container, rerender } = render(<BlogDetailContent content="## Hello world" />);
    expect(screen.getByTestId("markdown-body")).toHaveTextContent("## Hello world");

    rerender(<BlogDetailContent content="" />);
    // Wrapper and renderer remain mounted; empty content renders empty (real renderer's
    // placeholder fallback is its own internals — out of unit scope by convention).
    expect(screen.getByTestId("markdown-body")).toBeInTheDocument();
    expect(screen.getByTestId("markdown-body")).toHaveTextContent("");
    expect(container.firstElementChild!.className).toBe("w-full");
  });
});
