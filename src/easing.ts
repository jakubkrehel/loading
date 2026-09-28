import { animation, type SpinnerName } from "./motion";

export type Easing = "linear" | "ease-in-out" | "stacked";

export const DEFAULT_EASING: Easing = "linear";

export interface EasingProps {
  easing?: Easing;
}

export function spinClass(
  name: SpinnerName,
  easing: Easing = DEFAULT_EASING
): string {
  const base = `ld-${name}-spin`;
  return easing === "linear" ? base : `${base} ${base}-${easing}`;
}

const ROTATE = `to {
    transform: rotate(360deg);
  }`;

export function rotationCss(name: SpinnerName, turn = ROTATE): string {
  return `
.ld-${name}-spin {
  transform-origin: center;
  ${animation(name, `ld-${name}-rotate`, "linear")}
}

.ld-${name}-spin-ease-in-out {
  animation-timing-function: ease-in-out;
}

.ld-${name}-spin-stacked {
  animation-name: ld-${name}-rotate, ld-${name}-rotate;
  animation-timing-function: linear, ease-in-out;
  animation-composition: add;
}

@keyframes ld-${name}-rotate {
  ${turn}
}
`;
}
