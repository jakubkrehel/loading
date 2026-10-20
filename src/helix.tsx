import { SpinnerStyle, spinnerRoot, step } from "./frame";
import { animation, STEP_VAR, stagger } from "./motion";
import type { SpinnerProps } from "./types";

const PAIRS = Array.from({ length: 6 }, (_, index) => index);

// Steps in one full turn: neighbouring pairs sit a tenth of a turn apart, so
// the six pairs span half a twist and the two strands sit half a turn apart.
const TURN = 10;

const SINE = "cubic-bezier(0.37, 0, 0.63, 1)";

const ANGLE = `var(${STEP_VAR}) * ${360 / TURN}deg`;

const css = `
.ld-helix * {
  transform-box: fill-box;
  transform-origin: center;
}

.ld-helix-base {
  stroke: none;
  ${animation("helix", ["ld-helix-swing", "ld-helix-depth"], SINE)}
  animation-delay: ${stagger("helix", TURN)};
}

.ld-helix-rung {
  opacity: 0.3;
  ${animation("helix", "ld-helix-turn", SINE)}
  animation-delay: ${stagger("helix", TURN)};
}

@keyframes ld-helix-swing {
  0%,
  100% {
    translate: -7px 0;
  }
  50% {
    translate: 7px 0;
  }
}

@keyframes ld-helix-depth {
  0%,
  50%,
  100% {
    opacity: 0.675;
    scale: 0.725;
    animation-timing-function: cubic-bezier(0.61, 1, 0.88, 1);
  }
  25% {
    opacity: 1;
    scale: 1;
    animation-timing-function: cubic-bezier(0.12, 0, 0.39, 0);
  }
  75% {
    opacity: 0.35;
    scale: 0.45;
    animation-timing-function: cubic-bezier(0.12, 0, 0.39, 0);
  }
}

@keyframes ld-helix-turn {
  0%,
  100% {
    scale: -1 1;
  }
  50% {
    scale: 1 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-helix-base {
    opacity: calc(0.675 + sin(${ANGLE}) * 0.325);
    translate: calc(cos(${ANGLE}) * -7px) 0;
    scale: calc(0.725 + sin(${ANGLE}) * 0.275);
  }

  .ld-helix-rung {
    scale: calc(cos(${ANGLE}) * -1) 1;
  }
}
`;

export function Helix(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="helix">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("helix", props)}
        fill="currentColor"
        role="presentation"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.25"
        viewBox="0 0 24 24"
      >
        {PAIRS.map((index) => {
          const y = 2.5 + index * 3.8;
          return (
            <g key={index}>
              <line
                className="ld-helix-rung"
                style={step(index)}
                x1="5"
                x2="19"
                y1={y}
                y2={y}
              />
              <circle
                className="ld-helix-base"
                cx="12"
                cy={y}
                r="1.9"
                style={step(index)}
              />
              <circle
                className="ld-helix-base"
                cx="12"
                cy={y}
                r="1.9"
                style={step(index + TURN / 2)}
              />
            </g>
          );
        })}
      </svg>
    </>
  );
}
