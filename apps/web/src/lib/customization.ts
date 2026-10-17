import { SPINNER_MOTION } from "loading-dev";
import type { SpinnerItem, SpinnerOptions } from "@/lib/catalog";
import { componentName, type ElementProps, snippetCode } from "@/lib/code";

export const SIZES = [
  { label: "Small", value: 24 },
  { label: "Medium", value: 48 },
  { label: "Large", value: 96 },
];

const DEFAULT_PREVIEW_SIZE = 48;

export interface Customization {
  color: string | null;
  opacity: number;
  options: SpinnerOptions;
  size: number;
  speedMs: number;
}

export function initialCustomization(item: SpinnerItem): Customization {
  return {
    color: null,
    opacity: 100,
    options: {},
    size: DEFAULT_PREVIEW_SIZE,
    speedMs: SPINNER_MOTION[item.slug],
  };
}

export function customizationProps(
  item: SpinnerItem,
  customization: Customization
): ElementProps {
  const options: SpinnerOptions = Object.fromEntries(
    (item.options ?? []).flatMap(({ defaultValue, prop }) => {
      const value = customization.options[prop];
      return value === undefined || value === defaultValue
        ? []
        : [[prop, value]];
    })
  );

  return {
    size: customization.size,
    ...(customization.color ? { color: customization.color } : null),
    ...(customization.speedMs === SPINNER_MOTION[item.slug]
      ? null
      : { duration: customization.speedMs }),
    ...options,
  };
}

export function snippet(
  item: SpinnerItem,
  customization: Customization
): string {
  return snippetCode(
    componentName(item.slug),
    customizationProps(item, customization),
    customization.opacity
  );
}
