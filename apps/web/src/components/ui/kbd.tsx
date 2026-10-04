import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Kbd({
  children,
  className,
  pressed = false,
  uppercase = true,
}: {
  children: ReactNode;
  className?: string;
  pressed?: boolean;
  uppercase?: boolean;
}) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 flex-none select-none items-center justify-center rounded-sm border border-border bg-background font-sans font-semimedium text-2xs text-content-subtle will-change-transform",
        "transition-[background-color,border-color,color,scale] duration-200 ease-out motion-reduce:transition-none",
        uppercase ? "uppercase" : "normal-case",
        pressed && "scale-97 bg-background-hovered text-content",
        className
      )}
    >
      {children}
    </kbd>
  );
}
