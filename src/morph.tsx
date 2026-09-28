import { SpinnerStyle, spinnerRoot } from "./frame";
import { animation, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

const css = `
.ld-morph {
  width: ${SIZE};
  height: ${SIZE};
}

.ld-morph-shape {
  width: 64%;
  height: 64%;
  margin: 18%;
  background: currentColor;
  border-radius: calc(${SIZE} * 0.08);
  ${animation("morph", "ld-morph-round", "ease-in-out")}
}

@keyframes ld-morph-round {
  0% {
    border-radius: calc(${SIZE} * 0.08);
    transform: rotate(0);
  }
  50% {
    border-radius: 50%;
    transform: rotate(45deg);
  }
  100% {
    border-radius: calc(${SIZE} * 0.08);
    transform: rotate(90deg);
  }
}
`;

export function Morph(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="morph">{css}</SpinnerStyle>
      <div {...spinnerRoot("morph", props)}>
        <div className="ld-morph-shape" />
      </div>
    </>
  );
}
