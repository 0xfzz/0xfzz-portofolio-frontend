// CSS compile probe: vitest/tsc never compile globals.css, so only a real
// Tailwind compile catches a broken @apply/@theme pairing.
import { readFile } from "node:fs/promises";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
try {
  await postcss([tailwindcss()]).process(css, { from: "app/globals.css" });
  console.log("globals.css compiled OK");
} catch (err) {
  console.error("globals.css FAILED to compile:\n", err.message ?? err);
  process.exit(1);
}
