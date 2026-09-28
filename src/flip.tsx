import { SpinnerStyle, spinnerRoot } from "./frame";
import { animation, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

const css = `
.ld-flip {
  width: ${SIZE};
  height: ${SIZE};
  perspective: calc(${SIZE} * 3);
}

.ld-flip-face {
  width: 64%;
  height: 64%;
  margin: 18%;
  background: currentColor;
  border-radius: calc(${SIZE} * 0.06);
  ${animation("flip", "ld-flip-turn", "ease-in-out")}
}

@keyframes ld-flip-turn {
  0% {
    transform: rotateX(0) rotateY(0);
  }
  50% {
    transform: rotateX(-180deg) rotateY(0);
  }
  100% {
    transform: rotateX(-180deg) rotateY(-180deg);
  }
}
`;

export function Flip(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="flip">{css}</SpinnerStyle>
      <div {...spinnerRoot("flip", props)}>
        <div className="ld-flip-face" />
      </div>
    </>
  );
}
