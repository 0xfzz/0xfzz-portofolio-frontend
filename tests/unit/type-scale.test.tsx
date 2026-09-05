import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PageHeader } from "@/components/layout/PageHeader";
import { BlogCard } from "@/components/blog/BlogCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ExperienceItem } from "@/components/experiences/ExperienceItem";
import { CollaboratingCTA } from "@/components/shared/CollaboratingCTA";
import { EducationSection } from "@/components/experiences/EducationSection";
import { AwardsSection } from "@/components/experiences/AwardsSection";
import { ContactCard } from "@/components/contact/ContactCard";
import { ProjectContent } from "@/components/project-details/ProjectContent";
import { ProjectSidebar } from "@/components/project-details/ProjectSidebar";
import { Hero } from "@/components/home/Hero";
import { Badge } from "@/components/ui/badge";

// DownloadCVButton statically imports @react-pdf/renderer (out of unit scope per the plan's
// test strategy) — mock it so Hero/CollaboratingCTA render without the pdf runtime.
vi.mock("@/components/resume/DownloadCVButton", () => ({
  DownloadCVButton: (props: { label?: string }) => <button type="button">{props.label}</button>,
}));
// MarkdownRenderer internals are out of unit scope; ProjectContent's surface here is the
// h4 rung + tech filtering, so the markdown body is a passthrough.
vi.mock("@/components/ui/MarkdownRenderer", () => ({
  MarkdownRenderer: (props: { content: string }) => <div>{props.content}</div>,
}));

// Pinned rung strings from the contract's type-scale table (D9). jsdom has no CSS engine,
// so every assertion pins class strings.
const CARD_TITLE = "text-2xl font-bold tracking-tight leading-tight text-foreground";
const SMALL_CARD = "text-lg font-bold leading-tight text-foreground";
const SECTION_LABEL_H4 = "text-sm font-bold text-foreground";
const LISTING_H1 = "text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight";

describe("PageHeader (W3.2 — AC13)", () => {
  it("renders the pinned listing-h1 string on the h1", () => {
    render(<PageHeader title="Projects That I've Made" />);
    expect(screen.getByRole("heading", { level: 1, name: "Projects That I've Made" }).className).toBe(
      LISTING_H1
    );
  });

  it("renders the subtitle without a weight class (no font-medium/font-bold)", () => {
    render(<PageHeader title="Blog" subtitle="Some subtitle" />);
    const p = screen.getByText("Some subtitle");
    expect(p.className).toBe("text-lg text-muted-foreground leading-relaxed max-w-2xl");
    expect(p.className).not.toContain("font-medium");
    expect(p.className).not.toContain("font-bold");
  });

  it("renders no paragraph when subtitle is absent or empty (falsy-prop edge)", () => {
    for (const subtitle of [undefined, ""]) {
      const { container } = render(<PageHeader title="T" subtitle={subtitle} />);
      expect(container.querySelector("p")).not.toBeInTheDocument();
    }
  });

  it("renders children below the heading block", () => {
    render(
      <PageHeader title="T">
        <div data-testid="filters">chips</div>
      </PageHeader>
    );
    expect(screen.getByTestId("filters")).toBeInTheDocument();
  });
});

describe("BlogCard (W3.3 — AC14)", () => {
  const base = {
    date: "2026-01-01",
    tags: ["React"],
    title: "Post One",
    description: "First post",
    slug: "post-one",
  };

  it("renders the card-title rung without the retired md:text-3xl", () => {
    render(<BlogCard {...base} />);
    const h2 = screen.getByRole("heading", { level: 2, name: "Post One" });
    expect(h2.className).toBe(
      "text-2xl font-bold tracking-tight text-foreground leading-tight group-hover:text-black transition-colors"
    );
    expect(h2.className).not.toContain("md:text-3xl");
    expect(h2.className).toContain("tracking-tight");
    expect(h2.className).toContain("leading-tight");
  });

  it("filters empty and whitespace-only tags (bad-input edge)", () => {
    const { container } = render(<BlogCard {...base} tags={["React", "", "   "]} />);
    expect(container.querySelectorAll("div.flex.items-center.gap-1\\.5 > div")).toHaveLength(1);
  });

  it("renders no tag badges and a valid link when tags is empty", () => {
    const { container } = render(<BlogCard {...base} tags={[]} />);
    expect(container.querySelectorAll("div[class*='overflow-x-auto'] > div")).toHaveLength(0);
    const link = screen.getByRole("link", { name: /Post One/ });
    expect(link).toHaveAttribute("href", "/blog/post-one");
  });
});

describe("ProjectCard (W3.3 — AC14)", () => {
  const base = {
    title: "Proj One",
    description: "First project",
    slug: "proj-one",
    technologies: ["Next.js"],
  };

  it("renders the card-title rung with tracking-tight + leading-tight", () => {
    render(<ProjectCard {...base} />);
    const h3 = screen.getByRole("heading", { level: 3, name: "Proj One" });
    expect(h3.className).toBe(
      `${CARD_TITLE} group-hover:text-black transition-colors`
    );
  });

  it("renders the overlay-sm chip path without an image and filters whitespace techs", () => {
    const { container } = render(<ProjectCard {...base} technologies={["", "  ", "Next.js", "Go"]} />);
    expect(container.querySelector("img")).not.toBeInTheDocument();
    const chips = container.querySelectorAll("div.mb-6.flex > div");
    expect(chips).toHaveLength(1); // slice(0, 1) after filtering
    expect(chips[0].className).toContain("bg-chip text-foreground"); // overlay tail, token names
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.queryByText("Go")).not.toBeInTheDocument();
  });

  it("renders the overlay chip path with an image (next/image mocked in setup)", () => {
    const { container } = render(<ProjectCard {...base} image="/cover.png" />);
    expect(container.querySelector("img")).toBeInTheDocument();
    const chips = container.querySelectorAll("div.absolute > div");
    expect(chips).toHaveLength(1);
    expect(chips[0].className).toContain("bg-chip text-foreground");
  });

  it("renders no chips when technologies is empty (empty-input edge)", () => {
    const { container } = render(<ProjectCard {...base} technologies={[]} />);
    expect(container.querySelectorAll("div.mb-6.flex > div")).toHaveLength(0);
    expect(screen.getByRole("heading", { level: 3, name: "Proj One" })).toBeInTheDocument();
  });
});

describe("ExperienceItem (W3.3 — AC14)", () => {
  const base = {
    role: "Backend Engineer",
    company: "Acme",
    period: "2024 — now",
    description: ["Shipped thing", "", "   "],
    tags: ["Go", ""],
  };

  it("renders the card-title rung on the role h3", () => {
    render(<ExperienceItem {...base} />);
    expect(screen.getByRole("heading", { level: 3, name: "Backend Engineer" }).className).toBe(
      CARD_TITLE
    );
  });

  it("filters empty/whitespace description points and tags (bad-input edge)", () => {
    const { container } = render(<ExperienceItem {...base} />);
    expect(container.querySelectorAll("ul > li")).toHaveLength(1);
    expect(container.querySelectorAll("div.flex.flex-wrap > div")).toHaveLength(1); // badges
    expect(screen.getByText("Go")).toBeInTheDocument();
  });

  it("renders no bullets or badges for empty arrays (empty-input edge)", () => {
    const { container } = render(
      <ExperienceItem role="R" company="C" period="P" description={[]} tags={[]} />
    );
    expect(container.querySelectorAll("ul > li")).toHaveLength(0);
    expect(screen.getByRole("heading", { level: 3, name: "R" })).toBeInTheDocument();
  });
});

describe("CollaboratingCTA (W3.3 — AC14)", () => {
  it("renders the card-title rung with mb-3 and the mocked CV button label", () => {
    render(<CollaboratingCTA />);
    const h3 = screen.getByRole("heading", { level: 3, name: "Interested in collaborating?" });
    expect(h3.className).toBe(`${CARD_TITLE} mb-3`);
    expect(screen.getByRole("button", { name: "Download Resume" })).toBeInTheDocument();
    expect(screen.getByText("Get in Touch")).toBeInTheDocument();
  });

  it("honors custom props (no defaults leak)", () => {
    render(<CollaboratingCTA title="Hire me" description="Custom" secondaryActionLabel="Email" />);
    expect(screen.getByRole("heading", { level: 3, name: "Hire me" })).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.queryByText("Interested in collaborating?")).not.toBeInTheDocument();
  });
});

describe("EducationSection (W3.4 — AC15 + small-card rung)", () => {
  it("renders the section-label h4 rung (text-sm, no text-[13px]) and the small-card title rung", () => {
    render(
      <EducationSection
        data={[{ institution: "ITU", degree: "BSc", period: "2019", location: "Jakarta" }]}
      />
    );
    const h4 = screen.getByRole("heading", { level: 4, name: "Education" });
    expect(h4.className).toBe(`${SECTION_LABEL_H4} mb-6`);
    expect(h4.className).not.toContain("text-[13px]");
    const h3 = screen.getByRole("heading", { level: 3, name: "ITU" });
    expect(h3.className).toBe(SMALL_CARD);
  });

  it("renders no entries for an empty data array (empty-input edge)", () => {
    render(<EducationSection data={[]} />);
    expect(screen.getByRole("heading", { level: 4, name: "Education" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 3 })).not.toBeInTheDocument();
  });
});

describe("AwardsSection (W3.4 — AC15)", () => {
  it("renders the section-label h4 rung (text-sm, no text-[13px]) and the small-card title rung", () => {
    render(
      <AwardsSection
        data={[{ title: "Winner", issuer: "Google", date: "2025", description: "Cloud comp" }]}
      />
    );
    const h4 = screen.getByRole("heading", { level: 4, name: "Awards & Recognitions" });
    expect(h4.className).toBe(`${SECTION_LABEL_H4} mb-6`);
    expect(h4.className).not.toContain("text-[13px]");
    expect(screen.getByRole("heading", { level: 3, name: "Winner" }).className).toBe(
      "text-lg font-bold text-foreground leading-tight"
    );
  });

  it("renders no cards for an empty data array (empty-input edge)", () => {
    render(<AwardsSection data={[]} />);
    expect(screen.getByRole("heading", { level: 4, name: "Awards & Recognitions" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 3 })).not.toBeInTheDocument();
  });
});

describe("ContactCard (W3.4 — small-card rung)", () => {
  const FakeIcon = (props: { className?: string; weight?: string }) => (
    <svg data-testid="fake-icon" className={props.className} />
  );

  it("renders the small-card title rung with leading-tight and mb-2", () => {
    render(
      <ContactCard icon={FakeIcon} title="Email" subtext="me@example.com" href="mailto:me@example.com" />
    );
    const h3 = screen.getByRole("heading", { level: 3, name: "Email" });
    expect(h3.className).toBe(`${SMALL_CARD} mb-2`);
    expect(screen.getByTestId("fake-icon")).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "mailto:me@example.com");
    expect(link).toHaveAttribute("target", "_blank");
  });
});

describe("ProjectContent (W3.4 — AC15)", () => {
  it("renders the section-label h4 rung without opacity-80", () => {
    render(<ProjectContent technologies={["Go", "", "  "]} content="# Body" />);
    const h4 = screen.getByRole("heading", { level: 4, name: "Technologies Leveraged" });
    expect(h4.className).toBe(`${SECTION_LABEL_H4} mb-4`);
    expect(h4.className).not.toContain("opacity-80");
    expect(screen.getByText("# Body")).toBeInTheDocument(); // mocked passthrough
  });

  it("filters empty/whitespace technologies and renders no spans for an empty list", () => {
    const { container, rerender } = render(<ProjectContent technologies={["Go", "  "]} content="" />);
    expect(container.querySelectorAll("section > div > span")).toHaveLength(1);
    rerender(<ProjectContent technologies={[]} content="" />);
    expect(container.querySelectorAll("section > div > span")).toHaveLength(0);
  });
});

describe("ProjectSidebar (W3.4 — AC15)", () => {
  it("renders the section-label h4 rung without opacity-80 and no mb class", () => {
    render(<ProjectSidebar />);
    const h4 = screen.getByRole("heading", { level: 4, name: "Core Actions" });
    expect(h4.className).toBe(SECTION_LABEL_H4);
    expect(h4.className).not.toContain("opacity-80");
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders one link per provided URL (both-url edge)", () => {
    render(<ProjectSidebar liveUrl="https://x.dev" sourceUrl="https://github.com/x" />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "https://x.dev");
    expect(links[1]).toHaveAttribute("href", "https://github.com/x");
    expect(screen.getByText("Live Demo")).toBeInTheDocument();
    expect(screen.getByText("Source Code")).toBeInTheDocument();
  });
});

describe("Hero (AC16 — pinned display exception, read-only guardrail)", () => {
  const base = {
    data: { title: "Hi There Folks", subtitle: "Backend engineer" },
    resumeData: {},
    resumeLabel: "Download Resume",
    name: "Faiz",
    images: {},
  };

  it("keeps leading-[1.1] + md:text-8xl on every per-word h1 with the weight alternation", () => {
    render(<Hero {...base} />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(3); // one h1 per word
    h1s.forEach((h1) => {
      expect(h1.className).toContain("text-5xl md:text-8xl tracking-tight leading-[1.1] text-foreground");
      expect(h1.className).not.toContain("leading-tight");
    });
    expect(h1s[1].className).toContain("font-normal");
    expect(h1s[1].className).not.toContain("font-extrabold");
    expect(h1s[0].className).toContain("font-extrabold");
    expect(h1s[2].className).toContain("font-extrabold");
  });

  it("renders the canonical lede without a weight class", () => {
    render(<Hero {...base} />);
    const lede = screen.getByText("Backend engineer");
    expect(lede.className).toBe("text-lg md:text-xl text-muted-foreground mb-6 max-w-xl leading-relaxed");
    expect(lede.className).not.toContain("font-");
  });

  it("renders a single font-extrabold h1 for a one-word title (single-element boundary)", () => {
    render(<Hero {...base} data={{ title: "Hi", subtitle: "S" }} />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0].className).toContain("font-extrabold");
  });
});

describe("Badge chip-axis semantics (badge-variants EXPECTED map guardrail)", () => {
  // Semantic redundancy for the pinned byte-tests in badge-variants.test.tsx: the 9-chip
  // contract set and the merge contract (variant="secondary" contributes hover:bg-secondary/20
  // to every chip EXCEPT filter-inactive, whose own hover:bg-chip wins last).
  const CHIPS = [
    "overlay",
    "overlay-sm",
    "stack-lg",
    "meta-tag",
    "tag",
    "tag-sm",
    "experience",
    "filter-active",
    "filter-inactive",
  ] as const;

  it("renders exactly the wiki's 9-chip contract set with the merge contract intact", () => {
    for (const chip of CHIPS) {
      const { container } = render(
        <Badge variant="secondary" chip={chip}>
          {chip}
        </Badge>
      );
      const cls = container.firstElementChild!.className;
      expect(cls).toContain("focus:ring-ring");
      if (chip === "filter-inactive") {
        expect(cls).toContain("hover:bg-chip");
        expect(cls).not.toContain("hover:bg-secondary/20");
      } else {
        expect(cls).toContain("hover:bg-secondary/20");
      }
    }
  });

  it("an unknown chip key degrades to the plain secondary variant (cva fallback edge)", () => {
    const { container } = render(
      <Badge variant="secondary" chip={"nonexistent" as never}>
        x
      </Badge>
    );
    // cva drops the unresolvable chip key, leaving plain variant="secondary" output.
    expect(container.firstElementChild!.className).toContain("bg-secondary/10 text-secondary");
    expect(container.firstElementChild!.className).not.toContain("bg-primary");
  });
});
