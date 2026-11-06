import { useId } from "react";
import { SpinnerStyle, spinnerRoot } from "./frame";
import { animation, duration } from "./motion";
import type { SpinnerProps } from "./types";

const RADIUS = 10;

const BLEED = 0.25;

const CLEAR = 2 * (RADIUS + BLEED);

const css = `
.ld-phases-shade {
  ${animation("phases", "ld-phases-wax", "ease-out")}
  animation-delay: calc(${duration("phases")} / -2);
}

@keyframes ld-phases-wax {
  from {
    transform: translateX(${CLEAR}px);
  }
  50% {
    transform: translateX(0);
    animation-timing-function: ease-in;
  }
  to {
    transform: translateX(${-CLEAR}px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-phases-shade {
    transform: translateX(${-RADIUS}px);
  }
}
`;

export function Phases(props: SpinnerProps) {
  const shade = useId();

  return (
    <>
      <SpinnerStyle name="phases">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("phases", props)}
        fill="currentColor"
        role="presentation"
        viewBox="0 0 24 24"
      >
        <defs>
          <mask id={shade}>
            <circle cx="12" cy="12" fill="white" r={RADIUS} />
            <circle
              className="ld-phases-shade"
              cx="12"
              cy="12"
              fill="black"
              r={RADIUS + BLEED}
            />
          </mask>
        </defs>
        <circle cx="12" cy="12" opacity="0.2" r={RADIUS} />
        <circle cx="12" cy="12" mask={`url(#${shade})`} r={RADIUS} />
      </svg>
    </>
  );
}
