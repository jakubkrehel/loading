import { type CapProps, linecap } from "./cap";
import { type EasingProps, rotationCss, spinClass } from "./easing";
import { SpinnerStyle, spinnerRoot } from "./frame";
import { animation, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

export interface SnakeProps extends SpinnerProps, EasingProps, CapProps {}

const css = `
.ld-snake {
  width: ${SIZE};
  height: ${SIZE};
}

${rotationCss("snake")}

.ld-snake-dash {
  ${animation("snake", "ld-snake-stretch", "ease-in-out")}
}

@keyframes ld-snake-stretch {
  0% {
    stroke-dasharray: 1 100;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 45 100;
    stroke-dashoffset: -17;
  }
  100% {
    stroke-dasharray: 45 100;
    stroke-dashoffset: -62;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-snake-dash {
    stroke-dasharray: 18 100;
  }
}
`;

export function Snake({ cap, easing, ...rest }: SnakeProps) {
  return (
    <>
      <SpinnerStyle name="snake">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("snake", rest)}
        fill="none"
        role="presentation"
        viewBox="0 0 24 24"
      >
        <g className={spinClass("snake", easing)}>
          <circle
            className="ld-snake-dash"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeLinecap={linecap(cap)}
            strokeWidth="2.5"
          />
        </g>
      </svg>
    </>
  );
}
