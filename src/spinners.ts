import type { ComponentType } from "react";
import { Arc } from "./arc";
import { Atom } from "./atom";
import { Blocks } from "./blocks";
import { BouncingDots } from "./bouncing-dots";
import { Cascade } from "./cascade";
import { Chevrons } from "./chevrons";
import { CircularDots } from "./circular-dots";
import { Classic } from "./classic";
import { ClassicV2 } from "./classic-v2";
import { Clock } from "./clock";
import { Comet } from "./comet";
import { Compass } from "./compass";
import { Dual } from "./dual";
import { Eclipse } from "./eclipse";
import { Fill } from "./fill";
import { Flip } from "./flip";
import { Gather } from "./gather";
import { Leap } from "./leap";
import { LinearDots } from "./linear-dots";
import { Loading } from "./loading";
import { Loop } from "./loop";
import { Morph } from "./morph";
import type { SpinnerName } from "./motion";
import { Orbit } from "./orbit";
import { Phases } from "./phases";
import { Pulse } from "./pulse";
import { Radar } from "./radar";
import { Ring } from "./ring";
import { Ripple } from "./ripple";
import { Scan } from "./scan";
import { Slide } from "./slide";
import { Snake } from "./snake";
import { Split } from "./split";
import { Steps } from "./steps";
import { Swirl } from "./swirl";
import { Trace } from "./trace";
import type { SpinnerProps } from "./types";
import { Wave } from "./wave";

export const SPINNERS = {
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
} satisfies Record<SpinnerName, ComponentType<SpinnerProps>>;
