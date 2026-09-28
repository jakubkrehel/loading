import { fadeCss } from "./fade";
import { SpinnerStyle, spinnerRoot, step } from "./frame";
import { SIZE } from "./motion";
import type { SpinnerProps } from "./types";

const DOTS = [
  [8, 1.5],
  [12.5962, 3.4038],
  [14.5, 8],
  [12.5962, 12.5962],
  [8, 14.5],
  [3.4038, 12.5962],
  [1.5, 8],
  [3.4038, 3.4038],
] as const;

const css = `
.ld-circular-dots {
  width: ${SIZE};
  height: ${SIZE};
}

${fadeCss("circular-dots", "dot", DOTS.length, { dim: 0.2, rest: 0.6 })}
`;

export function CircularDots(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="circular-dots">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("circular-dots", props)}
        fill="currentColor"
        role="presentation"
        viewBox="0 0 16 16"
      >
        {DOTS.map(([cx, cy], index) => (
          <circle
            className="ld-circular-dots-dot"
            cx={cx}
            cy={cy}
            key={`${cx}-${cy}`}
            r="1.5"
            style={step(index)}
          />
        ))}
      </svg>
    </>
  );
}
