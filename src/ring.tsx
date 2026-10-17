import { type CapProps, linecap } from "./cap";
import { type EasingProps, rotationCss, spinClass } from "./easing";
import { SpinnerStyle, spinnerRoot } from "./frame";
import type { SpinnerProps } from "./types";

export interface RingProps extends SpinnerProps, EasingProps, CapProps {}

const css = `
${rotationCss("ring")}
`;

export function Ring({ cap, easing, ...rest }: RingProps) {
  return (
    <>
      <SpinnerStyle name="ring">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("ring", rest)}
        fill="none"
        role="presentation"
        viewBox="0 0 24 24"
      >
        <circle
          cx="12"
          cy="12"
          opacity="0.2"
          r="10"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <circle
          className={spinClass("ring", easing)}
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeDasharray="16 46.8"
          strokeLinecap={linecap(cap)}
          strokeWidth="2.5"
        />
      </svg>
    </>
  );
}
