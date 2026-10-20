import type { ComponentType } from "react";
import { Arc } from "./arc";
import { Atom } from "./atom";
import { Blocks } from "./blocks";
import { BouncingDots } from "./bouncing-dots";
import { Cascade } from "./cascade";
import { CircularDots } from "./circular-dots";
import { Classic } from "./classic";
import { ClassicV2 } from "./classic-v2";
import { Clock } from "./clock";
import { Comet } from "./comet";
import { Compass } from "./compass";
import { Dual } from "./dual";
import { Eclipse } from "./eclipse";
import { Flip } from "./flip";
import { Gather } from "./gather";
import { Helix } from "./helix";
import { Leap } from "./leap";
import { LinearDots } from "./linear-dots";
import { Loading } from "./loading";
import { Morph } from "./morph";
import type { SpinnerName } from "./motion";
import { Orbit } from "./orbit";
import { Pulse } from "./pulse";
import { Radar } from "./radar";
import { Ring } from "./ring";
import { Ripple } from "./ripple";
import { Slide } from "./slide";
import { Snake } from "./snake";
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
  "circular-dots": CircularDots,
  classic: Classic,
  "classic-v2": ClassicV2,
  clock: Clock,
  comet: Comet,
  compass: Compass,
  dual: Dual,
  eclipse: Eclipse,
  flip: Flip,
  gather: Gather,
  helix: Helix,
  leap: Leap,
  "linear-dots": LinearDots,
  loading: Loading,
  morph: Morph,
  orbit: Orbit,
  pulse: Pulse,
  radar: Radar,
  ring: Ring,
  ripple: Ripple,
  slide: Slide,
  snake: Snake,
  swirl: Swirl,
  trace: Trace,
  wave: Wave,
} satisfies Record<SpinnerName, ComponentType<SpinnerProps>>;
