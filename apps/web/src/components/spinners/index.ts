import {
  type CapProps,
  DEFAULT_BLOCKS_SWEEP,
  DEFAULT_CAP,
  DEFAULT_EASING,
  DEFAULT_RIPPLE_DIRECTION,
  DEFAULT_WAVE_ORIGIN,
  type EasingProps,
  type SpinnerName,
} from "loading-dev";
import { entry, type OptionOf, type SpinnerItem } from "./catalog";

export type { SpinnerItem, SpinnerOptions } from "./catalog";

export interface SpinnerParams {
  slug: string;
}

const EASING_OPTION: OptionOf<EasingProps> = {
  defaultValue: DEFAULT_EASING,
  label: "Easing",
  prop: "easing",
  values: [
    { label: "Linear", value: "linear" },
    { label: "Eased", value: "ease-in-out" },
    { label: "Stacked", value: "stacked" },
  ],
};

const CAP_OPTION: OptionOf<CapProps> = {
  defaultValue: DEFAULT_CAP,
  label: "Cap",
  prop: "cap",
  values: [
    { label: "Round", value: "round" },
    { label: "Flat", value: "flat" },
  ],
};

const CATALOG = [
  entry({
    description: "A single open stroke rotating in a circle.",
    name: "Arc",
    options: [EASING_OPTION, CAP_OPTION],
    slug: "arc",
    speed: { max: 2000, min: 200 },
  }),
  entry({
    description: "Three rings tumbling inside a circle.",
    name: "Atom",
    options: [EASING_OPTION],
    slug: "atom",
    speed: { max: 2400, min: 300 },
  }),
  entry({
    description: "Nine blocks shrinking and growing in a sweep across a grid.",
    name: "Blocks",
    options: [
      {
        defaultValue: DEFAULT_BLOCKS_SWEEP,
        label: "Sweep",
        prop: "sweep",
        values: [
          { label: "Diagonal", value: "diagonal" },
          { label: "Rows", value: "rows" },
          { label: "Columns", value: "columns" },
        ],
      },
    ],
    slug: "blocks",
    speed: { max: 2600, min: 400 },
  }),
  entry({
    description: "Three staggered dots bouncing up and down.",
    name: "Bouncing dots",
    slug: "bouncing-dots",
    speed: { max: 1200, min: 150 },
  }),
  entry({
    description:
      "Three nested arcs fanning into a spiral and snapping back in line.",
    name: "Cascade",
    options: [CAP_OPTION],
    slug: "cascade",
    speed: { max: 3000, min: 400 },
  }),
  entry({
    description: "Eight dots in a ring, the brightest hopping around.",
    name: "Circular dots",
    slug: "circular-dots",
    speed: { max: 2000, min: 200 },
  }),
  entry({
    description: "Twelve fading bars arranged in a radial pattern.",
    name: "Classic",
    slug: "classic",
    speed: { max: 2400, min: 400 },
  }),
  entry({
    description: "Two lit ticks stepping around a ring of eight.",
    name: "Classic v2",
    slug: "classic-v2",
    speed: { max: 2000, min: 400 },
  }),
  entry({
    description: "A clock hand sweeping around a faint face.",
    name: "Clock",
    options: [EASING_OPTION],
    slug: "clock",
    speed: { max: 3000, min: 300 },
  }),
  entry({
    description: "A full ring fading into its tail.",
    name: "Comet",
    options: [EASING_OPTION],
    slug: "comet",
    speed: { max: 2000, min: 200 },
  }),
  entry({
    description: "Two arcs turning in opposite directions.",
    name: "Dual",
    options: [EASING_OPTION, CAP_OPTION],
    slug: "dual",
    speed: { max: 2000, min: 250 },
  }),
  entry({
    description: "Two dots trading places, one passing behind the other.",
    name: "Eclipse",
    slug: "eclipse",
    speed: { max: 2400, min: 300 },
  }),
  entry({
    description: "A square flipping over on one axis, then the other.",
    name: "Flip",
    slug: "flip",
    speed: { max: 2400, min: 300 },
  }),
  entry({
    description: "Four blocks pulling together, turning, and pushing apart.",
    name: "Gather",
    slug: "gather",
    speed: { max: 3200, min: 400 },
  }),
  entry({
    description: "Three dots in a row, the last one leaping to the front.",
    name: "Leap",
    slug: "leap",
    speed: { max: 3600, min: 500 },
  }),
  entry({
    description: "Three dots lighting up in turn from left to right.",
    name: "Linear dots",
    slug: "linear-dots",
    speed: { max: 2400, min: 300 },
  }),
  entry({
    description: "The loading.dev mark, its brightest block circling the ring.",
    name: "Loading",
    slug: "loading",
    speed: { max: 2400, min: 300 },
  }),
  entry({
    description: "A square rounding into a circle and back as it turns.",
    name: "Morph",
    slug: "morph",
    speed: { max: 2400, min: 300 },
  }),
  entry({
    description: "A fading half-arc rotating around a dot.",
    name: "Orbit",
    options: [EASING_OPTION],
    slug: "orbit",
    speed: { max: 2000, min: 200 },
  }),
  entry({
    description: "A ring rippling outward from a dot.",
    name: "Pulse",
    slug: "pulse",
    speed: { max: 2400, min: 400 },
  }),
  entry({
    description: "An arc rotating in a faint circle.",
    name: "Ring",
    options: [EASING_OPTION, CAP_OPTION],
    slug: "ring",
    speed: { max: 2000, min: 200 },
  }),
  entry({
    description: "Three rings spreading out from the center.",
    name: "Ripple",
    options: [
      {
        defaultValue: DEFAULT_RIPPLE_DIRECTION,
        label: "Direction",
        prop: "direction",
        values: [
          { label: "Out", value: "out" },
          { label: "In", value: "in" },
        ],
      },
    ],
    slug: "ripple",
    speed: { max: 2400, min: 400 },
  }),
  entry({
    description: "Three dots sliding into the empty corner of a square.",
    name: "Slide",
    slug: "slide",
    speed: { max: 4800, min: 600 },
  }),
  entry({
    description: "An arc stretching and shrinking as it circles.",
    name: "Snake",
    options: [EASING_OPTION, CAP_OPTION],
    slug: "snake",
    speed: { max: 2800, min: 400 },
  }),
  entry({
    description: "A bright cell chasing its trail around a square.",
    name: "Swirl",
    slug: "swirl",
    speed: { max: 2400, min: 400 },
  }),
  entry({
    description: "A dash tracing the outline of a rounded square.",
    name: "Trace",
    options: [EASING_OPTION, CAP_OPTION],
    slug: "trace",
    speed: { max: 2400, min: 300 },
  }),
  entry({
    description: "Five bars rising and falling in a wave.",
    name: "Wave",
    options: [
      {
        defaultValue: DEFAULT_WAVE_ORIGIN,
        label: "Origin",
        prop: "origin",
        values: [
          { label: "Center", value: "center" },
          { label: "Bottom", value: "bottom" },
        ],
      },
    ],
    slug: "wave",
    speed: { max: 2000, min: 300 },
  }),
];

const UNLISTED = ["compass", "radar"] as const satisfies readonly SpinnerName[];

type Placed = (typeof CATALOG)[number]["slug"] | (typeof UNLISTED)[number];

({}) satisfies Record<Exclude<SpinnerName, Placed>, never>;

export const SPINNER_ITEMS: SpinnerItem[] = CATALOG;

export function spinnerParams(): SpinnerParams[] {
  return CATALOG.map(({ slug }) => ({ slug }));
}

export function getSpinner(slug: string): SpinnerItem | undefined {
  return CATALOG.find((item) => item.slug === slug);
}

export function getAdjacentSpinners(slug: string): {
  next?: SpinnerItem;
  previous?: SpinnerItem;
} {
  const index = CATALOG.findIndex((item) => item.slug === slug);
  if (index === -1) {
    return {};
  }
  return {
    next: CATALOG[index + 1],
    previous: CATALOG[index - 1],
  };
}
