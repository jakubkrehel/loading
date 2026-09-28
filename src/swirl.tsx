import { fadeCss } from "./fade";
import { SpinnerStyle, spinnerRoot, step } from "./frame";
import { SIZE } from "./motion";
import type { SpinnerProps } from "./types";

const RING = [0, 1, 2, 7, null, 3, 6, 5, 4];

const PLACES = RING.filter((place) => place !== null).length;

const css = `
.ld-swirl {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: calc(${SIZE} * 0.15625);
  box-sizing: border-box;
  width: ${SIZE};
  height: ${SIZE};
  padding: calc(${SIZE} * 0.0625);
}

.ld-swirl-cell {
  background: currentColor;
  border-radius: calc(${SIZE} * 0.0625);
}
${fadeCss("swirl", "cell", PLACES, { dim: 0.2, rest: 0.6 })}
`;

export function Swirl(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="swirl">{css}</SpinnerStyle>
      <div {...spinnerRoot("swirl", props)}>
        {RING.map((place, index) =>
          place === null ? (
            <div key={index} />
          ) : (
            <div className="ld-swirl-cell" key={index} style={step(place)} />
          )
        )}
      </div>
    </>
  );
}
