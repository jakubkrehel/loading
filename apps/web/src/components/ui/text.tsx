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

const textColorClasses = {
  content: "text-content",
  "content-subtle": "text-content-subtle",
  "popover-content-subtle": "text-popover-content-subtle",
} as const;

const fontFamilyClasses = {
  mono: "font-paper-mono",
} as const;

type TextSize = keyof typeof textSizeClasses;
type TextColor = keyof typeof textColorClasses;
type TextFont = keyof typeof fontFamilyClasses;
export type FontWeight = keyof typeof fontWeightClasses;

interface TextOwnProps {
  className?: string;
  color?: TextColor;
  font?: TextFont;
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
  color,
  font,
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
        color && textColorClasses[color],
        font && fontFamilyClasses[font],
        className
      )}
      data-text=""
      {...rest}
    />
  );
}
