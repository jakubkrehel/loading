import { type CapProps, linecap } from "./cap";
import { type EasingProps, rotationCss, spinClass } from "./easing";
import { SpinnerStyle, spinnerRoot } from "./frame";
import type { SpinnerProps } from "./types";

export interface DualProps extends SpinnerProps, EasingProps, CapProps {}

const css = `
${rotationCss("dual")}

.ld-dual-inner {
  animation-direction: reverse;
}

@media (prefers-reduced-motion: reduce) {
  .ld-dual-inner {
    transform: rotate(180deg);
  }
}
`;

export function Dual({ cap, easing, ...rest }: DualProps) {
  return (
    <>
      <SpinnerStyle name="dual">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("dual", rest)}
        fill="none"
        role="presentation"
        stroke="currentColor"
        strokeLinecap={linecap(cap)}
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <circle
          className={spinClass("dual", easing)}
          cx="12"
          cy="12"
          r="10"
          strokeDasharray="18 44.8"
        />
        <circle
          className={`ld-dual-inner ${spinClass("dual", easing)}`}
          cx="12"
          cy="12"
          r="5.5"
          strokeDasharray="10 24.6"
        />
      </svg>
    </>
  );
}
