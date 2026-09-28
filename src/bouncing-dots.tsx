import { SpinnerStyle, spinnerRoot, step } from "./frame";
import { animation, SIZE, stagger } from "./motion";
import type { SpinnerProps } from "./types";

const DOTS = Array.from({ length: 3 }, (_, index) => index);

const css = `
.ld-bouncing-dots {
  display: flex;
  align-items: center;
  gap: calc(${SIZE} * 0.2);
  height: ${SIZE};
}

.ld-bouncing-dots-dot {
  width: calc(${SIZE} * 0.25);
  height: calc(${SIZE} * 0.25);
  background: currentColor;
  border-radius: 9999px;
  ${animation("bouncing-dots", "ld-bouncing-dots-bounce", "ease-in-out alternate")}
  animation-delay: ${stagger("bouncing-dots", DOTS.length)};
}

@keyframes ld-bouncing-dots-bounce {
  from {
    transform: translateY(28%);
  }
  to {
    transform: translateY(-72%);
  }
}
`;

export function BouncingDots(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="bouncing-dots">{css}</SpinnerStyle>
      <div {...spinnerRoot("bouncing-dots", props)}>
        {DOTS.map((dot) => (
          <div className="ld-bouncing-dots-dot" key={dot} style={step(dot)} />
        ))}
      </div>
    </>
  );
}
