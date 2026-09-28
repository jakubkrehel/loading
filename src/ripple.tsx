import { SpinnerStyle, spinnerRoot, step } from "./frame";
import { animation, SIZE, STEP_VAR, stagger } from "./motion";
import type { SpinnerProps } from "./types";

export type RippleDirection = "in" | "out";

export const DEFAULT_RIPPLE_DIRECTION: RippleDirection = "out";

export interface RippleProps extends SpinnerProps {
  direction?: RippleDirection;
}

const RINGS = Array.from({ length: 3 }, (_, index) => index);

const css = `
.ld-ripple {
  position: relative;
  width: ${SIZE};
  height: ${SIZE};
}

.ld-ripple-ring {
  position: absolute;
  inset: 0;
  box-sizing: border-box;
  border: calc(${SIZE} * 0.08) solid currentColor;
  border-radius: 9999px;
  ${animation("ripple", "ld-ripple-spread", "ease-out")}
  animation-delay: ${stagger("ripple", RINGS.length)};
}

.ld-ripple-ring-in {
  animation-direction: reverse;
}

@keyframes ld-ripple-spread {
  from {
    opacity: 1;
    transform: scale(0);
  }
  to {
    opacity: 0;
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-ripple-ring {
    opacity: 0.4;
    transform: scale(calc((var(${STEP_VAR}) + 1) / ${RINGS.length}));
  }
}
`;

export function Ripple({
  direction = DEFAULT_RIPPLE_DIRECTION,
  ...rest
}: RippleProps) {
  return (
    <>
      <SpinnerStyle name="ripple">{css}</SpinnerStyle>
      <div {...spinnerRoot("ripple", rest)}>
        {RINGS.map((index) => (
          <div
            className={`ld-ripple-ring ld-ripple-ring-${direction}`}
            key={index}
            style={step(index)}
          />
        ))}
      </div>
    </>
  );
}
