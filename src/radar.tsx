import { useId } from "react";
import { type EasingProps, rotationCss, spinClass } from "./easing";
import { SpinnerStyle, spinnerRoot } from "./frame";
import type { SpinnerProps } from "./types";

export interface RadarProps extends SpinnerProps, EasingProps {}

const css = `
${rotationCss("radar")}
`;

export function Radar({ easing, ...rest }: RadarProps) {
  const beamGradient = useId();

  return (
    <>
      <SpinnerStyle name="radar">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("radar", rest)}
        fill="none"
        role="presentation"
        viewBox="0 0 16 16"
      >
        <defs>
          <radialGradient
            cx="8"
            cy="8"
            gradientUnits="userSpaceOnUse"
            id={beamGradient}
            r="8"
          >
            <stop offset="0.3334" stopColor="currentColor" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="8" cy="8" fill="currentColor" opacity="0.2" r="8" />
        <circle cx="8" cy="8" opacity="0.2" r="5.5" stroke="currentColor" />
        <path
          className={spinClass("radar", easing)}
          d="M8 0C9.50657 0 10.9824 0.425672 12.2578 1.22754C13.5333 2.02953 14.557 3.17533 15.21 4.5332C15.8629 5.89107 16.1193 7.40626 15.9492 8.90332C15.7791 10.4001 15.1896 11.8184 14.249 12.9951L10.4707 9.69922C10.8037 9.21598 11 8.63123 11 8C11 6.34315 9.65685 5 8 5V0Z"
          fill={`url(#${beamGradient})`}
        />
        <circle cx="8" cy="8" fill="currentColor" r="2" />
      </svg>
    </>
  );
}
