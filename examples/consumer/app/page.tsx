import { readFile } from "node:fs/promises";
import {
  Arc,
  Atom,
  Blocks,
  BouncingDots,
  Cascade,
  Chevrons,
  CircularDots,
  Classic,
  ClassicV2,
  Clock,
  Comet,
  Compass,
  Dual,
  Eclipse,
  Fill,
  Flip,
  Gather,
  Leap,
  LinearDots,
  Loading,
  Loop,
  Morph,
  Orbit,
  Phases,
  Pulse,
  Radar,
  Ring,
  Ripple,
  Scan,
  Slide,
  Snake,
  SPINNER_MOTION,
  type SPINNERS,
  Split,
  Steps,
  Swirl,
  Trace,
  Wave,
} from "loading-dev";
import type { CSSProperties, ReactNode } from "react";

const ENTRIES = Object.entries({
  arc: Arc,
  atom: Atom,
  blocks: Blocks,
  "bouncing-dots": BouncingDots,
  cascade: Cascade,
  chevrons: Chevrons,
  "circular-dots": CircularDots,
  classic: Classic,
  "classic-v2": ClassicV2,
  clock: Clock,
  comet: Comet,
  compass: Compass,
  dual: Dual,
  eclipse: Eclipse,
  fill: Fill,
  flip: Flip,
  gather: Gather,
  leap: Leap,
  "linear-dots": LinearDots,
  loading: Loading,
  loop: Loop,
  morph: Morph,
  orbit: Orbit,
  phases: Phases,
  pulse: Pulse,
  radar: Radar,
  ring: Ring,
  ripple: Ripple,
  scan: Scan,
  slide: Slide,
  snake: Snake,
  split: Split,
  steps: Steps,
  swirl: Swirl,
  trace: Trace,
  wave: Wave,
} satisfies typeof SPINNERS);

async function installedVersion(): Promise<string> {
  try {
    const raw = await readFile("node_modules/loading-dev/package.json", "utf8");
    return (JSON.parse(raw) as { version: string }).version;
  } catch {
    return "unknown";
  }
}

function Section({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <section style={{ marginBottom: "3rem" }}>
      <h2
        style={{ fontSize: "0.875rem", fontWeight: 600, margin: "0 0 0.25rem" }}
      >
        {title}
      </h2>
      <p style={{ fontSize: "0.8125rem", margin: "0 0 1rem", opacity: 0.6 }}>
        {note}
      </p>
      {children}
    </section>
  );
}

function Row({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexWrap: "wrap",
        gap: "2.5rem",
      }}
    >
      {children}
    </div>
  );
}

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ display: "grid", gap: "0.625rem", justifyItems: "center" }}>
      {children}
      <code style={{ fontSize: "0.75rem", opacity: 0.6 }}>{label}</code>
    </div>
  );
}

export default async function Page() {
  const version = await installedVersion();

  return (
    <main style={{ margin: "0 auto", maxWidth: "48rem" }}>
      <h1 style={{ fontSize: "1.25rem", margin: "0 0 0.5rem" }}>
        Published package check
      </h1>
      <p style={{ fontSize: "0.875rem", margin: "0 0 3rem", opacity: 0.7 }}>
        Rendering <code>loading-dev@{version}</code> installed from the npm
        registry — not the workspace copy. This page is a Server Component, so
        it also exercises the &ldquo;works in Server Components&rdquo; claim.
      </p>

      <Section
        note="No size prop — should render at 20px."
        title="Default size"
      >
        <Row>
          {ENTRIES.map(([name, Component]) => (
            <Cell key={name} label={name}>
              <Component />
            </Cell>
          ))}
        </Row>
      </Section>

      <Section
        note="size={48} — every spinner should scale."
        title="Explicit size"
      >
        <Row>
          {ENTRIES.map(([name, Component]) => (
            <Cell key={name} label={`${name} size={48}`}>
              <Component size={48} />
            </Cell>
          ))}
        </Row>
      </Section>

      <Section
        note="Spinners use currentColor, so they should pick up the parent's text colour."
        title="Colour inheritance"
      >
        <div style={{ color: "#e5484d" }}>
          <Row>
            {ENTRIES.map(([name, Component]) => (
              <Cell key={name} label={name}>
                <Component size={32} />
              </Cell>
            ))}
          </Row>
        </div>
      </Section>

      <Section
        note="--ld-duration is set to 3s on the wrapper; every spinner should visibly slow down."
        title="Motion contract"
      >
        <div style={{ "--ld-duration": "3s" } as CSSProperties}>
          <Row>
            {ENTRIES.map(([name, Component]) => (
              <Cell key={name} label={name}>
                <Component size={32} />
              </Cell>
            ))}
          </Row>
        </div>
      </Section>

      <Section
        note="Default durations exported as data — these must match what the CSS above actually uses."
        title="SPINNER_MOTION"
      >
        <Row>
          {Object.entries(SPINNER_MOTION).map(([name, ms]) => (
            <code key={name} style={{ fontSize: "0.75rem", opacity: 0.6 }}>
              {name}: {ms}ms
            </code>
          ))}
        </Row>
      </Section>

      <Section
        note="Enable 'Reduce motion' in your OS settings — every animation should fall back to a static or non-animated state."
        title="Reduced motion"
      >
        <Row>
          {ENTRIES.map(([name, Component]) => (
            <Cell key={name} label={name}>
              <Component size={32} />
            </Cell>
          ))}
        </Row>
      </Section>
    </main>
  );
}
