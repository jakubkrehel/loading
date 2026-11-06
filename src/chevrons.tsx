import { fadeCss } from "./fade";
import { SpinnerStyle, spinnerRoot, step } from "./frame";
import type { SpinnerProps } from "./types";

const CHEVRONS = [3.5, 9, 14.5];

const css = `
${fadeCss("chevrons", "chevron", CHEVRONS.length, { dim: 0.2, rest: 0.6 })}
`;

export function Chevrons(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="chevrons">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("chevrons", props)}
        fill="none"
        role="presentation"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        {CHEVRONS.map((x, index) => (
          <path
            className="ld-chevrons-chevron"
            d={`M${x} 6.5l5.5 5.5-5.5 5.5`}
            key={x}
            style={step(index)}
          />
        ))}
      </svg>
    </>
  );
}
