// CSS-compile-probe unit check (plan D10): scripts/verify-css.mjs is the run gate that
// catches broken @apply/@theme pairings vitest/tsc cannot see. This exercises the script as
// a unit — spawn + exit code + stdout — on both paths: exit 0/"compiled OK" for the real
// globals.css, exit 1 for a deliberately broken @theme fixture. The probe reads
// ../app/globals.css relative to its own location, so the failure fixture is sandboxed in a
// temp dir whose scripts/ copy symlinks the repo's node_modules (postcss must resolve) and
// whose app/globals.css is the broken input. No network, no browser.
import { execFile } from "node:child_process";
import {
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

// Vitest processes this file, so import.meta.url is not a file URL; resolve from the
// manifest-relative cwd instead.
const repoRoot = process.cwd();
const probePath = path.join(repoRoot, "scripts", "verify-css.mjs");

type RunResult = { code: number; out: string };

function runScript(scriptPath: string, cwd: string): Promise<RunResult> {
  return new Promise((resolve) => {
    execFile("bun", [scriptPath], { cwd, timeout: 120_000 }, (err, stdout, stderr) => {
      const code =
        err && typeof (err as { code?: number }).code === "number"
          ? (err as { code: number }).code
          : err
            ? 1
            : 0;
      resolve({ code, out: `${stdout}${stderr}` });
    });
  });
}

const tempRoots: string[] = [];

afterEach(async () => {
  while (tempRoots.length) {
    const root = tempRoots.pop()!;
    await rm(root, { recursive: true, force: true });
  }
});

describe("verify-css.mjs probe contract (D10)", () => {
  it("prints 'globals.css compiled OK' and exits 0 on the real app/globals.css", async () => {
    const { code, out } = await runScript(probePath, repoRoot);
    expect(code).toBe(0);
    expect(out).toContain("globals.css compiled OK");
    expect(out).not.toContain("FAILED");
  });

  it("exits 1 with the failure message on a broken @apply/@theme pairing", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "verify-css-probe-"));
    tempRoots.push(root);
    await mkdir(path.join(root, "scripts"), { recursive: true });
    await mkdir(path.join(root, "app"), { recursive: true });
    await copyFile(probePath, path.join(root, "scripts", "verify-css.mjs"));
    // Pairing break of the exact class the probe exists to catch: @apply referencing a
    // utility whose token does not exist (the W3.1 failure shape). The fixture deliberately
    // avoids the retired font name so this file itself stays out of the AC11 grep gate.
    const broken =
      '@import "tailwindcss";\n@theme {\n  --font-sans: ui-sans-serif, system-ui, sans-serif;\n}\nh1 { @apply bg-token-that-does-not-exist; }\n';
    await writeFile(path.join(root, "app", "globals.css"), broken, "utf8");
    // bun resolves bare imports relative to the script file, not cwd — give the sandbox the
    // real node_modules so the postcss import resolves and ONLY the CSS is broken.
    await symlink(path.join(repoRoot, "node_modules"), path.join(root, "node_modules"), "dir");
    const { code, out } = await runScript(path.join(root, "scripts", "verify-css.mjs"), root);
    expect(code).toBe(1);
    expect(out).toContain("globals.css FAILED to compile");
  });

  it("probe input is the live app/globals.css (the W3.1 removal is what it must gate)", async () => {
    const source = await readFile(path.join(repoRoot, "app", "globals.css"), "utf8");
    expect(source).toContain("@theme");
    // W3.1: the @theme block declares exactly Inter (sans) + Fira Code (mono) — the third
    // font entry is gone. Structural check, so this file carries no retired-font literal.
    const fontTokens = [...source.matchAll(/--font-[a-z-]+(?=\s*:)/g)].map((m) => m[0]);
    expect(fontTokens).toEqual(["--font-sans", "--font-mono"]);
  });
});
