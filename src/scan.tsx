import { SpinnerStyle, spinnerRoot } from "./frame";
import { animation } from "./motion";
import type { SpinnerProps } from "./types";

const TRAVEL = 11;

const css = `
.ld-scan-line {
  ${animation("scan", "ld-scan-sweep", "cubic-bezier(0.45, 0, 0.55, 1)")}
}

@keyframes ld-scan-sweep {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(${TRAVEL}px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-scan-line {
    transform: translateY(${TRAVEL / 2}px);
  }
}
`;

export function Scan(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="scan">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("scan", props)}
        fill="none"
        role="presentation"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <rect
          height="18"
          opacity="0.2"
          rx="4"
          strokeWidth="2"
          width="18"
          x="3"
          y="3"
        />
        <line
          className="ld-scan-line"
          strokeLinecap="round"
          strokeWidth="2.5"
          x1="7.5"
          x2="16.5"
          y1="6.5"
          y2="6.5"
        />
      </svg>
    </>
  );
}
