import { SpinnerStyle, spinnerRoot, step } from "./frame";
import { animation, STEP_VAR, stagger } from "./motion";
import type { SpinnerProps } from "./types";

const SEGMENTS = [1, 7, 13, 19];

const SLOTS = SEGMENTS.length * 2;

const css = `
.ld-steps-segment {
  ${animation("steps", "ld-steps-light", "linear")}
  animation-delay: ${stagger("steps", SLOTS)};
}

@keyframes ld-steps-light {
  0%,
  55% {
    opacity: 1;
  }
  60%,
  100% {
    opacity: 0.15;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-steps-segment {
    opacity: calc(1 - var(${STEP_VAR}) * 0.25);
  }
}
`;

export function Steps(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="steps">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("steps", props)}
        fill="currentColor"
        role="presentation"
        viewBox="0 0 24 24"
      >
        {SEGMENTS.map((x, index) => (
          <rect
            className="ld-steps-segment"
            height="6"
            key={x}
            rx="1.25"
            style={step(index)}
            width="4"
            x={x}
            y="9"
          />
        ))}
      </svg>
    </>
  );
}
