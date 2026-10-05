import { SPINNER_MOTION, type SpinnerName } from "loading-dev";
import { getSpinner } from "@/lib/catalog";
import {
  componentName,
  type ElementProps,
  exampleCode,
  pascalCase,
} from "@/lib/code";

const DEMO_SIZE = 32;

const SHARED_DEMOS: Record<string, (slug: SpinnerName) => ElementProps[]> = {
  "class-name": () => [{ className: "opacity-40", size: DEMO_SIZE }],
  color: () => [{ color: "#f97316", size: DEMO_SIZE }],
  duration: (slug) => [{ duration: SPINNER_MOTION[slug] * 2, size: DEMO_SIZE }],
  "play-state": () => [{ playState: "paused", size: DEMO_SIZE }],
  size: () => [{ size: 16 }, { size: 24 }, { size: 40 }],
};

export function demoElements(slug: SpinnerName, demo: string): ElementProps[] {
  const shared = SHARED_DEMOS[demo];
  if (shared) {
    return shared(slug);
  }
  const option = getSpinner(slug)?.options?.find(({ prop }) => prop === demo);
  if (!option) {
    throw new Error(`Spinner "${slug}" has no demo named "${demo}"`);
  }
  return option.values.map(({ value }) => ({
    [option.prop]: value,
    size: DEMO_SIZE,
  }));
}

export function demoCode(slug: SpinnerName, demo: string): string {
  return exampleCode(
    componentName(slug),
    pascalCase(demo),
    demoElements(slug, demo)
  );
}
