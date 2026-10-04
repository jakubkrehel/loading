import type { ComponentProps } from "react";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

export const CONTROL_SURFACE =
  "h-8 pointer-coarse:h-10 rounded-lg bg-background";

const CONTROL_TEXT =
  "select-none text-content-subtle transition-colors duration-150 hover-hover:group-hover:text-content group-data-dragging:text-content group-data-popup-open:text-content";

export function ControlLabel({ children }: { children: string }) {
  return (
    <Text as="span" className={CONTROL_TEXT} size="sm" weight="medium">
      {children}
    </Text>
  );
}

export function ControlValue({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn("font-paper-mono text-xs", CONTROL_TEXT, className)}
      {...props}
    />
  );
}
