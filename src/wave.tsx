import { SpinnerStyle, spinnerRoot, step } from "./frame";
import { animation, SIZE, STEP_VAR, stagger } from "./motion";
import type { SpinnerProps } from "./types";

export type WaveOrigin = "bottom" | "center";

export const DEFAULT_WAVE_ORIGIN: WaveOrigin = "center";

export interface WaveProps extends SpinnerProps {
  origin?: WaveOrigin;
}

const BARS = Array.from({ length: 5 }, (_, index) => index);

const css = `
.ld-wave {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${SIZE};
  height: ${SIZE};
}

.ld-wave-bar {
  width: calc(${SIZE} * 0.12);
  height: 100%;
  background: currentColor;
  border-radius: 9999px;
  ${animation("wave", "ld-wave-rise", "ease-in-out")}
  animation-delay: ${stagger("wave", BARS.length)};
}

.ld-wave-bar-bottom {
  align-self: flex-end;
}

@keyframes ld-wave-rise {
  0%,
  100% {
    height: 30%;
  }
  50% {
    height: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-wave-bar {
    height: calc((0.4 + var(${STEP_VAR}) * 0.15) * 100%);
  }
}
`;

export function Wave({ origin = DEFAULT_WAVE_ORIGIN, ...rest }: WaveProps) {
  return (
    <>
      <SpinnerStyle name="wave">{css}</SpinnerStyle>
      <div {...spinnerRoot("wave", rest)}>
        {BARS.map((index) => (
          <div
            className={`ld-wave-bar ld-wave-bar-${origin}`}
            key={index}
            style={step(index)}
          />
        ))}
      </div>
    </>
  );
}
