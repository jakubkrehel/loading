import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
} from "react";
import { cn } from "@/lib/utils";

const textSizeClasses = {
  base: "text-base",
  lg: "text-lg",
  sm: "text-sm",
  xl: "text-xl",
} as const;

export const fontWeightClasses = {
  medium: "font-medium",
  regular: "font-normal",
  semibold: "font-semibold",
  semimedium: "font-semimedium",
} as const;

type TextSize = keyof typeof textSizeClasses;
export type FontWeight = keyof typeof fontWeightClasses;

interface TextOwnProps {
  className?: string;
  size?: TextSize;
  truncate?: boolean;
  weight?: FontWeight;
}

export type TextProps<E extends ElementType = "p"> = TextOwnProps & {
  as?: E;
} & Omit<ComponentPropsWithoutRef<E>, keyof TextOwnProps | "as">;

export function Text<E extends ElementType = "p">({
  as,
  size = "base",
  weight = "regular",
  truncate,
  className,
  ...rest
}: TextProps<E>): ReactElement {
  const Component = (as ?? "p") as ElementType;

  return (
    <Component
      className={cn(
        textSizeClasses[size],
        fontWeightClasses[weight],
        truncate && "truncate",
        className
      )}
      data-text=""
      {...rest}
    />
  );
}
