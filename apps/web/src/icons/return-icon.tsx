import type { IconProps } from "./icon-base";

export function ReturnIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M11.5 3.75v4.5h-8M6 5.75 3.5 8.25 6 10.75" />
    </svg>
  );
}
