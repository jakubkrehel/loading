import { SpinnerStyle, spinnerRoot } from "./frame";
import { animation } from "./motion";
import type { SpinnerProps } from "./types";

const LENGTH = 100;

const css = `
.ld-fill-pie {
  ${animation("fill", "ld-fill-sweep", "cubic-bezier(0.65, 0, 0.35, 1)")}
}

@keyframes ld-fill-sweep {
  0% {
    stroke-dasharray: 0 ${LENGTH};
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: ${LENGTH} ${LENGTH};
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dasharray: ${LENGTH} ${LENGTH};
    stroke-dashoffset: ${-LENGTH};
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-fill-pie {
    stroke-dasharray: ${LENGTH / 4} ${LENGTH};
  }
}
`;

export function Fill(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="fill">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("fill", props)}
        fill="none"
        role="presentation"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" opacity="0.2" r="10.25" strokeWidth="2.5" />
        <circle
          className="ld-fill-pie"
          cx="12"
          cy="12"
          pathLength={LENGTH}
          r="3.75"
          strokeWidth="7.5"
          transform="rotate(-90 12 12)"
        />
      </svg>
    </>
  );
}
