import { readFile } from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import * as library from "../src";

const {
  Arc,
  Atom,
  Blocks,
  Cascade,
  Clock,
  Comet,
  DEFAULT_BLOCKS_SWEEP,
  DEFAULT_CAP,
  DEFAULT_EASING,
  DEFAULT_RIPPLE_DIRECTION,
  DEFAULT_WAVE_ORIGIN,
  Dual,
  Orbit,
  Radar,
  Ring,
  Ripple,
  Snake,
  SPINNERS,
  Trace,
  Wave,
} = library;

describe("public exports", () => {
  it("exports every registered spinner by its public name", () => {
    for (const Spinner of Object.values(SPINNERS)) {
      expect(library).toHaveProperty(Spinner.name, Spinner);
    }
  });

  it("lists every spinner in the README", async () => {
    const readme = await readFile(
      new URL("../README.md", import.meta.url),
      "utf8"
    );
    for (const Spinner of Object.values(SPINNERS)) {
      expect(readme).toContain(`\`${Spinner.name}\``);
    }
  });

  it.each([Arc, Atom, Clock, Comet, Dual, Orbit, Radar, Ring, Snake, Trace])(
    "uses the exported default when easing is omitted",
    (Spinner) => {
      expect(renderToStaticMarkup(<Spinner />)).toBe(
        renderToStaticMarkup(<Spinner easing={DEFAULT_EASING} />)
      );
    }
  );

  it.each([Arc, Cascade, Dual, Ring, Snake, Trace])(
    "uses the exported default when cap is omitted",
    (Spinner) => {
      expect(renderToStaticMarkup(<Spinner />)).toBe(
        renderToStaticMarkup(<Spinner cap={DEFAULT_CAP} />)
      );
    }
  );

  it("uses the exported defaults when a spinner's own prop is omitted", () => {
    expect(renderToStaticMarkup(<Blocks />)).toBe(
      renderToStaticMarkup(<Blocks sweep={DEFAULT_BLOCKS_SWEEP} />)
    );
    expect(renderToStaticMarkup(<Ripple />)).toBe(
      renderToStaticMarkup(<Ripple direction={DEFAULT_RIPPLE_DIRECTION} />)
    );
    expect(renderToStaticMarkup(<Wave />)).toBe(
      renderToStaticMarkup(<Wave origin={DEFAULT_WAVE_ORIGIN} />)
    );
  });
});
