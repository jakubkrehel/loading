import { SpinnerStyle, spinnerRoot } from "./frame";
import { animation, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

const css = `
.ld-pulse {
  width: ${SIZE};
  height: ${SIZE};
}

.ld-pulse-ring {
  transform-origin: center;
  ${animation("pulse", "ld-pulse-ripple", "ease-out")}
}

@keyframes ld-pulse-ripple {
  from {
    opacity: 0.4;
    transform: scale(0.25);
  }
  to {
    opacity: 0;
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-pulse-ring {
    opacity: 0.2;
  }
}
`;

export function Pulse(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="pulse">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("pulse", props)}
        fill="none"
        role="presentation"
        viewBox="0 0 16 16"
      >
        <circle
          className="ld-pulse-ring"
          cx="8"
          cy="8"
          fill="currentColor"
          r="8"
        />
        <circle cx="8" cy="8" fill="currentColor" r="2" />
      </svg>
    </>
  );
}
