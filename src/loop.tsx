import { type CapProps, linecap } from "./cap";
import { type EasingProps, rotationCss, spinClass } from "./easing";
import { SpinnerStyle, spinnerRoot } from "./frame";
import type { SpinnerProps } from "./types";

export interface LoopProps extends SpinnerProps, EasingProps, CapProps {}

const PATH =
  "M12 12c-2-2.7-3.6-4-5.5-4a4 4 0 0 0 0 8c1.9 0 3.5-1.3 5.5-4s3.6-4 5.5-4a4 4 0 0 1 0 8c-1.9 0-3.5-1.3-5.5-4z";

const LENGTH = 100;

const DASH = 30;

const css = `
${rotationCss(
  "loop",
  `to {
    stroke-dashoffset: ${-LENGTH};
  }`
)}
`;

export function Loop({ cap, easing, ...rest }: LoopProps) {
  return (
    <>
      <SpinnerStyle name="loop">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("loop", rest)}
        fill="none"
        role="presentation"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <path d={PATH} opacity="0.2" />
        <path
          className={spinClass("loop", easing)}
          d={PATH}
          pathLength={LENGTH}
          strokeDasharray={`${DASH} ${LENGTH - DASH}`}
          strokeLinecap={linecap(cap)}
        />
      </svg>
    </>
  );
}
