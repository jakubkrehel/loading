import { type EasingProps, rotationCss, spinClass } from "./easing";
import { cssVars, SpinnerStyle, spinnerRoot, step } from "./frame";
import { SIZE, stagger } from "./motion";
import type { SpinnerProps } from "./types";

export interface AtomProps extends SpinnerProps, EasingProps {}

const ORBITS = Array.from({ length: 3 }, (_, index) => index);

const TILT = 180 / ORBITS.length;

const STROKE = `calc(${SIZE} * 0.055)`;

const INNER_STROKE = `calc(${SIZE} * 0.045)`;

const css = `
.ld-atom {
  position: relative;
}

.ld-atom-shell {
  position: absolute;
  inset: 0;
  box-sizing: border-box;
  border: ${STROKE} solid currentColor;
  border-radius: 9999px;
}

.ld-atom-orbit {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transform: rotate(var(--ld-atom-tilt)) rotateX(90deg);
}

.ld-atom-ring {
  position: absolute;
  inset: 0;
  box-sizing: border-box;
  border: ${INNER_STROKE} solid currentColor;
  border-radius: 9999px;
  transform: rotateX(90deg);
}

${rotationCss("atom")}

.ld-atom-spin {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  animation-delay: ${stagger("atom", ORBITS.length)};
}

@media (prefers-reduced-motion: reduce) {
  .ld-atom-spin {
    transform: rotate(${TILT}deg);
  }
}
`;

export function Atom({ easing, ...rest }: AtomProps) {
  return (
    <>
      <SpinnerStyle name="atom">{css}</SpinnerStyle>
      <div {...spinnerRoot("atom", rest)}>
        <div className="ld-atom-shell" />
        {ORBITS.map((index) => (
          <div
            className="ld-atom-orbit"
            key={index}
            style={cssVars({ "--ld-atom-tilt": `${index * TILT}deg` })}
          >
            <div className={spinClass("atom", easing)} style={step(index)}>
              <div className="ld-atom-ring" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
