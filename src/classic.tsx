import { fadeCss } from "./fade";
import { SpinnerStyle, spinnerRoot, step } from "./frame";
import { SIZE, STEP_VAR } from "./motion";
import type { SpinnerProps } from "./types";

const BARS = Array.from({ length: 12 }, (_, index) => index);

const css = `
.ld-classic {
  width: ${SIZE};
  height: ${SIZE};
}

.ld-classic-inner {
  position: relative;
  top: 50%;
  left: 50%;
  width: ${SIZE};
  height: ${SIZE};
}

.ld-classic-bar {
  position: absolute;
  top: -3.9%;
  left: -10%;
  width: 24%;
  height: 8%;
  background: currentColor;
  border-radius: 6px;
  transform: rotate(calc(var(${STEP_VAR}) * 30deg)) translate(146%);
}

${fadeCss("classic", "bar", BARS.length, { dim: 0.15, rest: 0.5 })}
`;

export function Classic(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="classic">{css}</SpinnerStyle>
      <div {...spinnerRoot("classic", props)}>
        <div className="ld-classic-inner">
          {BARS.map((bar) => (
            <div className="ld-classic-bar" key={bar} style={step(bar)} />
          ))}
        </div>
      </div>
    </>
  );
}
