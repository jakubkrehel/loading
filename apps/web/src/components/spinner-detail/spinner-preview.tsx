"use client";

import { ChevronLeftIcon, PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import { SPINNERS } from "loading-dev";
import { type ReactNode, useState } from "react";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { IconButton } from "@/components/ui/icon-button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PREVIEW_SECTION_ID } from "@/lib/constants";
import { customizationProps } from "@/lib/customization";
import { cn } from "@/lib/utils";
import { CustomizePanel } from "./customize-panel";
import { useCustomization } from "./spinner-customization";

const CUSTOMIZE_PANEL_ID = "customize-panel";

function DrawerHandle({
  onToggle,
  open,
}: {
  onToggle: () => void;
  open: boolean;
}) {
  const label = open ? "Hide customization" : "Show customization";

  return (
    <Tooltip trackCursorAxis="y">
      <TooltipTrigger
        render={
          <button
            aria-controls={CUSTOMIZE_PANEL_ID}
            aria-expanded={open}
            aria-label={label}
            className="relative z-10 -mr-1 -ml-5 hidden h-full w-9 shrink-0 cursor-pointer items-center justify-end pr-1.5 text-content-subtle transition-colors duration-200 ease-out hover-hover:hover:text-content sm:flex"
            onClick={onToggle}
            type="button"
          >
            <ChevronLeftIcon
              className={cn(
                "size-4 transition-[rotate] duration-200 ease-out",
                open ? "rotate-180" : "rotate-0"
              )}
            />
          </button>
        }
      />
      <TooltipContent side="left">{label}</TooltipContent>
    </Tooltip>
  );
}

function CustomizeDrawer({
  children,
  open,
}: {
  children: ReactNode;
  open: boolean;
}) {
  return (
    <div
      className={cn(
        "shrink-0 overflow-hidden transition-[width,opacity,visibility] duration-300 ease-out max-sm:w-full sm:h-full",
        open ? "sm:w-60 sm:opacity-100" : "sm:invisible sm:w-0 sm:opacity-0"
      )}
      id={CUSTOMIZE_PANEL_ID}
    >
      {children}
    </div>
  );
}

export function SpinnerPreview() {
  const [customizeOpen, setCustomizeOpen] = useState(true);
  const { customization, item, paused, togglePaused } = useCustomization();
  const Spinner = SPINNERS[item.slug];
  const playLabel = paused ? "Play animation" : "Pause animation";

  return (
    <section
      className="flex w-full flex-col rounded-2xl border border-border bg-surface p-1 sm:h-100 sm:flex-row"
      id={PREVIEW_SECTION_ID}
    >
      <div className="flex min-h-64 min-w-0 flex-1 flex-col items-center px-4 pt-13 pb-2">
        <div className="flex min-h-0 w-full flex-1 items-center justify-center">
          <div style={{ opacity: `${customization.opacity}%` }}>
            <Spinner
              {...customizationProps(item, customization)}
              playState={paused ? "paused" : undefined}
            />
          </div>
        </div>
        <Tooltip>
          <TooltipTrigger
            render={
              <IconButton
                aria-label={playLabel}
                aria-pressed={paused}
                onClick={togglePaused}
                size="sm"
                type="button"
                variant="ghost"
              >
                <AnimatedIcon
                  active={paused}
                  activeIcon={
                    <PlayIcon className="size-4.5 will-change-transform" />
                  }
                  idleIcon={
                    <PauseIcon className="size-4.5 will-change-transform" />
                  }
                />
              </IconButton>
            }
          />
          <TooltipContent>{playLabel}</TooltipContent>
        </Tooltip>
      </div>
      <DrawerHandle
        onToggle={() => setCustomizeOpen((value) => !value)}
        open={customizeOpen}
      />
      <CustomizeDrawer open={customizeOpen}>
        <CustomizePanel className="max-sm:mt-1" />
      </CustomizeDrawer>
    </section>
  );
}
