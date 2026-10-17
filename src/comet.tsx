import { type EasingProps, rotationCss, spinClass } from "./easing";
import { SpinnerStyle, spinnerRoot } from "./frame";
import { SIZE } from "./motion";
import type { SpinnerProps } from "./types";

export interface CometProps extends SpinnerProps, EasingProps {}

const css = `
.ld-comet {
  --ld-comet-stroke: calc(${SIZE} * 0.12);
  position: relative;
}

.ld-comet-spin {
  position: absolute;
  inset: 0;
}

.ld-comet-tail {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: conic-gradient(from 0deg, transparent, currentColor);
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - var(--ld-comet-stroke)), #000 0);
  mask: radial-gradient(farthest-side, transparent calc(100% - var(--ld-comet-stroke)), #000 0);
}

.ld-comet-head {
  position: absolute;
  top: 0;
  left: 50%;
  width: var(--ld-comet-stroke);
  height: var(--ld-comet-stroke);
  background: currentColor;
  border-radius: 9999px;
  transform: translateX(-50%);
}

${rotationCss("comet")}
`;

export function Comet({ easing, ...rest }: CometProps) {
  return (
    <>
      <SpinnerStyle name="comet">{css}</SpinnerStyle>
      <div {...spinnerRoot("comet", rest)}>
        <div className={spinClass("comet", easing)}>
          <div className="ld-comet-tail" />
          <div className="ld-comet-head" />
        </div>
      </div>
    </>
  );
}
