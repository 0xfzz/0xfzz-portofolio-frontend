import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageContainer } from "@/components/layout/PageContainer";

// Pins the canonical PageContainer base string (ui-compact-polish run 20260904-191406):
// default render carries the max-w-5xl cap + px-4 md:px-8 padding + the compressed page
// rhythm, with no min-h bloat; the optional maxWidth prop overrides the base via twMerge
// last-wins (D1) — captured from actual rendered className, never hand-derived.

describe("PageContainer", () => {
  it("renders the canonical base string by default (max-w-5xl cap, compact rhythm, no min-h)", () => {
    const { container } = render(<PageContainer>children</PageContainer>);
    const className = container.firstElementChild!.className;
    // Byte-pinned (parity method): captured from actual rendered output — vitest failure diff is the
    // capture channel. Tightened by QA (20260904-191406 cycle 1) from fragment containment to full
    // string equality so no extra/dropped token can slip past the canonical-string contract.
    expect(className).toBe(
      "pt-20 pb-12 md:pt-28 md:pb-16 container mx-auto max-w-5xl px-4 md:px-8"
    );
    expect(className).toContain("max-w-5xl");
    expect(className).toContain("container");
    expect(className).toContain("px-4 md:px-8");
    expect(className).toContain("md:pt-28 md:pb-16");
    expect(className).not.toContain("min-h-[70vh]");
  });

  it("lets maxWidth override the default cap via twMerge (max-w-none renders without max-w-5xl)", () => {
    const { container } = render(<PageContainer maxWidth="max-w-none">children</PageContainer>);
    const className = container.firstElementChild!.className;
    expect(className).toContain("max-w-none");
    expect(className).not.toContain("max-w-5xl");
  });
});
