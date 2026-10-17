import { type CapProps, linecap } from "./cap";
import { type EasingProps, rotationCss, spinClass } from "./easing";
import { SpinnerStyle, spinnerRoot } from "./frame";
import type { SpinnerProps } from "./types";

export interface ArcProps extends SpinnerProps, EasingProps, CapProps {}

const css = `
${rotationCss("arc")}
`;

export function Arc({ cap, easing, ...rest }: ArcProps) {
  return (
    <>
      <SpinnerStyle name="arc">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("arc", rest)}
        fill="none"
        role="presentation"
        viewBox="0 0 24 24"
      >
        <circle
          className={spinClass("arc", easing)}
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeDasharray="18 44.8"
          strokeLinecap={linecap(cap)}
          strokeWidth="2.5"
        />
      </svg>
    </>
  );
}
