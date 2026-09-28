import { SpinnerStyle, spinnerRoot } from "./frame";
import { animation, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

const css = `
.ld-compass {
  width: ${SIZE};
  height: ${SIZE};
}

.ld-compass-ticks {
  transform-origin: center;
  ${animation("compass", "ld-compass-turn", "ease-in-out")}
}

@keyframes ld-compass-turn {
  to {
    transform: rotate(90deg);
  }
}
`;

export function Compass(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="compass">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("compass", props)}
        fill="none"
        role="presentation"
        viewBox="0 0 16 16"
      >
        <g className="ld-compass-ticks" fill="currentColor">
          <path d="M7.33334 0.666667C7.33334 0.298477 7.63181 0 8 0C8.36819 0 8.66667 0.298477 8.66667 0.666667V3.33333C8.66667 3.70152 8.36819 4 8 4C7.63181 4 7.33334 3.70152 7.33334 3.33333V0.666667Z" />
          <path d="M12.6667 8.66667C12.2985 8.66667 12 8.3682 12 8.00001C12 7.63182 12.2985 7.33334 12.6667 7.33334H15.3333C15.7015 7.33334 16 7.63182 16 8.00001C16 8.3682 15.7015 8.66667 15.3333 8.66667H12.6667Z" />
          <path d="M7.33333 12.6667C7.33333 12.2985 7.63181 12 8 12C8.36819 12 8.66667 12.2985 8.66667 12.6667V15.3333C8.66667 15.7015 8.36819 16 8 16C7.63181 16 7.33333 15.7015 7.33333 15.3333V12.6667Z" />
          <path d="M0.666667 8.66667C0.298477 8.66667 1.60941e-08 8.3682 0 8.00001C-1.60941e-08 7.63182 0.298477 7.33334 0.666667 7.33334H3.33333C3.70152 7.33334 4 7.63182 4 8.00001C4 8.3682 3.70152 8.66667 3.33333 8.66667H0.666667Z" />
        </g>
      </svg>
    </>
  );
}
