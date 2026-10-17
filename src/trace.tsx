import { type CapProps, linecap } from "./cap";
import { type EasingProps, rotationCss, spinClass } from "./easing";
import { SpinnerStyle, spinnerRoot } from "./frame";
import type { SpinnerProps } from "./types";

export interface TraceProps extends SpinnerProps, EasingProps, CapProps {}

const VIEW = 20;

const SIDE = 17.5;

const RADIUS = 4;

const PERIMETER = 4 * (SIDE - 2 * RADIUS) + 2 * Math.PI * RADIUS;

const DASH = 16;

const RECT = {
  height: SIDE,
  rx: RADIUS,
  width: SIDE,
  x: (VIEW - SIDE) / 2,
  y: (VIEW - SIDE) / 2,
};

const css = `
${rotationCss(
  "trace",
  `to {
    stroke-dashoffset: ${-PERIMETER};
  }`
)}
`;

export function Trace({ cap, easing, ...rest }: TraceProps) {
  return (
    <>
      <SpinnerStyle name="trace">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("trace", rest)}
        fill="none"
        role="presentation"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox={`0 0 ${VIEW} ${VIEW}`}
      >
        <rect {...RECT} opacity="0.2" />
        <rect
          {...RECT}
          className={spinClass("trace", easing)}
          strokeDasharray={`${DASH} ${PERIMETER - DASH}`}
          strokeLinecap={linecap(cap)}
        />
      </svg>
    </>
  );
}
