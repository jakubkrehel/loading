"use client";

import { Menu } from "@base-ui/react/menu";
import type React from "react";
import { useCloseOnBreakpointChange } from "@/lib/use-breakpoint-change";
import { cn } from "@/lib/utils";

function DropdownMenu({ ...props }: React.ComponentProps<typeof Menu.Root>) {
  const actionsRef = useCloseOnBreakpointChange<Menu.Root.Actions>();

  return <Menu.Root {...props} actionsRef={actionsRef} />;
}

const DropdownMenuTrigger = Menu.Trigger;

function DropdownMenuContent({
  className,
  sideOffset = 4,
  align,
  ...props
}: Omit<React.ComponentProps<typeof Menu.Popup>, "sideOffset" | "align"> & {
  sideOffset?: number;
  align?: "start" | "center" | "end";
}) {
  return (
    <Menu.Portal>
      <Menu.Positioner align={align} className="z-50" sideOffset={sideOffset}>
        <Menu.Popup
          className={cn(
            "max-h-(--available-height) min-w-32 origin-(--transform-origin) overflow-y-auto overflow-x-hidden rounded-xl border border-border bg-popover p-1 text-popover-content shadow-popover outline-hidden popup-transition",
            className
          )}
          {...props}
        />
      </Menu.Positioner>
    </Menu.Portal>
  );
}

function DropdownMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof Menu.Item>) {
  return (
    <Menu.Item
      className={cn(
        "relative flex h-7 cursor-pointer select-none items-center gap-2 rounded-lg px-2 text-sm hover-hover:hover:bg-popover-hovered focus:bg-popover-hovered focus:text-popover-content focus-visible:outline-popover-content focus-visible:-outline-offset-2 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-popover-content-subtle hover-hover:hover:[&_svg:not([class*='text-'])]:text-popover-content focus:[&_svg:not([class*='text-'])]:text-popover-content [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Menu.Separator>) {
  return (
    <Menu.Separator
      className={cn("mx-2 my-1.5 h-px bg-border", className)}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
};
