// tests/setup.tsx
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest"; // enables toBeInTheDocument / not.toBeInTheDocument matchers

// vitest globals are disabled (explicit imports only) — RTL's auto-cleanup hook never registers,
// so unmount explicitly after each test.
afterEach(() => {
  cleanup();
});
import type { ComponentProps } from "react";

// next/image: jsdom-safe passthrough; all call sites pass fill or width/height
vi.mock("next/image", () => ({
  default: (props: ComponentProps<"img"> & { fill?: boolean; priority?: boolean }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fill: _f, priority: _p, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...rest} />;
  },
}));
// next/link needs no mock (renders <a>); mermaid/@phosphor/react are out of test scope.
