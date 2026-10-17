import { type EasingProps, rotationCss, spinClass } from "./easing";
import { SpinnerStyle, spinnerRoot } from "./frame";
import { SIZE } from "./motion";
import type { SpinnerProps } from "./types";

export interface OrbitProps extends SpinnerProps, EasingProps {}

const css = `
.ld-orbit {
  --ld-orbit-stroke: calc(${SIZE} * 0.0625);
  position: relative;
}

.ld-orbit-track {
  position: absolute;
  inset: 8%;
  border-radius: 9999px;
  background: conic-gradient(from 180deg, transparent 0deg, currentColor 180deg, transparent 180deg);
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - var(--ld-orbit-stroke)), #000 0);
  mask: radial-gradient(farthest-side, transparent calc(100% - var(--ld-orbit-stroke)), #000 0);
}

.ld-orbit-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 25%;
  height: 25%;
  background: currentColor;
  border-radius: 9999px;
  transform: translate(-50%, -50%);
}

${rotationCss("orbit")}
`;

export function Orbit({ easing, ...rest }: OrbitProps) {
  return (
    <>
      <SpinnerStyle name="orbit">{css}</SpinnerStyle>
      <div {...spinnerRoot("orbit", rest)}>
        <div className="ld-orbit-dot" />
        <div className={`ld-orbit-track ${spinClass("orbit", easing)}`} />
      </div>
    </>
  );
}
