"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { useCloseOnBreakpointChange } from "@/lib/use-breakpoint-change";
import { cn } from "@/lib/utils";

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  const actionsRef =
    useCloseOnBreakpointChange<PopoverPrimitive.Root.Actions>();

  return <PopoverPrimitive.Root {...props} actionsRef={actionsRef} />;
}

const PopoverTrigger = PopoverPrimitive.Trigger;

function PopoverContent({
  align = "center",
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Popup> & {
  align?: "start" | "center" | "end";
  sideOffset?: number;
}) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        className="z-50"
        sideOffset={sideOffset}
      >
        <PopoverPrimitive.Popup
          className={cn(
            "origin-(--transform-origin) rounded-xl border border-border bg-popover text-popover-content shadow-popover outline-hidden popup-transition",
            className
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

export { Popover, PopoverContent, PopoverTrigger };
