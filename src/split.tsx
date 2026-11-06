import { SpinnerStyle, spinnerRoot, step } from "./frame";
import { animation, STEP_VAR } from "./motion";
import type { SpinnerProps } from "./types";

const DOTS = [0, 1];

const APART = `calc((var(${STEP_VAR}) * 2 - 1) * 5px) 0`;

const css = `
.ld-split-dot {
  transform-box: fill-box;
  transform-origin: center;
  ${animation("split", "ld-split-part", "cubic-bezier(0.65, 0, 0.35, 1)")}
}

@keyframes ld-split-part {
  0%,
  100% {
    translate: 0 0;
    scale: 1;
  }
  40%,
  60% {
    translate: ${APART};
    scale: 0.65;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-split-dot {
    translate: ${APART};
    scale: 0.65;
  }
}
`;

export function Split(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="split">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("split", props)}
        fill="currentColor"
        role="presentation"
        viewBox="0 0 24 24"
      >
        {DOTS.map((dot) => (
          <circle
            className="ld-split-dot"
            cx="12"
            cy="12"
            key={dot}
            r="4"
            style={step(dot)}
          />
        ))}
      </svg>
    </>
  );
}
