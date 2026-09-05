// Parity baseline: cn(badgeVariants({ variant: "secondary" }), <legacy raw override>) captured in Phase 0,
// token-mapped 1:1 (hex → same-value token). Token map (values verified against app/globals.css @theme):
//   #B2BDC8→chip · #323235→foreground · #777E65→secondary · #f3f4f6→accent · #5F5F61→muted-foreground
// 20260904-214756 blue-trio rebrand: token VALUES revalued in @theme (chip→#e5e7eb, secondary→#0000E6, plus
// background/foreground/primary/accent-foreground/border-subtle/link per the run's token map); class strings
// unchanged — the token map above records the Phase-0 capture era, not current rendered values.
// Full legacy captures (recorded verbatim from the Phase-0 one-off capture script):
//   overlay:        "inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/20 bg-[#B2BDC8] text-[#323235] border-none px-3 py-1 text-[12px] font-bold uppercase tracking-wider rounded-sm shadow-sm"
//   overlay-sm:     same head, tail: "bg-[#B2BDC8] text-[#323235] border-none px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-sm"
//   stack-lg:       same head, tail: "px-6 py-3 text-sm font-bold bg-[#B2BDC8]/80 text-[#323235] border-none rounded-xl"
//   meta-tag:       same head, tail: "bg-[#B2BDC8]/40 text-[#323235] border-none px-2.5 py-0.5 text-[12px] font-bold uppercase tracking-wider rounded-sm whitespace-nowrap"
//   tag:            same head, tail: "bg-[#B2BDC8]/40 text-[#323235] border-none px-3 py-1 text-[13px] font-bold uppercase tracking-wider rounded-sm"
//   tag-sm:         same head, tail: "bg-[#B2BDC8]/40 text-[#323235] border-none px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-sm"
//   experience:     same head, tail: "bg-[#f3f4f6] text-[#5F5F61] border-none px-3 py-0.5 text-[12px] font-bold rounded-md"
//   filter-active:  "inline-flex items-center border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/20 px-5 py-2 text-xs font-bold rounded-md transition-all cursor-pointer border-none bg-[#777E65] text-white"
//   filter-inactive: "inline-flex items-center border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent px-5 py-2 text-xs font-bold rounded-md transition-all cursor-pointer border-none bg-[#B2BDC8]/80 text-[#323235] hover:bg-[#B2BDC8]"
// Merge nuance preserved by the chip axis (D13): variant="secondary" contributes hover:bg-secondary/20 +
// border-transparent; tailwind-merge lets a plain bg-*/border-none coexist with the modified hover:bg-secondary/20,
// so it appears in every captured string EXCEPT filter-inactive, where the override's own hover:bg-* conflicts
// and wins (last-wins). filter-* also replace transition-colors with transition-all (same group, last-wins).
// 20260904-191406 ui-compact-polish: uppercase/tracking stripped from all chips; EXPECTED re-captured post-strip
// (the five chip strings below were pasted verbatim from vitest's actual rendered output after the badge.tsx
// strip — never hand-derived; the Phase-0 legacy captures above remain the historical record).
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Badge } from "@/components/ui/badge";

const BASE =
  "inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
const SECONDARY = " border-transparent hover:bg-secondary/20";
const BASE_HEADER = "inline-flex items-center border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

// Token-mapped effective strings (hex→same-value token), 1:1 with the Phase-0 legacy capture.
const EXPECTED: Record<string, string> = {
  // Post-strip captures pasted verbatim from vitest actual rendered output (20260904-191406).
  overlay: `${BASE}${SECONDARY} bg-chip text-foreground border-none px-3 py-1 text-[12px] font-bold rounded-sm shadow-sm`,
  "overlay-sm": `${BASE}${SECONDARY} bg-chip text-foreground border-none px-3 py-1 text-[10px] font-bold rounded-sm shadow-sm`,
  "stack-lg": `${BASE}${SECONDARY} px-6 py-3 text-sm font-bold bg-chip/80 text-foreground border-none rounded-xl`,
  "meta-tag": `${BASE}${SECONDARY} bg-chip/40 text-foreground border-none px-2.5 py-0.5 text-[12px] font-bold rounded-sm whitespace-nowrap`,
  tag: `${BASE}${SECONDARY} bg-chip/40 text-foreground border-none px-3 py-1 text-[13px] font-bold rounded-sm`,
  "tag-sm": `${BASE}${SECONDARY} bg-chip/40 text-foreground border-none px-3 py-1 text-[11px] font-bold rounded-sm`,
  experience: `${BASE}${SECONDARY} bg-accent text-muted-foreground border-none px-3 py-0.5 text-[12px] font-bold rounded-md`,
  "filter-active": `${BASE_HEADER} border-transparent hover:bg-secondary/20 px-5 py-2 text-xs font-bold rounded-md transition-all cursor-pointer border-none bg-secondary text-white`,
  "filter-inactive": `${BASE_HEADER} border-transparent px-5 py-2 text-xs font-bold rounded-md transition-all cursor-pointer border-none bg-chip/80 text-foreground hover:bg-chip`,
};

describe("Badge chip variants render pinned class strings", () => {
  const chips = Object.keys(EXPECTED) as Array<
    "overlay" | "overlay-sm" | "stack-lg" | "meta-tag" | "tag" | "tag-sm" | "experience" | "filter-active" | "filter-inactive"
  >;
  for (const chip of chips) {
    it(chip, () => {
      const { container } = render(
        <Badge variant="secondary" chip={chip}>
          {chip}
        </Badge>
      );
      expect(container.firstElementChild!.className).toBe(EXPECTED[chip]);
    });
  }
});

describe("Badge non-chip consumers stay byte-identical (additive axis)", () => {
  // Legacy variants must be untouched by the chip axis — no chip prop, no chip in defaultVariants.
  it.each([
    ["default", "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"],
    ["secondary", "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary/10 text-secondary hover:bg-secondary/20"],
    ["destructive", "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80"],
    ["outline", "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"],
  ] as const)("%s variant output unchanged", (variant, expected) => {
    const { container } = render(<Badge variant={variant}>x</Badge>);
    expect(container.firstElementChild!.className).toBe(expected);
  });

  // Contract: Badge renders a <div> (not <span>) and spreads props, so onClick passes through.
  it("renders a div and passes onClick through", () => {
    const onClick = vi.fn();
    const { container, getByText } = render(
      <Badge variant="secondary" chip="filter-inactive" onClick={onClick}>
        React
      </Badge>
    );
    expect(container.firstElementChild!.tagName).toBe("DIV");
    fireEvent.click(getByText("React"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("still merges an explicit className last-wins on top of the variant", () => {
    const { container } = render(<Badge variant="secondary" className="mt-2">x</Badge>);
    expect(container.firstElementChild!.className).toBe(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary/10 text-secondary hover:bg-secondary/20 mt-2"
    );
  });
});

