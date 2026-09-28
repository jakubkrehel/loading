import { type CapProps, linecap } from "./cap";
import { SpinnerStyle, spinnerRoot, step } from "./frame";
import { animation, SIZE, stagger } from "./motion";
import type { SpinnerProps } from "./types";

export interface CascadeProps extends SpinnerProps, CapProps {}

const RADII = [10.5, 7, 3.5];

const SLOTS = 24;

const css = `
.ld-cascade {
  width: ${SIZE};
  height: ${SIZE};
}

.ld-cascade-arc {
  transform-origin: center;
  ${animation("cascade", "ld-cascade-turn", "cubic-bezier(0.68, -0.75, 0.265, 1.75)")}
  animation-delay: ${stagger("cascade", SLOTS)};
}

@keyframes ld-cascade-turn {
  to {
    transform: rotate(360deg);
  }
}
`;

export function Cascade({ cap, ...rest }: CascadeProps) {
  return (
    <>
      <SpinnerStyle name="cascade">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("cascade", rest)}
        fill="none"
        role="presentation"
        stroke="currentColor"
        strokeLinecap={linecap(cap)}
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        {RADII.map((r, index) => {
          const circumference = 2 * Math.PI * r;
          return (
            <circle
              className="ld-cascade-arc"
              cx="12"
              cy="12"
              key={r}
              r={r}
              strokeDasharray={`${circumference / 4} ${(circumference * 3) / 4}`}
              style={step(index)}
            />
          );
        })}
      </svg>
    </>
  );
}
