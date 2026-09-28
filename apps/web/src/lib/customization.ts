import { SPINNER_MOTION } from "loading-dev";
import { DEFAULT_PREVIEW_SIZE } from "@/components/spinner-detail/preview-sizes";
import type { SpinnerItem, SpinnerOptions } from "@/components/spinners";
import type { ElementProps } from "@/lib/code";

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
  const props: ElementProps = { size: customization.size };

  if (customization.color) {
    props.color = customization.color;
  }

  if (customization.speedMs !== SPINNER_MOTION[item.slug]) {
    props.duration = customization.speedMs;
  }

  for (const option of item.options ?? []) {
    const value = customization.options[option.prop];
    if (value !== undefined && value !== option.defaultValue) {
      Object.assign(props, { [option.prop]: value });
    }
  }

  return props;
}
