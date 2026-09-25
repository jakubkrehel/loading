import type { CSSProperties } from "react";
import {
  DEFAULT_SIZE,
  DURATION_VAR,
  PLAY_STATE_VAR,
  SIZE_VAR,
  type SpinnerName,
  STEP_VAR,
} from "./motion";
import type { SpinnerProps } from "./types";

export function SpinnerStyle({
  children,
  name,
}: {
  children: string;
  name: SpinnerName;
}) {
  return (
    <style href={`ld-${name}`} precedence="loading-dev">
      {children}
    </style>
  );
}

export function cssVars(
  vars: CSSProperties & Record<`--ld-${string}`, number | string>
): CSSProperties {
  return vars;
}

export function step(index: number): CSSProperties {
  return cssVars({ [STEP_VAR]: index });
}

export function spinnerRoot(
  name: SpinnerName,
  { className, color, duration, playState, size = DEFAULT_SIZE }: SpinnerProps
) {
  return {
    "aria-hidden": true,
    className: [`ld-${name}`, className].filter(Boolean).join(" "),
    style: cssVars({
      [SIZE_VAR]: `${size}px`,
      ...(color === undefined ? null : { color }),
      ...(duration === undefined ? null : { [DURATION_VAR]: `${duration}ms` }),
      ...(playState === undefined ? null : { [PLAY_STATE_VAR]: playState }),
    }),
  };
}
