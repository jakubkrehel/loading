import type { SPINNERS, SpinnerName, SpinnerProps } from "loading-dev";
import type { ComponentProps } from "react";

interface SpeedRange {
  max: number;
  min: number;
}

type OptionValues<Value extends string> = readonly [
  { label: string; value: Value },
  ...{ label: string; value: Value }[],
];

type OwnProp<P> = Exclude<keyof P, keyof SpinnerProps> & string;

export type OptionOf<P> = {
  [K in OwnProp<P>]: {
    defaultValue: NonNullable<P[K]> & string;
    label: string;
    prop: K;
    values: OptionValues<NonNullable<P[K]> & string>;
  };
}[OwnProp<P>];

type SpinnerOptionsByName = {
  [S in SpinnerName]: OptionOf<ComponentProps<(typeof SPINNERS)[S]>>;
};

type SpinnerOption = SpinnerOptionsByName[SpinnerName];

export type SpinnerOptions = {
  [O in SpinnerOption as O["prop"]]?: O["values"][number]["value"];
};

export interface SpinnerItem {
  description: string;
  href: string;
  name: string;
  options?: readonly SpinnerOption[];
  slug: SpinnerName;
  speed: SpeedRange;
}

export function spinnerHref(slug: string): string {
  return `/spinners/${slug}`;
}

export function markdownHref(slug: string): string {
  return `${spinnerHref(slug)}/markdown`;
}

export function entry<S extends SpinnerName>(
  definition: Omit<SpinnerItem, "href" | "slug" | "options"> & {
    slug: S;
    options?: readonly SpinnerOptionsByName[NoInfer<S>][];
  }
): SpinnerItem & { slug: S } {
  return { ...definition, href: spinnerHref(definition.slug) };
}
