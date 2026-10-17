import { readFile } from "node:fs/promises";
import type { ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import * as library from "../src";

const {
  DEFAULT_BLOCKS_SWEEP,
  DEFAULT_CAP,
  DEFAULT_EASING,
  DEFAULT_RIPPLE_DIRECTION,
  DEFAULT_WAVE_ORIGIN,
  SPINNERS,
} = library;

const OWN_PROP_DEFAULTS = {
  cap: DEFAULT_CAP,
  direction: DEFAULT_RIPPLE_DIRECTION,
  easing: DEFAULT_EASING,
  origin: DEFAULT_WAVE_ORIGIN,
  sweep: DEFAULT_BLOCKS_SWEEP,
};

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

  it.each(Object.entries(SPINNERS))(
    "%s uses the exported defaults when its own props are omitted",
    (_name, Spinner) => {
      const WithOwnProps = Spinner as ComponentType<typeof OWN_PROP_DEFAULTS>;
      expect(renderToStaticMarkup(<Spinner />)).toBe(
        renderToStaticMarkup(<WithOwnProps {...OWN_PROP_DEFAULTS} />)
      );
    }
  );
});
