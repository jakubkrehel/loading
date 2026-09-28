import { SpinnerStyle, spinnerRoot, step } from "./frame";
import { animation, SIZE, STEP_VAR, stagger } from "./motion";
import type { SpinnerProps } from "./types";

const DOTS = [0, 1];

const css = `
.ld-eclipse {
  position: relative;
  width: ${SIZE};
  height: ${SIZE};
}

.ld-eclipse-dot {
  position: absolute;
  top: 30%;
  left: 30%;
  width: 40%;
  height: 40%;
  background: currentColor;
  border-radius: 50%;
  ${animation("eclipse", ["ld-eclipse-slide", "ld-eclipse-depth"], "ease-in-out")}
  animation-delay: ${stagger("eclipse", DOTS.length)};
}

@keyframes ld-eclipse-slide {
  0%,
  100% {
    translate: 75% 0;
  }
  50% {
    translate: -75% 0;
  }
}

@keyframes ld-eclipse-depth {
  0%,
  50%,
  100% {
    opacity: 0.75;
    scale: 1;
  }
  25% {
    opacity: 1;
    scale: 1.3;
  }
  75% {
    opacity: 0.5;
    scale: 0.7;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-eclipse-dot {
    translate: calc(var(${STEP_VAR}) * 150% - 75%) 0;
  }
}
`;

export function Eclipse(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="eclipse">{css}</SpinnerStyle>
      <div {...spinnerRoot("eclipse", props)}>
        {DOTS.map((index) => (
          <div className="ld-eclipse-dot" key={index} style={step(index)} />
        ))}
      </div>
    </>
  );
}
