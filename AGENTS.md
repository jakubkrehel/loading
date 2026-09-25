# AGENTS.md

This file is the single source of guidance for coding agents working in this repository. `CLAUDE.md` imports it and adds nothing but Claude Code specifics, so put repository facts here and do not maintain a second copy.

Note that `apps/web/AGENTS.md` and `examples/consumer/AGENTS.md` exist but are not yours to write — they hold only the managed `nextjs-agent-rules` block that `next dev` generates and re-adds. Leave them alone.

## Working agreement

Behavioural rules, not code conventions. They come from recurring corrections in this repository's sessions — treat them as project rules.

- **Change only what was named.** If a fix needs an adjacent file, helper, dependency or piece of copy, say so and stop. Removing the last usage of a dependency is not permission to uninstall it. Never delete or rewrite authored content — spinner prose, comments — as a side effect of another task.
- **A passing check is not a working feature.** `pnpm lint` proves the code compiles; it says nothing about how a spinner actually looks or moves. For any visual or runtime change, state what was verified and what was never seen running as two separate things. If it wasn't looked at, the word is "unverified" — a green check does not stand in for it, and never run a check just so there is something green to report.
- **Don't run builds or checks on routine changes.** A styling tweak, a spinner tweak, an MDX copy edit does not need `pnpm build` or `pnpm lint` afterwards. They cost more time than they save, and the dev server and editor surface the same errors sooner. Make the change and say what you changed. `pnpm build` is the worst offender — it builds every workspace package. Run a check only when the change is broad, touches config, types, the motion contract or the package exports, or when asked — and say in one line what it is for before starting it. Never narrate a step you are about to take instead of taking it.
- **End on the result.** No "want me to…", "say the word", "happy to…". If a decision is genuinely needed, ask it in the first line, not the last. A caveat earns its place only when it changes what to do next.
- **Edit prose, don't hedge it.** In `apps/web/src/content/spinners/*.mdx` and `README` copy, preserve the author's voice and level of certainty. No added qualifiers, no both-sides caveats, no new "never" absolutes.
- **Answer at the altitude of the question.** Reach for the platform primitive — a Tailwind media query over a custom hook, CSS over JS. The general solution is for after the specific one has been shown to fail.
- **Write commit and PR titles like a person.** `type(scope): short summary`, under ~60 characters — this repo scopes by package (`web`, `spinners`, `loading`), as in `fix(web): drop the theme background from the live snippet` and `refactor(spinners): unify spinner catalog and customization logic`. No trailing "for improved / for better / for consistency" clause. One change per title; if it needs an "and", it is two commits. Name the outcome, don't restate the diff, and avoid the filler verbs `enhance`, `streamline`, `standardize`, `optimize`.
- **PR descriptions are plain prose or nothing.** A few sentences on what changed and why; a `## heading` only when there is a real bug or decision to explain. Never a bulleted dump of the commit subjects. Most changes here need no body at all — leave it empty rather than padding it.

## Commands

All commands run from the repo root (`pnpm@11.8.0` workspace):

- `pnpm dev` — runs `tsup --watch` for the library and `next dev` for the site in parallel (`dev:lib` and `dev:web` run each alone)
- `pnpm build` — builds the library with tsup; `pnpm build:web` builds the site, which builds `loading-dev` first (`pnpm --filter loading-dev build && next build`)
- `pnpm lint` — Oxlint for JavaScript and TypeScript; `pnpm check` also enforces Biome formatting, assists and CSS/JSON rules.
- `pnpm fix` — Oxlint safe fixes followed by Biome formatting and assists; `pnpm format` formats only.
- `pnpm format` — Biome format
- `pnpm typecheck` — checks library and test types, builds library declarations, then generates and checks site route types

`pnpm test` runs the Vitest suite in `tests/`. It renders every spinner in `SPINNERS` to static markup and checks the motion contract, so it needs no browser.

Domain vocabulary lives in `CONTEXT.md` — read it before naming anything.

Lint warnings and unused Oxlint suppressions fail checks. Use narrow `oxlint-disable-next-line rule -- reason` comments when a rule cannot model valid code. Type-aware Oxlint remains disabled with TypeScript 5; `pnpm typecheck` checks types separately.

## Architecture

pnpm workspace with the library at the root and one app beside it:

- **root** (`src/`, `tests/`) — the published npm package `loading-dev` ("Spinners. No more, no less."). React spinner components, ESM-only, built with tsup, React 19+ as a peer dependency. The root `package.json` is the package's manifest and also carries the workspace scripts and lint/test tooling; `files` limits the tarball to `dist`.
- **`apps/web`** — Next.js 16 (App Router, Turbopack, React Compiler enabled) showcase/docs site that consumes `loading-dev` via `workspace:*`.

Plus one directory that is **not** a workspace member:

- **`examples/consumer`** — release-validation app that installs `loading-dev` from the npm registry. It sits outside the workspace globs (`.` and `apps/*`) on purpose: inside the workspace, pnpm would symlink the local package and the check would silently test local source instead of the published tarball. It has its own `package-lock.json`, is not covered by a root `pnpm install`, and is run manually (`cd examples/consumer && npm run verify`) after publishing. Never migrate it into the workspace, and never point `apps/web` at the registry version — the showcase must track local source so `pnpm dev` stays live.

Releases are cut with `gh release create vX.Y.Z --generate-notes` after bumping `version` in the root `package.json`. Publishing the GitHub release creates the tag and runs `release.yml`, which publishes to npm; a draft release publishes nothing.

### Library conventions (root `src/`)

Each spinner is one self-contained `.tsx` file:

- CSS lives inline in the component via React 19's style hoisting — no CSS files, no bundler CSS handling for consumers. Use `SpinnerStyle` from `frame.tsx` rather than writing the `<style>` tag; it derives the stylesheet key from the spinner's `ld-` key.
- Class names are prefixed `ld-` (e.g. `ld-arc`). `spinnerRoot()` in `frame.tsx` supplies the root element's shared attributes: `aria-hidden`, the merged class name, and the CSS properties the appearance props set. It resolves the `size` default too, and every spinner sizes its root from `SIZE` in its own CSS, so a spinner just forwards its props.
- Every animation must have a `@media (prefers-reduced-motion: reduce)` fallback.
- Never write a duration or the 20px default as a literal. `duration(name)`, `SIZE` and `DEFAULT_SIZE` all come from `motion.ts`, which owns the contract; `frame.tsx` is only the React frame — see `CONTEXT.md` on the motion contract. `animation(name, keyframes, timing)` from `motion.ts` is an animated element's whole `animation` shorthand, and it carries `animation-play-state` with it; the tests check that every shorthand in a spinner's stylesheet has its play state, so an element that animates goes through it.
- All spinners take `SpinnerProps` from `types.ts`: `{ className?, color?, duration?, playState?, size? }`, and use `currentColor` so they inherit text color when `color` is omitted. Every prop but `className` writes a CSS property in `spinnerRoot` and only when passed — see `CONTEXT.md` on the motion contract for why omission matters. A spinner with a choice of its own extends `SpinnerProps` in its own file and exports the props type from the barrel; the default must be the behaviour the spinner had before the prop existed. The rotating spinners share `easing` through `easing.ts` — `rotationCss(name)` is their whole rotation stylesheet (a spinner whose lap is another additive property, such as a dash running round a path, passes its own keyframe body as the second argument) and `spinClass(name, easing)` names the element that turns, with `stacked` adding the linear and the eased turn together on that one element through `animation-composition` — so a new rotating spinner takes the prop by using those two rather than writing its own keyframes. Per-element custom properties go through `cssVars` from `frame.tsx`, the one place the `CSSProperties` cast lives. A run of elements that play the same keyframes in turn is a stagger: `stagger(name, count)` from `motion.ts` is their whole `animation-delay`, and each element gets `style={step(index)}` from `frame.tsx` — no generated `nth-child` rules, no per-spinner step property.
- Export new spinners from `src/index.ts` (a barrel by design — package entry points intentionally re-export the public API).

### Adding a spinner (cross-package workflow)

1. Create `src/<name>.tsx` following the conventions above; export it from `src/index.ts` and add it to `SPINNERS` in `src/spinners.ts`, the registry keyed by `ld-` key that the showcase renders from and the tests and the consumer check iterate.
2. Add its default duration to `SPINNER_MOTION` in `src/motion.ts`. The key is the spinner's `ld-` key, and `SpinnerStyle`/`spinnerRoot` will not type-check without it; `SPINNERS` will not type-check until every key has a component.
3. Add a row to the root `README.md`.
4. Register it in `apps/web/src/components/spinners/index.ts` (`CATALOG`, exported as `SPINNER_ITEMS`), or, if the site should not show it, add its key to `UNLISTED` in the same file — the type check fails until every library spinner is in one or the other. The catalog drives the homepage, the sidebar, previous/next, and `generateStaticParams` — **array position is the display order**. `slug` is typed `SpinnerName`, so it must be the spinner's `ld-` key; preview customization reads the default speed from `SPINNER_MOTION` under that key, and the entry only supplies the slider's `max`/`min`. Rendering components look the spinner up in the library's `SPINNERS` under that slug, and the catalog checks options against that component through a type-only import. A spinner with a prop of its own lists it under `options` — label, prop name, an explicit `defaultValue` from the library, and the values in the order the control shows them, enforced as a nonempty tuple — and `CustomizePanel` renders a segmented control for each.
5. Write no shared prose. Every spinner documents the same five sections — Size, Custom Classes, Color, Duration, State — and they live once in `apps/web/src/content/spinners/_shared.mdx`, rendered by `page.tsx` and read by `lib/spinner-markdown.ts`, so a heading added there reaches the prose, the TOC, and `/spinners/<slug>/markdown` for every spinner at once. What makes a spinner distinct belongs in its `description` in `CATALOG` and in the demos. A prop of its own is documented once per prop, not per spinner: `apps/web/src/content/options/<prop>.mdx` holds one `##` section with its own `<Demo />`, keyed by the option's `prop` name, and every spinner whose catalog entry lists that option renders it after the shared sections, in the order the entry lists them. It reaches the TOC and the markdown route the same way. The demo tag still resolves against the spinner, so each spinner shows its own demo under the shared prose. A new prop needs a new file there; an option whose file is missing is a build error.
6. Demos need no files. `apps/web/src/lib/demos.ts` defines the five shared demos once as the props of the elements each one shows, and an option's demo is one element per value in the catalog entry's `values`, so a new spinner and a new option both get their demos from what steps 1 and 4 already wrote. Only a new `<Demo name="…" />` in `_shared.mdx` needs a new entry in `SHARED_DEMOS`; a name with no entry and no option is a build error. The opening code example is generated the same way from the default customization state, and `/spinners/<slug>/markdown` renders both from the same data.

### Web app conventions (`apps/web`)

- Tailwind CSS v4, CSS-first config: semantic colour tokens (`--color-content`, `--color-background`, `--color-surface`, `--color-modal`, `--color-popover`, `--color-border`, `--color-orange`, and their `-subtle`/`-hovered` variants; `modal` is the raised surface that flips with the theme, `popover` is the floating panel that stays dark in both, with its own `-content`/`-content-subtle` tokens), shadows and fonts are defined in `src/styles/globals.css`; dark mode is via `prefers-color-scheme`, not a class toggle. Additional styles are split into `src/styles/{components,utilities}.css`.
- React Compiler handles memoization — do not add `useCallback`/`useMemo` for that purpose (Oxlint leaves compiler-owned memoization to React).
- Class merging uses `cn` from `src/lib/utils.ts`, built with the `cn` package's `createCn` so it knows the custom `semimedium` weight. `clsx` and `tailwind-merge` are not imported anywhere.
- Every code sample on the site is highlighted by shiki with the theme files in `src/lib/themes`, and nothing highlights in the browser. A fenced block in an `.mdx` file goes through `rehype-pretty-code` at build time and renders through `src/components/mdx/`, the pattern shared with `~/Developer/jakub.kr` and `~/Developer/interfaces` — check those repos before adding web UI here. The demos and the opening snippet are not fences: `src/lib/code.ts` builds them as token lines from data, `CodeBlock` is a server component that tokenises the text with the same themes at static generation, and the live snippet colours its tokens with `SNIPPET_PALETTE`, one colour per token kind read from the theme files in `code-theme.ts`.
- Fonts are local woff2 files in `src/app/fonts/`, wired through `src/app/fonts.ts` and applied as CSS variables in the root layout.
- `next.config.ts` sets `turbopack.root` to the monorepo root — path assumptions depend on this.

## Linting

Oxlint extends Ultracite core, React and Vitest presets, with Next rules scoped to the apps. Biome owns formatting, assists and CSS/JSON linting. Rule exceptions live in `oxlint.config.ts` and `biome.jsonc`.
