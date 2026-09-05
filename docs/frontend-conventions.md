# Frontend Conventions — 0xfzz-portofolio-frontend

Binding conventions for UI code in this repo. Established during the unify-portfolio-components run (20260903-220510); recompressed to the compact scale by the ui-compact-polish run (20260904-191406). Keep them for every new component and edit.

## Pinned scale

The only allowed values for touched code. Reuse these exact class strings instead of inventing new ones.

| Concern | Pinned classes |
|---|---|
| Container | `container mx-auto max-w-5xl px-4 md:px-8` |
| Page rhythm | `pt-20 pb-12 md:pt-28 md:pb-16` |
| Section rhythm | `py-10 md:py-14` |
| Grid gaps | `gap-6` (single-col lists) · `gap-8` (card grids) |
| Card padding | `p-6` (text cards) · `p-4` (image cards) · `p-6` (expertise/CTA tiles) |
| Heading → content | `mb-8 md:mb-10` |

Reference implementations: `components/layout/PageContainer.tsx` (container + page rhythm), `components/home/{AboutMe,TechStack,Projects}.tsx` (section rhythm), `components/layout/PageHeader.tsx` (heading rhythm).

## Pinned type scale

Established by the blue-trio rebrand run (20260904-214756). One family: Inter everywhere via `body` `font-sans` inheritance — no per-component font classes. Fira Code stays for code (`--font-mono`) plus one deliberate brand exception: the `0xfzz` logo mark in `components/navbar/Logo.tsx` keeps its inline Fira Code styling. One line-height rule: `leading-tight` on pinned headings; the Hero display h1's `leading-[1.1]` is the single pinned exception (per-word flex boxes need it at `md:text-8xl`). Subtitles carry no weight class.

| Rung | Pinned classes |
|---|---|
| Hero display h1 | `text-5xl md:text-8xl tracking-tight leading-[1.1] text-foreground` + per-word `font-extrabold`/`font-normal` |
| Detail h1 | `text-4xl md:text-6xl font-bold tracking-tight leading-tight text-foreground` |
| Listing h1 | `text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight` |
| Section h2 | `text-4xl md:text-[2.75rem] font-bold tracking-tight leading-tight text-foreground` |
| Card title | `text-2xl font-bold tracking-tight leading-tight text-foreground` |
| Small-card title | `text-lg font-bold leading-tight text-foreground` |
| Section-label h4 | `text-sm font-bold text-foreground` |
| Subtitle | `text-lg text-muted-foreground leading-relaxed` (no weight class) |
| Lede (hero/detail only) | `text-lg md:text-xl text-muted-foreground leading-relaxed` |

Naming debt (deliberate, do not "fix" silently): `--color-primary` and `--color-secondary` both revalued to `#0000E6` in this run — the token names predate the rebrand and are byte-pinned by unit tests; renaming either breaks ~20 pinned assertions and is its own future sign-off.

## Sentence case

Screen UI must be sentence case: **no `uppercase` and no `tracking-wide[rst]` classes anywhere in `app/`, `components/`, or `lib/`** — the paired wide tracking only existed to letter-space the uppercase look. `lib/cv/ResumePDF.tsx` is exempt (the PDF keeps its `textTransform: "uppercase"`). `tracking-tight` on large headings is fine (opposite direction). Mechanical gate:

```bash
rg -n 'uppercase|tracking-wider|tracking-widest|tracking-wide' app components lib --glob '!lib/cv/ResumePDF.tsx'   # expected: zero hits
```

## Component conventions

- **Primitive-first.** Never raw-override shared primitives with `className` for looks that can be named: extend the primitive with a variant instead. Example: the `chip` axis on `components/ui/badge.tsx` — call sites pass `chip="overlay"`, they don't spell out `bg-… px-… rounded-…`. Raw `className` on `Badge`/`Button` is reserved for one-off geometry, not color/typography overhauls.
- **Tokens over hex.** `@theme` color tokens in `app/globals.css` are the single source of truth (`--color-*` namespace, lowercase kebab). No raw hex values in TSX `className` strings. JSX inline style objects (react-pdf, react-syntax-highlighter, mermaid `themeVariables`) are out of scope for this rule.
- **`cn()` is `twMerge(clsx(...))`** (`lib/utils.ts`) — last-wins per tailwind-merge conflict group. A later class only replaces an earlier one when twMerge considers them the same group; modifier-prefixed classes (`hover:bg-*`) only conflict within the same modifier. Don't hand-compute merge output — assert it in tests if parity matters.
- **Tag-filtered lists** use `components/shared/TagFilterHeader.tsx` (header + filter chips) and `components/shared/TagFilterGrid.tsx` (single filter state, grid, empty state). Don't re-implement `useState("All")` filtering anywhere else.

## Known exceptions (deliberate, do not "fix" silently)

1. **Blog detail route `px-4` pair — resolved by scale (20260904-191406).** The new pinned container padding *is* `px-4 md:px-8`, so the inner `px-4` blocks in `app/blog/[slug]/page.tsx`, `app/blog/[slug]/loading.tsx`, `components/blog/BlogDetailHeader.tsx`, and `BlogDetailContent.tsx` now coincide with the scale. Nothing left to sign off; kept here as a historical record, not an open exception.
2. **`components/project-details/ProjectContent.tsx` raw `<span>` chips** — the "Technologies Leveraged" chips are raw spans with bespoke classes, not `Badge`. Exact class parity beat unification in the unify run (D6). The spans are now sentence case (de-uppercased in place by the ui-compact-polish run) but remain raw spans — do not migrate them to `Badge` silently.
3. **`hover:border-border-hover` no-op** — `components/blog/BlogCard.tsx` references a `border-hover` token that does not exist in `@theme`; the class silently does nothing. Recorded as a NIT; removing it or adding the token is a separate sign-off (D7).
4. **Keyword color classes stay** — `group-hover:text-black`, `text-white`, etc. are allowed as-is; the zero-hex rule covers hex literals only.
5. **Hero commented-out image block** — `components/home/Hero.tsx` carries a commented-out JSX block; its className references tokenized colors only. Keep the block hex-free if it is ever edited or re-enabled.
