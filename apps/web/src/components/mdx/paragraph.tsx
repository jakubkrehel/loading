import type { ComponentPropsWithoutRef } from "react";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

export function MDXParagraph({
  className,
  ...rest
}: Omit<ComponentPropsWithoutRef<"p">, "color">) {
  return (
    <Text
      className={cn("sm:px-4", className)}
      color="content-subtle"
      size="base"
      {...rest}
    />
  );
}
