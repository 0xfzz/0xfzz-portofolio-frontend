import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AboutMe } from "@/components/home/AboutMe";
import { TechStack } from "@/components/home/TechStack";
import { Projects } from "@/components/home/Projects";
import type { Project } from "@/lib/types";

// W2 + AC10/AC12: the three home h2s share the identical pinned "Section h2" typography
// string (contract D9) and differ only in the relocated margin (mb-8 AboutMe, mb-4
// TechStack/Projects — spacing, not typography). jsdom has no CSS engine, so all
// assertions pin class strings. Icons are phosphor SSR components (render <svg>).
const SECTION_H2 =
  "text-4xl md:text-[2.75rem] font-bold tracking-tight leading-tight text-foreground";
const SUBTITLE = "text-muted-foreground text-lg leading-relaxed";

const techData = {
  title: "Core Tech Stack",
  subtitle: "What I work with",
  skills: { hard: ["Go", "", "   ", "Docker"], soft: [], tools: [] },
  expertise: [
    { title: "Backend", icon: "Layers" },
    { title: "Mystery", icon: "NotARealIcon" },
  ],
};

const projectFixtures: Project[] = [
  {
    title: "Proj One",
    description: "First",
    slug: "proj-one",
    technologies: ["Go"],
    body: "body",
  },
  {
    title: "Proj Two",
    description: "Second",
    slug: "proj-two",
    technologies: ["Docker"],
    body: "body",
  },
  {
    title: "Proj Three",
    description: "Third",
    slug: "proj-three",
    technologies: ["K8s"],
    body: "body",
  },
  {
    title: "Proj Four",
    description: "Fourth",
    slug: "proj-four",
    technologies: ["Terraform"],
    body: "body",
  },
];

describe("AboutMe (W2.1 + W3.5)", () => {
  it("renders the pinned h2 string with relocated mb-8 and no font-sans on the subtitle", () => {
    const { container } = render(<AboutMe summary="Hello" />);
    const h2 = screen.getByRole("heading", { level: 2, name: "About Me" });
    expect(h2.className).toBe(`${SECTION_H2} mb-8`);
    expect(h2.parentElement!.className).toBe("text-left w-full"); // icon wrapper unwrapped (AC9)
    const subtitle = container.querySelector("div.text-left > div > p")!.className;
    expect(subtitle).toBe("whitespace-pre-line"); // summary p carries no typography classes
    expect(container.querySelector("div.text-left > div")!.className).toBe(
      "text-muted-foreground text-lg leading-relaxed space-y-6 w-full"
    );
  });

  it("renders zero svg elements — heading icon fully removed (AC7)", () => {
    const { container } = render(<AboutMe summary="Hello" />);
    expect(container.querySelectorAll("svg")).toHaveLength(0);
  });

  it("renders an empty summary without crashing (empty-input edge)", () => {
    const { container } = render(<AboutMe summary="" />);
    expect(screen.getByRole("heading", { level: 2, name: "About Me" })).toBeInTheDocument();
    expect(container.querySelector("p.whitespace-pre-line")).toBeInTheDocument();
  });
});

describe("TechStack (W2.2 + W3.5)", () => {
  it("renders the pinned h2 string with relocated mb-4 and the canonical subtitle", () => {
    render(<TechStack data={techData} />);
    const h2 = screen.getByRole("heading", { level: 2, name: "Core Tech Stack" });
    expect(h2.className).toBe(`${SECTION_H2} mb-4`);
    expect(h2.parentElement!.className).toBe("max-w-xl text-left"); // wrapper unwrapped (AC9)
  });

  it("keeps the heading block icon-free while expertise tiles stay iconed (AC7/AC8)", () => {
    const { container } = render(<TechStack data={techData} />);
    expect(container.querySelector("div.max-w-xl")!.querySelectorAll("svg")).toHaveLength(0);
    // 2 expertise tiles → known "Layers" icon + unknown-key fallback both resolve (ICON_MAP guardrail)
    expect(container.querySelectorAll("svg")).toHaveLength(2);
  });

  it("labels expertise tiles with the canonical section-label h3 rung", () => {
    const { container } = render(<TechStack data={techData} />);
    const labels = container.querySelectorAll("h3");
    expect(labels).toHaveLength(2);
    for (const label of labels) {
      expect(label.className).toBe("text-sm font-bold text-foreground");
    }
  });

  it("filters empty and whitespace-only skills and renders the pinned stack-lg chip token names", () => {
    const { container } = render(<TechStack data={techData} />);
    const badges = container.querySelectorAll("div.flex.flex-wrap.gap-3 > div");
    expect(badges).toHaveLength(2); // "" and "   " dropped
    expect(screen.getByText("Go")).toBeInTheDocument();
    expect(screen.getByText("Docker")).toBeInTheDocument();
    for (const badge of badges) {
      expect(badge.className).toContain("bg-chip/80 text-foreground"); // stack-lg tail, token names
    }
  });

  it("renders zero badges when every skill is empty (empty-input edge)", () => {
    const { container } = render(
      <TechStack
        data={{
          title: "T",
          subtitle: "S",
          skills: { hard: ["", "   "], soft: [], tools: [] },
          expertise: [],
        }}
      />
    );
    expect(container.querySelectorAll("div.flex.flex-wrap.gap-3 > div")).toHaveLength(0);
    expect(container.querySelectorAll("svg")).toHaveLength(0); // no expertise items either
  });
});

describe("Projects (W2.3 + W3.5)", () => {
  it("renders the pinned h2 string with relocated mb-4 and the canonical subtitle", () => {
    const { container } = render(<Projects projects={projectFixtures} />);
    const h2 = screen.getByRole("heading", { level: 2, name: "Featured Projects" });
    expect(h2.className).toBe(`${SECTION_H2} mb-4`);
    expect(h2.parentElement!.className).toBe("max-w-xl"); // wrapper unwrapped (AC9)
    expect(container.querySelector("div.max-w-xl > p")!.className).toBe(SUBTITLE);
    expect(container.querySelector("div.max-w-xl")!.querySelectorAll("svg")).toHaveLength(0);
  });

  it("renders at most 3 ProjectCards (slice(0, 3) boundary)", () => {
    const { container } = render(<Projects projects={projectFixtures} />);
    const cards = container.querySelectorAll("div.grid > div");
    expect(cards).toHaveLength(3);
    expect(screen.getByRole("heading", { level: 3, name: "Proj One" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Proj Three" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 3, name: "Proj Four" })).not.toBeInTheDocument();
  });

  it("renders no cards when the list is empty (empty-input edge)", () => {
    const { container } = render(<Projects projects={[]} />);
    expect(container.querySelectorAll("div.grid > div")).toHaveLength(0);
    expect(
      screen.getByRole("heading", { level: 2, name: "Featured Projects" })
    ).toBeInTheDocument();
  });

  it("honors custom title/subtitle props", () => {
    render(<Projects projects={[]} title="Work" subtitle="Custom lede" />);
    expect(screen.getByRole("heading", { level: 2, name: "Work" })).toBeInTheDocument();
    expect(screen.getByText("Custom lede")).toBeInTheDocument();
  });
});
