import { animation, type SpinnerName, stagger } from "./motion";

export function fadeCss(
  name: SpinnerName,
  element: string,
  count: number,
  { dim, rest }: { dim: number; rest: number }
): string {
  return `
.ld-${name}-${element} {
  ${animation(name, `ld-${name}-fade`, "linear")}
  animation-delay: ${stagger(name, count)};
}

@keyframes ld-${name}-fade {
  from {
    opacity: 1;
  }
  to {
    opacity: ${dim};
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-${name}-${element} {
    opacity: ${rest};
  }
}
`;
}
